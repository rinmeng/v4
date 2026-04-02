/**
 * Builds the HTML content for the contact form email.
 */
export function buildEmailHtml({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}) {
  const optionalRow = (label: string, value?: string) =>
    value
      ? `
      <tr>
        <td style="color:#64748b;padding:6px 0;width:120px;vertical-align:top;font-size:13px;">${label}</td>
        <td style="color:#1e293b;padding:6px 0;font-size:13px;">${value}</td>
      </tr>`
      : '';

  const optionalMessage = message
    ? `
    <div style="border-left:2px solid #e2e8f0;padding-left:1rem;margin-bottom:1.5rem;">
      <p style="font-size:12px;color:#64748b;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
      <p style="font-size:14px;color:#1e293b;margin:0;line-height:1.7;">${message}</p>
    </div>`
    : '';

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">

      <div style="background:#1e293b;padding:2rem;text-align:center;">
        <p style="color:#f8fafc;font-size:24px;font-weight:500;margin:0;letter-spacing:0.05em;">New Contact Form Submission</p>
      </div>

      <div style="padding:2rem;">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:1.25rem;margin-bottom:1.5rem;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="color:#64748b;padding:6px 0;width:120px;font-size:13px;text-transform:uppercase;letter-spacing:0.06em;">Name</td>
              <td style="color:#1e293b;font-weight:500;padding:6px 0;font-size:14px;">${name}</td>
            </tr>
            <tr>
              <td style="color:#64748b;padding:6px 0;font-size:13px;text-transform:uppercase;letter-spacing:0.06em;">Email</td>
              <td style="color:#1e293b;padding:6px 0;font-size:14px;">${email}</td>
            </tr>
            ${optionalRow('Phone', phone)}
          </table>
        </div>

        ${optionalMessage}

        <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Your inquiry, ${name}`)}"
          style="display:block;text-align:center;background:#1e293b;color:#f8fafc;text-decoration:none;padding:14px;border-radius:6px;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;">
          Reply to ${name}
        </a>

        <div style="margin-top:1.5rem;font-size:11px;color:#64748b;text-align:center;">Sent from your portfolio website</div>
      </div>
      
    </div>
  `;
}

export function buildConfirmationHtml({ name }: { name: string }) {
  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      
      <div style="background:#1e293b;padding:2rem;text-align:center;">
        <p style="color:#f8fafc;font-size:24px;font-weight:500;margin:0;letter-spacing:0.05em;">Rin Meng</p>
      </div>

      <div style="padding:2rem;">
        <p style="font-size:15px;color:#1e293b;margin:0 0 1rem;">Hi ${name},</p>
        <p style="font-size:14px;color:#1e293b;line-height:1.7;margin:0 0 1.5rem;">
          Thank you for reaching out. Your message has been received and I'll be in touch with you shortly.
        </p>
        <p style="font-size:14px;color:#64748b;line-height:1.7;margin:0;">
          — Rin Meng
        </p>
      </div>

    </div>
  `;
}
