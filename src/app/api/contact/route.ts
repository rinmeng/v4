import { buildConfirmationHtml, buildEmailHtml } from '@/lib/email';
import { Resend } from 'resend';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || '');
  const TO_EMAIL = process.env.NEXT_PUBLIC_RESEND_EMAIL_TO || 'mail@rinm.dev';
  const FROM_EMAIL =
    process.env.NEXT_PUBLIC_RESEND_EMAIL_FROM || 'mail@rinm.dev';
  const body = await req.json();
  const { name, email, phone, message } = body;

  try {
    await Promise.all([
      resend.emails.send({
        from: `Rin Meng Portfolio <${FROM_EMAIL}>`,
        to: TO_EMAIL,
        replyTo: email,
        subject: `New inquiry from ${name}`,
        html: buildEmailHtml({
          name,
          email,
          phone,
          message,
        }),
      }),
      resend.emails.send({
        from: `Rin Meng <${FROM_EMAIL}>`,
        to: email,
        subject: 'We received your message',
        html: buildConfirmationHtml({ name }),
      }),
    ]);
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 },
    );
  }

  return Response.json({ success: true }, { status: 200 });
}
