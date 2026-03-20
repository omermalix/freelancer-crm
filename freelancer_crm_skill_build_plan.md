# Freelancer CRM Skill — Complete Build Plan
**For OpenClaw / ClawHub · March 2026**

---

## Overview

This document is your complete blueprint for building, testing, and publishing a Freelancer CRM skill on ClawHub. Follow it step by step. By the end of Day 7 you will have a published, working skill on the ClawHub registry that solves a real problem for thousands of freelancers worldwide.

| | |
|---|---|
| **Skill name** | `freelancer-crm` |
| **Target users** | Freelancers, solo developers, consultants managing 5–20 clients |
| **Core value** | Automates client follow-ups, proposals, invoice tracking, and weekly digest — all via WhatsApp |
| **Build time** | 7 days (part-time, 2–3 hours per day) |
| **Cost to build** | $0 — all tools are free |
| **Income model** | Hosted setup service ($125–500/client) + B2B retainer leads |
| **Unique advantage** | No HubSpot, no Salesforce. Local JSON database. Works via WhatsApp. Zero extra subscriptions. |

---

## What the Skill Does — 5 Core Features

### Feature 1: Follow-Up Detector
Reads your client database, identifies any client with no contact in the last 5 days and status set to `active`, drafts a WhatsApp message personalised with their name and last project context, then asks you to approve before sending. You never miss a follow-up again.

### Feature 2: Proposal Generator
You say: *"Write a proposal for Ahmed for a React dashboard, $800, 2 weeks."* The skill pulls Ahmed's history from `clients.json`, fills your proposal template with the correct details, and outputs a clean text proposal you can copy-paste or send immediately.

### Feature 3: Invoice Tracker
Marks invoices as sent, paid, or overdue. After 7 days with no payment marked, it automatically drafts a polite payment reminder and asks you to approve before sending. Tracks all outstanding amounts in one place.

### Feature 4: Client Status Board
You ask: *"Show me all my clients."* The skill returns a clean summary showing: who is active, who is overdue on payment, who you have not spoken to in over 2 weeks, and who is a new lead not yet converted.

### Feature 5: Monday Morning Digest
Every Monday at 9am the skill runs automatically via cron trigger and sends you a WhatsApp summary: how many clients need follow-up, how many invoices are overdue, how many proposals are awaiting a response, and your total outstanding revenue.

---

## WhatsApp Options — Choose Your Method

Your skill supports both methods. Users can select their preferred option during configuration. Here is the honest comparison:

| Factor | Option A — WhatsApp Bridge (Baileys) | Option B — Official WhatsApp Business API |
|---|---|---|
| **Cost** | Free — uses your personal number | Free tier: 1,000 messages/month then $0.005–0.08 per message |
| **Setup time** | 5 minutes — scan QR code, done | 1–3 days — Meta Business verification required |
| **Phone number** | Your existing WhatsApp number | Separate dedicated business number required |
| **Ban risk** | Low if used carefully — unofficial protocol | Zero — fully official Meta API |
| **Scale limit** | 1 number, personal use | Unlimited — enterprise grade |
| **Best for** | Testing the skill + freelancers who want quick setup | Users who want professionalism + high volumes |
| **Recommended for** | Day 1 — your own testing + skill MVP | Later — when you launch to paying users |

> **Your recommendation to users (include this in your SKILL.md description):**
> Start with Option A (WhatsApp Bridge) — it takes 5 minutes to set up and costs nothing. Once you are happy with how the skill works and want to scale to multiple client numbers or guarantee delivery reliability, upgrade to Option B (Official API).

---

## Everything You Need — Full Requirements List

