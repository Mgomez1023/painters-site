import {Resend} from 'resend';
import type {
  ContactFormType,
  ContactSubmissionRequest,
} from '../../src/features/contact/types';

const RESEND_FROM_EMAIL = 'Gomez Painting <hello@gomezpainting.org>';
const RESEND_RECIPIENTS = ['marting2046@gmail.com', 'martin2mvp@yahoo.com'];

class ContactDeliveryError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = 'ContactDeliveryError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

type ValidationResult =
  | {
      ok: true;
      submission: ContactSubmissionRequest;
    }
  | {
      ok: false;
      statusCode: number;
      message: string;
    };

export function parseContactSubmission(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object') {
    return invalidSubmission('Invalid request body.');
  }

  const input = body as Record<string, unknown>;
  const formType = getRequiredString(input.formType);

  if (formType === 'quote-request') {
    return validateQuoteRequest(input);
  }

  if (formType === 'contact-message') {
    return validateContactMessage(input);
  }

  if (formType === 'newsletter-signup') {
    return validateNewsletterSignup(input);
  }

  return invalidSubmission('Invalid form type.');
}

export async function sendContactSubmissionEmail(
  submission: ContactSubmissionRequest,
) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new ContactDeliveryError(
      'Missing RESEND_API_KEY environment variable.',
      500,
    );
  }

  const resend = new Resend(apiKey);
  const subject = buildEmailSubject(submission);
  const emailContent = buildEmailContent(submission);

  let data: Awaited<ReturnType<typeof resend.emails.send>>['data'];
  let error: Awaited<ReturnType<typeof resend.emails.send>>['error'];

  try {
    ({data, error} = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: RESEND_RECIPIENTS,
      subject,
      html: emailContent.html,
      text: emailContent.text,
      replyTo: submission.email,
    }));
  } catch (sendError) {
    throw toContactDeliveryError(sendError);
  }

  if (error) {
    throw new ContactDeliveryError(
      getPublicErrorMessage(error),
      502,
      error,
    );
  }

  if (!data?.id) {
    throw new ContactDeliveryError(
      'Email delivery provider did not confirm the message send.',
      502,
      data,
    );
  }
}

export function buildSuccessMessage(formType: ContactFormType) {
  if (formType === 'quote-request') {
    return 'Your quote request has been sent. We will follow up within 24 hours.';
  }

  if (formType === 'newsletter-signup') {
    return 'Thanks for subscribing. We will keep you posted.';
  }

  return 'Your message has been sent. We will be in touch shortly.';
}

function validateQuoteRequest(
  input: Record<string, unknown>,
): ValidationResult {
  const fullName = getRequiredString(input.fullName);
  const phone = getRequiredString(input.phone);
  const email = getRequiredString(input.email);
  const projectType = getRequiredString(input.projectType);
  const message = getRequiredString(input.message);

  if (!fullName || !phone || !email || !projectType || !message) {
    return invalidSubmission('Please complete all quote request fields.');
  }

  if (!isValidEmail(email)) {
    return invalidSubmission('Please provide a valid email address.');
  }

  return {
    ok: true,
    submission: {
      formType: 'quote-request',
      fullName,
      phone,
      email,
      projectType,
      message,
    },
  };
}

function validateContactMessage(
  input: Record<string, unknown>,
): ValidationResult {
  const fullName = getRequiredString(input.fullName);
  const email = getRequiredString(input.email);
  const subject = getRequiredString(input.subject);
  const message = getRequiredString(input.message);

  if (!fullName || !email || !subject || !message) {
    return invalidSubmission('Please complete all contact form fields.');
  }

  if (!isValidEmail(email)) {
    return invalidSubmission('Please provide a valid email address.');
  }

  return {
    ok: true,
    submission: {
      formType: 'contact-message',
      fullName,
      email,
      subject,
      message,
    },
  };
}

function validateNewsletterSignup(
  input: Record<string, unknown>,
): ValidationResult {
  const email = getRequiredString(input.email);

  if (!email) {
    return invalidSubmission('Please provide your email address.');
  }

  if (!isValidEmail(email)) {
    return invalidSubmission('Please provide a valid email address.');
  }

  return {
    ok: true,
    submission: {
      formType: 'newsletter-signup',
      fullName: 'Newsletter Subscriber',
      email,
      subject: 'Newsletter signup',
      message: 'Requested seasonal maintenance tips and project inspiration.',
    },
  };
}

