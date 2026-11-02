# Coolify Contact Form SMTP Setup

Use these environment variables in Coolify for the contact form.

| Key | Value (example) | Required |
| --- | --- | --- |
| SMTP_HOST | smtp.office365.com | Yes |
| SMTP_PORT | 587 | Yes |
| SMTP_USER | bilgi@siskon.com.tr | Yes |
| SMTP_PASS | app password | Yes |
| CONTACT_FORM_FROM | bilgi@siskon.com.tr | Yes |
| CONTACT_FORM_TO | web@siskon.com.tr | Yes |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | 0x4AAAA... (Cloudflare Turnstile site key, build variable) | Yes |
| TURNSTILE_SECRET_KEY | Cloudflare Turnstile secret key (runtime only) | Yes |

## Notes

- For Office365 on port 587, STARTTLS is used with `secure=false` and `requireTLS=true`.
- Do not commit real SMTP passwords into git.
- In production the form is rejected (HTTP 503) when `TURNSTILE_SECRET_KEY` is missing, so the captcha cannot be skipped by accident. Locally (no secret) the check is skipped.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is inlined at build time: tick "Build Variable" in Coolify and redeploy (rebuild) after changing it.
