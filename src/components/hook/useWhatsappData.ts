import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FetchDatafromAPIClass } from '../interfaces/fetchUsersData';

export const useWhatsappData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [forceRefresh, setForceRefresh] = useState<boolean>(false);


  const fetchData = useCallback(async () => {
    setLoading(true);
    const storedData = localStorage.getItem('whatsappData');
    if (storedData && !forceRefresh) {
      setData(JSON.parse(storedData));
      setLoading(false);
    } else {
      try {
        const response = await axios.get<FetchDatafromAPIClass[]>('http://localhost:4000/api/prisma/users');
        const uniqueData = Array.from(new Set(response.data.map(item => item.phone)));
      
        setData((prevData) => [...prevData, ...uniqueData]);
        localStorage.setItem('whatsappData', JSON.stringify([...(JSON.parse(storedData!) || []), ...response.data]));
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    }
  }, [forceRefresh]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = () => {
    setForceRefresh(true);
    localStorage.removeItem('whatsappData');
    fetchData().finally(() => setForceRefresh(false));
  };

  return { data, loading, error, setData, refreshData };
};