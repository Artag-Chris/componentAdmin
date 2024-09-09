import { useState, useEffect } from 'react';
import axios from 'axios';

const useWhatsappData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem('whatsappData');
      if (storedData) {
        setData(JSON.parse(storedData));
        setLoading(false);
      } else {
        try {
          const response = await axios.get<any[]>('http://localhost:4000/api/prisma/users');
          setData(response.data);
          localStorage.setItem('whatsappData', JSON.stringify(response.data));
          setLoading(false);
        } catch (err) {
          setError('Error fetching data');
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, setData };
};

export default useWhatsappData;