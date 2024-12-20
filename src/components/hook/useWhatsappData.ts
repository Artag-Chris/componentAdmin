"use client"
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FetchDatafromAPIClass } from '../interfaces/fetchUsersData';
import { api_user } from '../config/envs';

export const useWhatsappData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<FetchDatafromAPIClass[]>(api_user);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = () => {
    fetchData();
  };

  return { data, loading, error, setData, refreshData };
};