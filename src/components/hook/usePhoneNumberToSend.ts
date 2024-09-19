import { useState, useEffect } from 'react';

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
      const response = await fetch('http://localhost:4000/api/whatsapp/getphones');
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