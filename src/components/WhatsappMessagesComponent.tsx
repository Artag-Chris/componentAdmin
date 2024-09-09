import { useState, useEffect } from 'react';
import useWhatsappData from './hook/useWhatsappData'; // Asegúrate de importar el hook personalizado
;

const WhatsappMessages = () => {
  const { data, loading, error, setData } = useWhatsappData();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const handleClick = (item: any) => {
    //console.log('Clicked item:', item);
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log(item)
      socket.send(JSON.stringify(item));
    }
  };

  const initializeWebSocket = () => {
    const ws = new WebSocket('ws://localhost:4000/ws');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData((prevData) => [...prevData, ...newData]);
      localStorage.setItem('whatsappData', JSON.stringify([...data, ...newData]));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed. Attempting to reconnect in 5 seconds...');
      setTimeout(() => {
        initializeWebSocket();
      }, 5000);
    };

    setSocket(ws);
  };

  useEffect(() => {
    initializeWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
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