| Item | What it is | Cost | Required for |
|---|---|---|---|
| Node.js 18+ | Runtime for OpenClaw and scripts | Free | Everything |
| Python 3.10+ | For your automation scripts | Free | All `.py` scripts |
| OpenClaw running | You already have this | Free | Testing locally |
| clawhub CLI | `npm i -g clawhub` | Free | Publishing to ClawHub |
| GitHub account (1 week old) | To publish skills | Free | `clawhub publish` |
| WhatsApp Bridge (Baileys) | Built into OpenClaw — run: `openclaw integrations whatsapp` | Free | Option A messaging |
| Meta Business account | business.meta.com — verify your business | Free | Option B only |
| WhatsApp Business API token | From Meta Developer Console | Free tier: 1,000 msg/mo | Option B only |
| Twilio WhatsApp sandbox (optional) | For safe testing without real WhatsApp | Free sandbox | Testing Option B safely |
| VS Code or any editor | To write SKILL.md and scripts | Free | Writing the skill |
| Docker (recommended) | Isolates your machine during testing | Free | Safe testing |

---

## Your Exact Folder Structure

```
freelancer-crm/
├── SKILL.md                   ← brain of the skill (instructions + metadata)
├── clients.json               ← local client database
├── config.json                ← user config (which WhatsApp method, API keys)
├── follow_up.py               ← detects overdue clients, drafts message
├── invoice_tracker.py         ← tracks payments, sends reminders
├── proposal_generator.py      ← generates proposals from template
├── weekly_digest.py           ← Monday morning summary
├── whatsapp_bridge.py         ← Option A: sends via Baileys bridge
├── whatsapp_api.py            ← Option B: sends via official Meta API
├── send_message.py            ← router: reads config.json, picks A or B
└── templates/
    ├── proposal_template.txt  ← your proposal format
    └── follow_up_template.txt ← your follow-up message format
```

---

## Your SKILL.md — Complete Template

Copy this exactly. Fill in your GitHub username.

```yaml
---
name: freelancer-crm
version: 1.0.0
author: your-github-username
description: >
  Autonomous CRM for freelancers. Tracks clients, detects follow-up
  opportunities, generates proposals, tracks invoices, and sends a
  weekly digest. Works via WhatsApp Bridge (no API key needed) or
  the official WhatsApp Business API. No HubSpot. No Salesforce.
  Just a local JSON file and WhatsApp.
tools:
  - read
  - write
  - exec
  - web_fetch
triggers:
  - cron: "0 9 * * MON"    # Monday 9am weekly digest
always: false
config:
  whatsapp_method: bridge   # 'bridge' for Option A, 'api' for Option B
  api_token: ""             # Only needed for Option B
  api_phone_id: ""          # Only needed for Option B
  follow_up_days: 5         # Days of silence before follow-up triggered
  invoice_reminder_days: 7  # Days before overdue invoice reminder
---

# Freelancer CRM

You are a freelancer CRM assistant. Your job is to help the user
manage their clients without any external CRM software.

## Client database
Client data is stored in clients.json in this skill folder.
Each client has: name, status, last_contact (ISO date), project,
invoice_amount, invoice_status, notes.

## When the user asks about their clients
Read clients.json, summarise their current pipeline clearly.

## When a follow-up is needed
Run follow_up.py — it identifies overdue clients and drafts messages.
Always ask the user to approve before sending anything.

## When the user asks for a proposal
Run proposal_generator.py with the client name and project details.

## When sending any WhatsApp message
Run send_message.py — it reads config.json and uses the correct method.

## Every Monday at 9am
Run weekly_digest.py and send the result as a WhatsApp message to the user.
```

---

## Your clients.json — Starting Template

```json
{
  "clients": [
    {
      "id": 1,
      "name": "Ahmed Khan",
      "phone": "+923001234567",
      "status": "active",
      "last_contact": "2026-03-10",
      "project": "React dashboard",
      "invoice_amount": 800,
      "invoice_status": "sent",
      "invoice_sent_date": "2026-03-08",
      "notes": "Prefers communication in Urdu"
    }
  ]
}
```

---

## Step-by-Step Build Plan — 7 Days

---

### Day 1–2 — Set Up Your Environment and Write SKILL.md

