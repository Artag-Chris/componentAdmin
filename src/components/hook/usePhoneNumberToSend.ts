import { useState, useEffect } from 'react';
import { getPhoneNumber } from '../config/envs';

interface UsePhoneNumbersResponse {
  phoneNumbers: any[];
  error: any;
  loading: boolean;
}
interface PhoneSended{
    "id": number,
    "number": string
}

const usePhoneNumbers = (): UsePhoneNumbersResponse => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneSended[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPhoneNumbers = async (): Promise<void> => {
    try {
      const response = await fetch(getPhoneNumber);
      if (!response.ok) {
        throw new Error('Error al obtener los números de teléfono');
      }
      const data = await response.json();
      const dataArray = JSON.parse(data);
      setPhoneNumbers(dataArray);
      setLoading(false);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        fetchPhoneNumbers();
      }, 10000); // Vuelve a lanzar la petición cada 10 segundos si falla
    }
  };
  useEffect(() => {  
    fetchPhoneNumbers(); 
  }, []);
 
  return { phoneNumbers, error, loading };
};

export default usePhoneNumbers;