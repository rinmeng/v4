import { buildConfirmationHtml, buildEmailHtml } from '@/lib/email'
import { checkSpam, sendSpamNotification } from '@/lib/spam'
import { Resend } from 'resend'

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || '')
  const TO_EMAIL = process.env.NEXT_PUBLIC_RESEND_EMAIL_TO || 'mail@rinm.dev'
  const FROM_EMAIL =
    process.env.NEXT_PUBLIC_RESEND_EMAIL_FROM || 'mail@rinm.dev'
  const body = await req.json()
  const { name, email, phone, message, website, formElapsedMs } = body

  // Runs before any email goes out. Spam gets the same success response a real
  // visitor would, so senders can't tell they were filtered.
  const spam = checkSpam({ website, formElapsedMs })
  if (spam.isSpam) {
    console.warn('Contact form submission dropped as spam:', {
      reason: spam.reason,
      email,
      name,
      message: String(message ?? '').slice(0, 300),
    })
    await sendSpamNotification(resend, {
      from: FROM_EMAIL,
      siteName: 'Rin Meng Portfolio',
      reason: spam.reason ?? 'unknown',
      fields: {
        Name: name,
        Email: email,
        Phone: phone,
        'Honeypot (website)': website,
        'Elapsed ms': formElapsedMs ?? 'missing',
        Message: message,
      },
    })
    return Response.json({ success: true }, { status: 200 })
  }

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
    ])
  } catch (error) {
    console.error('Error sending email:', error)
    return Response.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }

  return Response.json({ success: true }, { status: 200 })
}