1. Verify your OpenClaw is running. Open a terminal and confirm the agent is active.
2. Install the clawhub CLI: `npm i -g clawhub`
3. Create your skill folder: `mkdir ~/freelancer-crm && cd ~/freelancer-crm`
4. Create `SKILL.md` using the template above. Fill in your GitHub username.
5. Create `clients.json` using the template above. Add 2–3 of your real current clients as test data.
6. Create `config.json` with this content:

```json
{
  "whatsapp_method": "bridge",
  "follow_up_days": 5,
  "invoice_reminder_days": 7
}
```

7. Set up WhatsApp Bridge (Option A): `openclaw integrations whatsapp`
8. Scan the QR code with your phone. Your OpenClaw is now connected to WhatsApp.
9. Test it: send yourself a WhatsApp message from your phone to confirm the connection works.
10. Copy your skill folder into OpenClaw: `cp -r ~/freelancer-crm ~/.openclaw/skills/`
11. Test that OpenClaw recognises the skill — open your agent and ask: *"Do you have a freelancer-crm skill?"*

---

### Day 3 — Build follow_up.py — The Core Feature

This is the most important script. It is what makes the skill genuinely useful.

1. Create `follow_up.py` in your skill folder:

```python
import json
from datetime import datetime, date

def check_follow_ups(days_threshold=5):
    with open('clients.json', 'r') as f:
        data = json.load(f)

    today = date.today()
    overdue = []

    for client in data['clients']:
        if client['status'] != 'active':
            continue
        last = datetime.strptime(client['last_contact'], '%Y-%m-%d').date()
        days_silent = (today - last).days

        if days_silent >= days_threshold:
            overdue.append({
                'name': client['name'],
                'phone': client['phone'],
                'days_silent': days_silent,
                'project': client['project']
            })

    return overdue

if __name__ == '__main__':
    results = check_follow_ups()
    if not results:
        print('No follow-ups needed today.')
    else:
        for c in results:
            print(f"{c['name']} — {c['days_silent']} days silent — {c['project']}")
```

2. Run it from terminal: `python follow_up.py` — it should list any clients overdue for contact.
3. Trigger it through your OpenClaw agent: ask it *"Check my follow-ups"* and confirm it runs correctly.
4. Adjust the output format until it reads naturally.

---

### Day 4 — Build send_message.py — The WhatsApp Router

This script reads `config.json` and routes the message to either the Bridge or the official API. This is what gives users the choice you want to offer.

1. Create `whatsapp_bridge.py`:

```python
# whatsapp_bridge.py — sends via OpenClaw WhatsApp Bridge (Baileys)
import subprocess

def send(phone_number: str, message: str):
    result = subprocess.run(
        ['openclaw', 'whatsapp', 'send', '--to', phone_number, '--message', message],
        capture_output=True, text=True
    )
    return result.returncode == 0
```

2. Create `whatsapp_api.py`:

```python
# whatsapp_api.py — sends via official Meta WhatsApp Business API
import requests

def send(phone_number: str, message: str, token: str, phone_id: str):
    url = f'https://graph.facebook.com/v18.0/{phone_id}/messages'
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'messaging_product': 'whatsapp',
        'to': phone_number,
        'type': 'text',
        'text': {'body': message}
    }
    response = requests.post(url, headers=headers, json=payload)
    return response.status_code == 200
```

3. Create `send_message.py` — the router:

```python
# send_message.py — reads config.json, routes to correct WhatsApp method
import json
import whatsapp_bridge
import whatsapp_api
import sys

def send(phone_number: str, message: str):
    with open('config.json', 'r') as f:
        config = json.load(f)

    method = config.get('whatsapp_method', 'bridge')

    if method == 'bridge':
        return whatsapp_bridge.send(phone_number, message)
    elif method == 'api':
        token = config.get('api_token', '')
        phone_id = config.get('api_phone_id', '')
        return whatsapp_api.send(phone_number, message, token, phone_id)
    else:
        print(f'Unknown method: {method}')
        return False

if __name__ == '__main__':
    phone = sys.argv[1]
    msg = sys.argv[2]
    success = send(phone, msg)
    print('Sent' if success else 'Failed')
```

