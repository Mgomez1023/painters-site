import {useEffect, useState} from 'react';
import type {FormEvent} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {LockKeyhole, X} from 'lucide-react';

type LoginModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string) => Promise<void>;
};

export function LoginModal({
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
}: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    try {
      await onSubmit(email, password);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'We could not log you in right now.',
      );
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="fixed inset-0 z-[70] bg-primary/70 px-6 py-10 backdrop-blur-sm"
        >
          <div className="flex min-h-full items-center justify-center">
            <motion.div
              initial={{opacity: 0, y: 24}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 12}}
              className="relative w-full max-w-md bg-white shadow-2xl"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 text-primary/40 transition-colors hover:text-primary"
                aria-label="Close login"
              >
                <X size={18} />
              </button>

              <div className="border-t-4 border-gold-accent px-6 py-7 md:px-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-blue-bg text-primary">
                    <LockKeyhole size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-primary-light">
                      Portfolio Admin
                    </p>
                    <h2 className="text-2xl font-bold text-primary">Login</h2>
                  </div>
                </div>

                <form className="space-y-3.5" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      className="form-input"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      Password
                    </label>
                    <input
                      type="password"
                      autoComplete="current-password"
                      className="form-input"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>

                  {error ? (
                    <p role="alert" className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    className="w-full btn-gold disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing In...' : 'Login'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
