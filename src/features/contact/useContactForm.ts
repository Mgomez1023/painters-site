import {useState} from 'react';
import type {ChangeEvent, FormEvent} from 'react';
import {submitContactSubmission} from './api';
import type {
  ContactSubmissionRequest,
  SubmissionStatus,
} from './types';

type FormValues = Record<string, string>;

type ContactFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

type UseContactFormOptions<TValues extends FormValues> = {
  initialValues: TValues;
  buildPayload: (values: TValues) => ContactSubmissionRequest;
};

export function useContactForm<TValues extends FormValues>({
  initialValues,
  buildPayload,
}: UseContactFormOptions<TValues>) {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (event: ChangeEvent<ContactFieldElement>) => {
    const {name, value} = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (status !== 'idle') {
      setStatus('idle');
      setFeedback('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setFeedback('');

    try {
      const response = await submitContactSubmission(buildPayload(values));
      setValues(initialValues);
      setStatus('success');
      setFeedback(response.message);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'We could not send your message right now. Please try again.';

      setStatus('error');
      setFeedback(message);
    }
  };

  return {
    values,
    status,
    feedback,
    isSubmitting: status === 'submitting',
    handleChange,
    handleSubmit,
  };
}
