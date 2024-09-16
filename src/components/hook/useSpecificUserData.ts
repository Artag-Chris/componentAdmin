import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { WhatsappAudio, WhatsappDoc, WhatsappImage, WhatsappMessage, WhatsappVideo } from '../interfaces';


interface Message{
  
  WhatsappMessage?: WhatsappMessage[];
  WhatsappImage?  : WhatsappImage[];
  WhatsappAudio?  : WhatsappAudio[];
  WhatsappVideo?  : WhatsappVideo[];
  WhatsappDoc  ?  : WhatsappDoc[];
}

const useSpecificData = (id?: string | null) => {
  const [specificData, setSpecificData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (id === null) {
      setSpecificData([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const responses = await Promise.all([
        axios.get<Message[]>(`http://localhost:4000/api/prisma/deepSearchForAllMessages/${id}`),
        axios.get<Message[]>(`http://localhost:4000/api/prisma/searchForBotMessages/${id}`),
      ]);
     //combino los datos para renderizarlos como uno solo
      const mergedData = {
        ...responses[1].data ,
        ...responses[0].data ,
        WhatsappMessage: [
          ...(responses[0].data as Message)?.WhatsappMessage ?? [],
          ...(responses[1].data as Message)?.WhatsappMessage ?? [],
          ...(responses[0].data as Message)?.WhatsappAudio ?? [],
          ...(responses[1].data as Message)?.WhatsappAudio ?? [],
          ...(responses[0].data as Message)?.WhatsappImage ?? [],
          ...(responses[1].data as Message)?.WhatsappImage ?? [],
          ...(responses[0].data as Message)?.WhatsappVideo ?? [],
          ...(responses[1].data as Message)?.WhatsappVideo ?? [],
          ...(responses[0].data as Message)?.WhatsappDoc ?? [],
          ...(responses[1].data as Message)?.WhatsappDoc ?? [],
        ],
      };
      setSpecificData(mergedData);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  return { specificData, loading, error,setLoading,refreshData };
};

export default useSpecificData;