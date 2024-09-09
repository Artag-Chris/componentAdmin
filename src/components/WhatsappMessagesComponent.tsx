import React, { useState, useEffect } from 'react';
import useWhatsappData from './hook/useWhatsappData'; // Asegúrate de importar el hook personalizado
import { User } from './interfaces';
import { numberParser } from './functions/numberParser';

interface WhatsappMessagesComponentProps {
  onSelectUser: (user: User) => void;
}

const WhatsappMessagesComponent: React.FC<WhatsappMessagesComponentProps> = ({ onSelectUser, }) => {
  const { data, loading, error, setData, refreshData } = useWhatsappData();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const handleClick = (item: User) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(item));
    }
    onSelectUser(item);
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
      <button onClick={refreshData} className="refresh-button">Refresh Data</button>
      <div className="grid grid-cols-1 gap-2">
        {data.map((item: User) => (
          <div
            key={item.id}
            className="m-2 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
            onClick={() => handleClick(item)}
          >
            <p>Nombre: {item.name}</p>
            <p>Telefono: {numberParser(item.phone)}</p>
            {/* Renderiza más campos según sea necesario */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsappMessagesComponent;