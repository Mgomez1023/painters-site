import {Resend} from 'resend';
import type {
  ContactFormType,
  ContactSubmissionRequest,
} from '../../src/features/contact/types';

const RESEND_RECIPIENTS = [
  'marting2046@gmail.com',
  'Martin2mvp@yahoo.com',
];

const DEFAULT_FROM_EMAIL = 'Chicago Elite Painting <onboarding@resend.dev>';

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

  return invalidSubmission('Invalid form type.');
}

export async function sendContactSubmissionEmail(
  submission: ContactSubmissionRequest,
) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable.');
  }

  const resend = new Resend(apiKey);
  const subject = buildEmailSubject(submission);
  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;
  const emailContent = buildEmailContent(submission);

  await resend.emails.send({
    from,
    to: RESEND_RECIPIENTS,
    subject,
    html: emailContent.html,
    text: emailContent.text,
    replyTo: submission.email,
  });
}

export function buildSuccessMessage(formType: ContactFormType) {
  if (formType === 'quote-request') {
    return 'Your quote request has been sent. We will follow up within 24 hours.';
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

function buildEmailSubject(submission: ContactSubmissionRequest) {
  if (submission.formType === 'quote-request') {
    return `New quote request from ${submission.fullName}`;
  }

  return `New contact message from ${submission.fullName}`;
}

function buildEmailContent(submission: ContactSubmissionRequest) {
  const submittedAt = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Chicago',
  }).format(new Date());

  const details = getSubmissionDetails(submission);
  const detailRows = details
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#12395b;width:180px;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#334155;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  const messageHtml = escapeHtml(submission.message).replace(/\n/g, '<br />');

  return {
    html: `
      <div style="background:#f8fafc;padding:32px;font-family:Arial,sans-serif;color:#0f172a;">
        <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;">
          <div style="padding:24px 28px;background:#12395b;color:#ffffff;">
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#d4af37;">Website Lead</p>
            <h1 style="margin:0;font-size:28px;line-height:1.2;">${escapeHtml(buildEmailSubject(submission))}</h1>
          </div>
          <div style="padding:24px 28px;">
            <p style="margin:0 0 20px;color:#475569;">Submitted ${escapeHtml(submittedAt)}</p>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tbody>${detailRows}</tbody>
            </table>
            <div style="border:1px solid #e2e8f0;padding:20px;background:#f8fafc;">
              <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;font-weight:700;color:#12395b;">Message</p>
              <p style="margin:0;color:#334155;line-height:1.7;">${messageHtml}</p>
            </div>
          </div>
        </div>
      </div>`,
    text: [
      buildEmailSubject(submission),
      `Submitted: ${submittedAt}`,
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
    ['Form type', submission.formType === 'quote-request' ? 'Quote Request' : 'Contact Message'],
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

function invalidSubmission(message: string): ValidationResult {
  return {
    ok: false,
    statusCode: 400,
    message,
  };
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
