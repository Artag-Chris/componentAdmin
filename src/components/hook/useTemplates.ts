
import { useState, useEffect } from 'react';
import { getTemplates } from '../config/envs';

interface UseTemplatesResponse {
  templates: any[];
  error: any;
  loading: boolean;
}

const useTemplates = (): UseTemplatesResponse => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTemplates = async (): Promise<void> => {
    try {
      const response = await fetch(getTemplates);
      const data = await response.json();
      setTemplates(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        fetchTemplates();
      }, 10000); // Vuelve a lanzar la petición cada 10 segundos si falla
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return { templates, error, loading };
};

export default useTemplates; 