4. Test it: `python send_message.py +923001234567 "Test from freelancer-crm skill"`
5. Confirm the WhatsApp message arrives on your phone.

---

### Day 5 — Build invoice_tracker.py and weekly_digest.py

1. **invoice_tracker.py** — reads `clients.json`, finds invoices older than `reminder_days` with status `sent` (not `paid`), drafts reminder messages. Loop through clients, check `invoice_sent_date`, calculate days since sent, return list of overdue invoices.

2. **weekly_digest.py** — calls `follow_up.py` and `invoice_tracker.py` internally, counts results, formats a single WhatsApp-friendly summary message like:

   > *"Good morning. This week: 3 clients need follow-up, 2 invoices overdue ($1,600 total), 1 proposal awaiting response."*

   Then calls `send_message.py` to deliver it.

3. Test both scripts from terminal first. Confirm output is correct.
4. Then test through the agent: tell your OpenClaw *"Run the weekly digest"* and confirm it executes and sends.

---

### Day 6 — Full End-to-End Test and Edge Cases

Do not skip this day. This is what separates a skill that gets good reviews from one that gets flagged as broken.

1. Test with a client who has `status: inactive` — confirm the follow-up detector ignores them.
2. Test with a client whose `invoice_status` is `paid` — confirm the invoice tracker ignores them.
3. Test the proposal generator with a client who has no notes — confirm it handles missing fields gracefully without crashing.
4. Test the Monday digest trigger by temporarily changing the cron to run 1 minute from now in `SKILL.md`, let it fire, then change it back.
5. Set `config.json` to method `api` without a valid token — confirm `send_message.py` fails cleanly with a readable error, not a Python traceback.
6. Review your `SKILL.md` one final time. Every instruction must map to a real function in a real script. No vague promises.
7. Ask a non-developer friend to install the skill on their OpenClaw and try to use it. Watch what breaks. Fix those things.

---

### Day 7 — Publish to ClawHub

1. Make sure you have a GitHub account that is at least one week old. This is a hard requirement from ClawHub.
2. Run: `clawhub publish ~/freelancer-crm`
3. VirusTotal will automatically scan your skill. Wait for the scan — usually under 5 minutes.
4. Once live, install your own published skill on a fresh OpenClaw to confirm: `clawhub install your-username/freelancer-crm`
5. Share your ClawHub skill URL in the OpenClaw Discord and subreddit. Early installs in the first 24 hours boost your search ranking.
6. Set up a Gumroad product at $49 called **"Freelancer CRM Pro Config"** — a pre-configured version with your proposal templates tuned and setup support included. Link to it from your ClawHub skill description.

---

## Realistic Income Timeline

| Timeframe | What to expect |
|---|---|
| **Week 1** | Skill live on ClawHub. First installs coming in. $0 direct revenue yet. |
| **Week 2–3** | First setup service clients via Upwork or direct. $125–500 per client. Target: 2 clients = $500. |
| **Month 2** | ClawHub installs growing. Gumroad pro config selling at $49. First B2B inquiry. |
| **Month 3** | First B2B retainer client ($500–1,500/month). Total monthly: $1,000–2,000. |
| **Month 4+** | 2nd skill live (n8n bridge). Multiple retainer clients. $3,000–5,000/month realistic. |

---

## Important Warnings — Read Before Publishing

- **Never use your production WhatsApp account for testing destructive commands.** Use a second number or the Twilio sandbox.
- **Do not promise your skill does something it does not.** ClawHub users read source code. Misleading SKILL.md instructions destroy your reputation on the first bad review.
- **Install only the official Baileys package from npmjs.com.** In late 2025 a malicious npm package named `lotusbail` impersonated a WhatsApp Web library and stole credentials. Check the exact package name before installing.
- **Keep your `config.json` out of version control.** Add it to `.gitignore`. Never commit API tokens to GitHub.
- **Test with Docker isolation first.** An agent running in your home directory with exec permissions can delete files if a script has a bug. Docker contains any damage.

---

*You have everything you need. Start with Day 1 today.*
