import {useEffect, useState} from 'react';
import {fetchAdminSession, loginAdmin, logoutAdmin} from './api';

type AdminSessionState = {
  authenticated: boolean;
  email?: string;
};

export function useAdminSession() {
  const [session, setSession] = useState<AdminSessionState>({
    authenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void refreshSession();
  }, []);

  async function refreshSession() {
    try {
      const response = await fetchAdminSession();
      setSession({
        authenticated: response.authenticated,
        email: response.email,
      });
    } catch {
      setSession({
        authenticated: false,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setIsSubmitting(true);

    try {
      const response = await loginAdmin({
        email,
        password,
      });

      setSession({
        authenticated: response.authenticated,
        email: response.email,
      });

      return response;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function logout() {
    setIsSubmitting(true);

    try {
      await logoutAdmin();
      setSession({
        authenticated: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    session,
    isLoading,
    isSubmitting,
    refreshSession,
    login,
    logout,
  };
}
