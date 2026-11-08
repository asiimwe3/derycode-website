#!/usr/bin/env python3
"""Send the DeryCode newsletter to everyone on the list.

Reads active subscribers from the DeryCode database, picks the next article in
rotation (or one you name), and sends one plain, readable email.

Run it with:
    python3 tools/newsletter.py                 # next article in rotation
    python3 tools/newsletter.py --slug ai-chatbot-uganda
    python3 tools/newsletter.py --dry-run       # show who would get what

Email is sent through SMTP. Set these in the sandbox environment (or .env):
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=derycode50@gmail.com
    SMTP_PASS=<Gmail app password>
    SMTP_FROM="DeryCode <derycode50@gmail.com>"

Gmail needs 2-Step Verification on, then an app password from
https://myaccount.google.com/apppasswords (a normal password will not work).
"""
import argparse
import json
import os
import random
import re
import smtplib
import ssl
import sys
import urllib.request
from email.message import EmailMessage
from email.utils import formataddr

REF = "hejyndudxtinigbvzolj"
MANAGEMENT = os.environ.get("SUPABASE_MANAGEMENT_TOKEN") or os.environ.get("SUPABASE_SERVICE_ROLE_KEY_2", "")
MANAGEMENT = MANAGEMENT.strip()
SITE = "https://derycode.online"
BLOG_INDEX = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "blog")


def q(sql):
    """Run SQL against the DeryCode database through the Supabase management API."""
    req = urllib.request.Request(
        f"https://api.supabase.com/v1/projects/{REF}/database/query",
        method="POST", data=json.dumps({"query": sql}).encode(),
        headers={"Authorization": "Bearer " + MANAGEMENT, "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=90) as r:
        raw = r.read().decode()
        return json.loads(raw) if raw else []


def subscribers():
    return q("select email, token from dery.subscribers where status = 'active' order by created_at asc")


def posts():
    """Every static article on disk, with its title, description and date."""
    if not os.path.isdir(BLOG_INDEX):
        sys.exit("blog folder not found")
    out = []
    for name in sorted(os.listdir(BLOG_INDEX)):
        if not name.endswith(".html"):
            continue
        html = open(os.path.join(BLOG_INDEX, name), encoding="utf-8", errors="ignore").read()
        title = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.S)
        desc = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)', html, re.I)
        date = re.search(r'"datePublished"\s*:\s*"([^"]+)"', html)
        if not title:
            continue
        out.append({
            "slug": name[:-5],
            "title": re.sub(r"\s+", " ", re.sub("<[^>]+>", "", title.group(1))).strip(),
            "desc": (desc.group(1) if desc else "").strip(),
            "date": date.group(1)[:10] if date else "",
        })
    return out


def pick(all_posts, slug=None, mode="rotate"):
    if slug:
        for p in all_posts:
            if p["slug"] == slug:
                return p
        sys.exit(f"no article called {slug}")
    if mode == "random":
        return random.choice(all_posts)
    # rotate: newest article we have not sent yet, else the oldest
    sent = {row["slug"] for row in q("select slug from dery.newsletter_sends")}
    fresh = [p for p in sorted(all_posts, key=lambda p: p["date"]) if p["slug"] not in sent]
    return fresh[-1] if fresh else all_posts[0]


def compose(post, email, token):
    unsub = f"{SITE}/unsubscribe.html?e={urllib.request.quote(email)}&t={token or ''}"
    link = f"{SITE}/blog/{post['slug']}.html"
    text = (
        f"{post['title']}\n\n{post['desc']}\n\nRead it: {link}\n\n"
        f"--\nYou get this because you subscribed at derycode.online.\n"
        f"Unsubscribe: {unsub}\n"
    )
    html = f"""<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:600px;margin:0 auto;color:#16202f">
  <p style="font-size:13px;color:#6b7c93;letter-spacing:.08em;text-transform:uppercase">DeryCode</p>
  <h1 style="font-size:22px;line-height:1.3;margin:6px 0 12px">{post['title']}</h1>
  <p style="font-size:15px;line-height:1.6;color:#33465f">{post['desc']}</p>
  <p style="margin:22px 0"><a href="{link}" style="background:#4F7CFF;color:#fff;padding:12px 20px;border-radius:9px;text-decoration:none;font-weight:600">Read the article</a></p>
  <p style="font-size:12px;color:#8194ab;line-height:1.6">You are getting this because you subscribed at derycode.online.<br>
  <a href="{unsub}" style="color:#8194ab">Unsubscribe</a></p>
</div>"""
    return text, html, unsub


def send_one(msg_from, user, password, host, port, to, subject, text, html):
    m = EmailMessage()
    m["Subject"] = subject
    m["From"] = msg_from
    m["To"] = to
    m.set_content(text)
    m.add_alternative(html, subtype="html")
    ctx = ssl.create_default_context()
    with smtplib.SMTP(host, port, timeout=45) as s:
        s.starttls(context=ctx)
        s.login(user, password)
        s.send_message(m)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug")
    ap.add_argument("--mode", default="rotate", choices=["rotate", "random"])
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()

    if not MANAGEMENT:
        sys.exit("SUPABASE_MANAGEMENT_TOKEN (or SUPABASE_SERVICE_ROLE_KEY_2) is not set")

    host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    port = int(os.environ.get("SMTP_PORT", "587"))
    user = os.environ.get("SMTP_USER", "")
    password = os.environ.get("SMTP_PASS", "")
    sender = os.environ.get("SMTP_FROM") or formataddr(("DeryCode", user))

    people = subscribers()
    if args.limit:
        people = people[: args.limit]
    post = pick(posts(), args.slug, args.mode)
    print(f"article: {post['title']}\nlist size: {len(people)}")

    if args.dry_run:
        for p in people[:5]:
            print("  would email", p["email"])
        return

    if not (user and password):
        sys.exit("SMTP_USER / SMTP_PASS are not set, so nothing was sent")

    sent = 0
    for person in people:
        text, html, _ = compose(post, person["email"], person.get("token"))
        try:
            send_one(sender, user, password, host, port, person["email"],
                     f"{post['title']}", text, html)
            sent += 1
        except Exception as e:
            print("  failed", person["email"], str(e)[:90])
    q(f"insert into dery.newsletter_sends (slug, sent) values ('{post['slug']}', {sent})")
    print(f"sent to {sent} of {len(people)}")


if __name__ == "__main__":
    main()
