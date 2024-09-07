
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


const WhatsappMessages= () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);



  const handleClick = (item: any) => {
    console.log('Clicked item:', item);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(item);
    }
  };
 
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

  //TODO metodo para reconectarse si ya no esta conectado 
  const socket = new WebSocket('ws://localhost:4000/ws');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData((prevData) => [...prevData, ...newData]);
      localStorage.setItem('whatsappData', JSON.stringify([...data, ...newData]));
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h1>API Data</h1>
      <div className="grid grid-cols-1 gap-2">
        {data.map((item) => (
          <div
            key={item.id}
            className="m-2 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
            onClick={() => handleClick(item)}
          >
            <p>Phone: {item.phone}</p>
            <p>Name: {item.name}</p>
            {/* Renderiza más campos según sea necesario */}
          </div>
        ))}
      </div>
    </div>
  );
};


export default WhatsappMessages;