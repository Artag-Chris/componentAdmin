import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { User, WhatsappAudio, WhatsappDoc, WhatsappImage, WhatsappMessage, WhatsappVideo } from '../interfaces';

interface SpecificData {
  whatsappMessage?: WhatsappMessage,
  whatsappImage?:WhatsappImage,
  whatsappVideo?:WhatsappVideo,
  whatsappAudio?:WhatsappAudio,
  whatsappDoc?:WhatsappDoc 
}
interface CombinedData {
  user: User | null;
  botMessages: User | null;
}

const useSpecificData = (id?: string | null) => {
  const [data, setData] = useState<CombinedData>({ user: null, botMessages: null });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (id === null) {
      setData({ user: null, botMessages: null });
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const responses = await Promise.all([
        axios.get<User>(`http://localhost:4000/api/prisma/deepSearchForAllMessages/${id}`),
        axios.get<User>(`http://localhost:4000/api/prisma/searchForBotMessages/${id}`),
      ]);
      setData({
        user: responses[0].data,
        botMessages: responses[1].data,
      });
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  return { data, loading, error,setLoading };
};

export default useSpecificData;