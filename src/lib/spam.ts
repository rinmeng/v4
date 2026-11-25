import type { Resend } from 'resend'

/** Humans need more than this to fill out the form. Bots submit almost instantly. */
export const MIN_FORM_ELAPSED_MS = 3000

export interface SpamCheckInput {
  /** Honeypot. Real users never see or fill this field. */
  website?: unknown
  /** Milliseconds between the form rendering and the user submitting it. */
  formElapsedMs?: unknown
}

export interface SpamCheckResult {
  isSpam: boolean
  reason?: string
}

/** Bot traps for the contact form. Either one failing is an instant reject. */
export function checkSpam(input: SpamCheckInput): SpamCheckResult {
  if (typeof input.website === 'string' && input.website.trim() !== '') {
    return { isSpam: true, reason: 'honeypot filled' }
  }

  const elapsed = Number(input.formElapsedMs)
  if (!Number.isFinite(elapsed) || elapsed < MIN_FORM_ELAPSED_MS) {
    return {
      isSpam: true,
      reason: `submitted too fast (${input.formElapsedMs ?? 'missing'} ms)`,
    }
  }

  return { isSpam: false }
}

/**
 * Emails a plain-text copy of a dropped submission to SPAM_NOTIFY_EMAIL, since Vercel
 * Hobby only keeps logs for an hour. Plain text only: bot-supplied content is never
 * rendered as HTML. Never throws, so it can't break the fake success response.
 */
export async function sendSpamNotification(
  resend: Resend,
  opts: {
    from: string
    siteName: string
    reason: string
    fields: Record<string, unknown>
  }
): Promise<void> {
  const to = process.env.SPAM_NOTIFY_EMAIL
  if (!to) return

  const lines = Object.entries(opts.fields).map(([key, value]) => {
    const text = Array.isArray(value) ? value.join(', ') : String(value ?? '')
    return `${key}: ${text.slice(0, 2000) || '(empty)'}`
  })

  try {
    await resend.emails.send({
      from: `${opts.siteName} Spam Filter <${opts.from}>`,
      to,
      subject: `[Spam dropped] ${opts.reason}`,
      text: [
        `Site: ${opts.siteName}`,
        `Reason: ${opts.reason}`,
        '',
        ...lines,
      ].join('\n'),
    })
  } catch (error) {
    console.error('Failed to send spam notification:', error)
  }
}
