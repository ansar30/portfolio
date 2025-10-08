# EmailJS Setup Guide

This portfolio uses EmailJS to send emails from the contact form. Follow these steps to set it up:

## 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Connect Your Email Service

1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Copy the **Service ID** (you'll need this later)

## 3. Create an Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: {{subject}} - Portfolio Contact Form

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. The template variables you need:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content

5. In the **To Email** field, enter: `mohammedthameemansart@gmail.com`
6. Save the template and copy the **Template ID**

## 4. Get Your Public Key

1. Go to **Account** in your EmailJS dashboard
2. Find your **Public Key** under the API Keys section
3. Copy the Public Key

## 5. Configure Your Application

### Option 1: Using Environment Variables (Recommended for Production)

1. Create a `.env` file in the root directory (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Add your EmailJS credentials:
   ```
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   ```

3. Update `src/pages/Index.tsx` to use environment variables:
   ```typescript
   emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
   
   await emailjs.send(
     import.meta.env.VITE_EMAILJS_SERVICE_ID,
     import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
     {
       from_name: formData.name,
       from_email: formData.email,
       subject: formData.subject,
       message: formData.message,
     }
   );
   ```

### Option 2: Direct Configuration (Quick Setup)

Update the EmailJS configuration directly in `src/pages/Index.tsx`:

```typescript
// Replace these with your actual EmailJS credentials
emailjs.init("YOUR_PUBLIC_KEY");

await emailjs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
  }
);
```

## 6. Test Your Contact Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact section
3. Fill out and submit the form
4. Check your email inbox for the message
5. Verify that all information is correctly formatted

## 7. Important Notes

### Security
- **Never commit your actual credentials to Git!**
- The `.env` file is already in `.gitignore`
- EmailJS public key is safe to expose (it's meant for client-side use)
- EmailJS has rate limiting to prevent abuse

### Free Tier Limits
- EmailJS free tier includes:
  - 200 emails per month
  - 2 email services
  - 1 email template
- Upgrade to a paid plan if you need more

### Troubleshooting

**Form not sending emails?**
- Check browser console for errors
- Verify all three credentials are correct
- Ensure your EmailJS service is active
- Check EmailJS dashboard for error logs

**Emails going to spam?**
- Add your domain to EmailJS allowed domains
- Use SPF/DKIM records (available on paid plans)
- Ask recipients to whitelist your email

**Rate limiting issues?**
- EmailJS limits requests per IP address
- Wait a few minutes between test submissions
- Consider upgrading to a paid plan for higher limits

## 8. Alternative: Direct Email Links

If you prefer not to use EmailJS, you can replace the contact form with a simple mailto link:

```tsx
<a 
  href="mailto:mohammedthameemansart@gmail.com?subject=Portfolio Contact"
  className="px-6 py-3 bg-white text-black rounded-xl"
>
  Email Me
</a>
```

## Support

For more help, visit:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS FAQs](https://www.emailjs.com/docs/faq/)

