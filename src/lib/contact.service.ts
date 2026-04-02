import { z } from 'zod';
import { canSendEmail, getRemainingCooldown, markEmailSent } from './rateLimit';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export async function sendContactForm(
  values: ContactFormValues,
  bypassRateLimit: boolean = false,
): Promise<void> {
  if (!bypassRateLimit && !canSendEmail()) {
    const remaining = Math.ceil(getRemainingCooldown() / 1000 / 60);
    throw new Error(
      `Please wait ${remaining} minute${remaining !== 1 ? 's' : ''} before sending another message.`,
    );
  }

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: 'Failed to send message' }));
    throw new Error(error.error || 'Failed to send message');
  }

  if (!bypassRateLimit) {
    markEmailSent();
  }
}
