# Coolify Contact Form SMTP Setup

Use these environment variables in Coolify for the contact form.

| Key | Value (example) | Required |
| --- | --- | --- |
| SMTP_HOST | smtp.office365.com | Yes |
| SMTP_PORT | 587 | Yes |
| SMTP_USER | bilgi@siskon.com.tr | Yes |
| SMTP_PASS | app password | Yes |
| CONTACT_FORM_FROM | bilgi@siskon.com.tr | Yes |
| CONTACT_FORM_TO | info@siskon.com.tr | Yes |
| NEXT_PUBLIC_RECAPTCHA_SITE_KEY | your-site-key | No |
| RECAPTCHA_SECRET_KEY | your-secret-key | No |

## Notes

- For Office365 on port 587, STARTTLS is used with `secure=false` and `requireTLS=true`.
- Do not commit real SMTP passwords into git.
- If you leave `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` empty, form submission still works without captcha.
