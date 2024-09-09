import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { WhatsappAudio, WhatsappDoc, WhatsappImage, WhatsappMessage, WhatsappVideo } from '../interfaces';

interface SpecificData {
  whatsappMessage?: WhatsappMessage,
  whatsappImage?:WhatsappImage,
  whatsappVideo?:WhatsappVideo,
  whatsappAudio?:WhatsappAudio,
  whatsappDoc?:WhatsappDoc 
}

const useSpecificData = (id?: string | null) => {
  const [data, setData] = useState<SpecificData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (id === null) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<SpecificData>(`http://localhost:4000/api/prisma/user/${id}`);
     // console.log(response.data)
      setData(response.data);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  return { data, loading, error };
};

export default useSpecificData;