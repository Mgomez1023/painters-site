import {useState} from 'react';
import type {FormEvent} from 'react';
import {ArrowRight, Mail} from 'lucide-react';
import {submitContactSubmission} from '../features/contact/api';

type EmailSignupCTAProps = {
  sourceTitle: string;
  sourcePath: string;
  variant?: 'primary' | 'compact';
};

type EmailSignupValues = {
  firstName: string;
  email: string;
};

export function EmailSignupCTA({
  sourceTitle,
  sourcePath,
  variant = 'primary',
}: EmailSignupCTAProps) {
  const [values, setValues] = useState<EmailSignupValues>({
    firstName: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setFeedback('');

    try {
      await submitEmailSignup({
        ...values,
        sourceTitle,
        sourcePath,
      });
      setValues({firstName: '', email: ''});
      setStatus('success');
      setFeedback("Thanks — you're on the list.");
    } catch (error) {
      setStatus('error');
      setFeedback(
        error instanceof Error
          ? error.message
          : 'We could not send that signup right now.',
      );
    }
  }

  const isCompact = variant === 'compact';

  return (
    <section
      className={
        isCompact
          ? 'border border-white/10 bg-white/5 p-4'
          : 'border border-blue-border bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_54%,#f6efe1_100%)] p-6 shadow-sm md:p-8'
      }
    >
      <div className={isCompact ? '' : 'grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center'}>
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Mail
              size={isCompact ? 14 : 18}
              className={isCompact ? 'text-gold-accent' : 'text-primary-light'}
            />
            <p
              className={
                isCompact
                  ? 'text-[9px] font-bold uppercase tracking-widest text-white/40'
                  : 'text-[10px] font-bold uppercase tracking-widest text-primary-light'
              }
            >
              Marom Painting Email List
            </p>
          </div>
          <h2
            className={
              isCompact
                ? 'text-sm font-bold text-white'
                : 'text-2xl font-bold leading-tight text-primary md:text-3xl'
            }
          >
            {isCompact
              ? 'Get seasonal painting tips'
              : 'Get seasonal painting tips and project ideas'}
          </h2>
          {!isCompact ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
              Join the Marom Painting email list for seasonal painting reminders,
              color and trim ideas, and simple ways to keep your home looking
              fresh. No spam. Just occasional tips and project ideas for Chicago
              and North Shore homeowners.
            </p>
          ) : null}
        </div>

        <form className={isCompact ? 'mt-3 space-y-2' : 'space-y-3'} onSubmit={handleSubmit}>
          <input type="hidden" name="sourcePath" value={sourcePath} />
          <input type="hidden" name="sourceTitle" value={sourceTitle} />
          {!isCompact ? (
            <label className="block">
              <span className="sr-only">First name</span>
              <input
                type="text"
                name="firstName"
                className="form-input"
                placeholder="First name (optional)"
                value={values.firstName}
                onChange={(event) =>
                  setValues((currentValues) => ({
                    ...currentValues,
                    firstName: event.target.value,
                  }))
                }
              />
            </label>
          ) : null}
          <label className="block">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              className={
                isCompact
                  ? 'w-full border border-white/10 bg-white/5 px-3 py-2.5 text-[10px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold-accent'
                  : 'form-input'
              }
              placeholder="Email address"
              value={values.email}
              onChange={(event) =>
                setValues((currentValues) => ({
                  ...currentValues,
                  email: event.target.value,
                }))
              }
              required
            />
          </label>
          <button
            type="submit"
            className={
              isCompact
                ? 'flex w-full items-center justify-center gap-2 bg-gold-accent px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-primary disabled:cursor-not-allowed disabled:opacity-70'
                : 'btn-gold flex w-full items-center justify-center gap-2 text-[10px] disabled:cursor-not-allowed disabled:opacity-70'
            }
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Joining...' : 'Send me painting tips'}
            <ArrowRight size={14} />
          </button>
          {feedback ? (
            <p
              role={status === 'error' ? 'alert' : 'status'}
              className={
                isCompact
                  ? `text-[9px] font-bold uppercase tracking-widest ${
                      status === 'error' ? 'text-red-200' : 'text-gold-accent'
                    }`
                  : `text-[10px] font-bold uppercase tracking-widest ${
                      status === 'error' ? 'text-red-600' : 'text-primary-light'
                    }`
              }
            >
              {feedback}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

async function submitEmailSignup({
  firstName,
  email,
  sourceTitle,
  sourcePath,
}: EmailSignupValues & {
  sourceTitle: string;
  sourcePath: string;
}) {
  // Current behavior: send the signup through the existing website lead handler.
  // Future replacement point: connect this function to Mailchimp, Brevo, Supabase,
  // or another list provider when Marom Painting is ready to store subscribers.
  await submitContactSubmission({
    formType: 'newsletter-signup',
    fullName: firstName.trim() || 'Newsletter Subscriber',
    email,
    subject: 'Email list signup',
    message: [
      'Requested seasonal painting tips, reminders, and project ideas.',
      `Source page: ${sourceTitle}`,
      `Source path: ${sourcePath}`,
    ].join('\n'),
  });
}
