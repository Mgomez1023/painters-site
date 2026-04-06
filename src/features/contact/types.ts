export const contactApiRoute = '/api/contact';

export type ContactFormType = 'quote-request' | 'contact-message';

export type QuoteFormValues = {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
};

export type ContactFormValues = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactSubmissionRequest = {
  formType: ContactFormType;
  fullName: string;
  email: string;
  message: string;
  phone?: string;
  projectType?: string;
  subject?: string;
};

export type ContactSubmissionResponse = {
  ok: boolean;
  message: string;
};

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export const initialQuoteFormValues: QuoteFormValues = {
  fullName: '',
  phone: '',
  email: '',
  projectType: '',
  message: '',
};

export const initialContactFormValues: ContactFormValues = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
};