function buildEmailSubject(submission: ContactSubmissionRequest) {
  const formTypeLabel = getFormTypeLabel(submission.formType);

  if (submission.formType === 'quote-request') {
    return `[Gomez Painting] ${formTypeLabel} | ${submission.fullName}`;
  }

  if (submission.formType === 'newsletter-signup') {
    return `[Gomez Painting] ${formTypeLabel} | ${submission.email}`;
  }

  return `[Gomez Painting] ${formTypeLabel} | ${submission.fullName}`;
}

function buildEmailContent(submission: ContactSubmissionRequest) {
  const submittedAt = formatSubmissionTimestamp();
  const emailSubject = buildEmailSubject(submission);
  const formTypeLabel = getFormTypeLabel(submission.formType);

  const details = getSubmissionDetails(submission);
  const detailRows = details
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#0f172a;width:180px;">${escapeHtml(label)}</td>
          <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;color:#334155;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  const messageHtml = escapeHtml(submission.message).replace(/\n/g, '<br />');

  return {
    html: `
      <div style="background:#f1f5f9;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a;">
        <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #dbe4ee;border-radius:16px;overflow:hidden;">
          <div style="padding:24px 28px;background:#12395b;color:#ffffff;">
            <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#d4af37;">Website Lead</p>
            <h1 style="margin:0 0 12px;font-size:26px;line-height:1.25;">${escapeHtml(emailSubject)}</h1>
            <div style="display:inline-block;padding:6px 10px;border:1px solid rgba(255,255,255,0.18);border-radius:999px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#e2e8f0;">
              ${escapeHtml(formTypeLabel)}
            </div>
          </div>
          <div style="padding:24px 28px;">
            <div style="margin:0 0 20px;padding:16px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;color:#475569;">Submission Details</p>
              <p style="margin:0 0 4px;color:#0f172a;"><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
              <p style="margin:0;color:#0f172a;"><strong>Reply to:</strong> ${escapeHtml(submission.email)}</p>
            </div>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
              <tbody>${detailRows}</tbody>
            </table>
            <div style="border:1px solid #e2e8f0;border-radius:12px;padding:20px;background:#f8fafc;">
              <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;font-weight:700;color:#12395b;">Message</p>
              <p style="margin:0;color:#334155;line-height:1.7;">${messageHtml}</p>
            </div>
          </div>
        </div>
      </div>`,
    text: [
      emailSubject,
      `Submitted: ${submittedAt}`,
      `Reply to: ${submission.email}`,
      '',
      ...details.map(([label, value]) => `${label}: ${value}`),
      '',
      'Message:',
      submission.message,
    ].join('\n'),
  };
}

function getSubmissionDetails(submission: ContactSubmissionRequest) {
  const details: Array<[string, string]> = [
    ['Form type', getFormTypeLabel(submission.formType)],
    ['Full name', submission.fullName],
    ['Email', submission.email],
  ];

  if (submission.phone) {
    details.push(['Phone', submission.phone]);
  }

  if (submission.projectType) {
    details.push(['Project type', submission.projectType]);
  }

  if (submission.subject) {
    details.push(['Subject', submission.subject]);
  }

  return details;
}

function formatSubmissionTimestamp() {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'America/Chicago',
    timeZoneName: 'short',
  }).format(new Date());
}

function invalidSubmission(message: string): ValidationResult {
  return {
    ok: false,
    statusCode: 400,
    message,
  };
}

function getPublicErrorMessage(error: {message?: string; name?: string}) {
  const message = error.message?.trim().toLowerCase() || '';

  if (
    message.includes('testing emails to your own email address') ||
    message.includes('verify a domain') ||
    message.includes('resend.dev')
  ) {
    return 'Email delivery is limited by the temporary Resend sender. Confirm this inbox is allowed in your Resend account or switch to a verified domain sender.';
  }

  return 'We could not send your message right now. Please call or email us directly.';
}

function toContactDeliveryError(error: unknown) {
  if (error instanceof ContactDeliveryError) {
    return error;
  }

  if (error instanceof Error) {
    return new ContactDeliveryError(
      getPublicErrorMessage(error),
      502,
      error,
    );
  }

  return new ContactDeliveryError(
    'We could not send your message right now. Please call or email us directly.',
    502,
    error,
  );
}

function getFormTypeLabel(formType: ContactFormType) {
  if (formType === 'quote-request') {
    return 'Quote Request';
  }

  if (formType === 'newsletter-signup') {
    return 'Newsletter Signup';
  }

  return 'Contact Message';
}

function getRequiredString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
