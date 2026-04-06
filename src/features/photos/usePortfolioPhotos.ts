import {useEffect, useState} from 'react';
import {fetchPortfolioPhotos} from './api';
import type {PortfolioPhoto} from './shared';

export function usePortfolioPhotos() {
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    void refreshPhotos();
  }, []);

  async function refreshPhotos() {
    setIsLoading(true);
    setError('');

    try {
      const nextPhotos = await fetchPortfolioPhotos();
      setPhotos(nextPhotos);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'The portfolio is temporarily unavailable.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return {
    photos,
    setPhotos,
    isLoading,
    error,
    refreshPhotos,
  };
}
