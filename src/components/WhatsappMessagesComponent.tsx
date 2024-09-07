
import { useState, useEffect } from 'react';
import axios from 'axios';


const WhatsappMessages= () => {
    const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<any[]>('http://localhost:4000/api/prisma/users');
        setData(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h1>API Data</h1>
      {data.map((item) => (
        <div key={item.id} className="mb-4 p-4 bg-gray-700 rounded">
          <p>ID: {item.id}</p> 
          <p>phone {item.phone} </p>
          <p>Name: {item.name}</p>
          {/* Renderiza más campos según sea necesario */}
        </div>
      ))}
    </div>
  );
};


export default WhatsappMessages;