// src/WhatsappMessagesComponent.tsx
import React, { useEffect, useState } from "react";
import { useWhatsappData } from "./hook/useWhatsappData";
import { User } from "./interfaces";
import { numberParser } from "./functions/numberParser";
import { MessageCircle } from "lucide-react";
import { LoadingComponent } from "./LoadingComponente";


interface WhatsappMessagesComponentProps {
  onSelectUser: (user: User) => void;
}

const WhatsappMessagesComponent: React.FC<WhatsappMessagesComponentProps> = ({
  onSelectUser,
}) => {
  const { data, loading, error, refreshData } = useWhatsappData();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); 
 // const [messages, setMessages] = useState([]);

    const handleClick = (item: User) => {
    { 
      /*
      aqui ira logica de ws para transferir usuario
      if (socket && socket.readyState === WebSocket.OPEN) {
      
      socket.send(JSON.stringify(item.name));
    } */
    }
    onSelectUser(item);
    setSelectedUserId(item.id || null);
  };
 
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshData();
    }, 20000); // 20 segundos

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshData]);

  

  if (loading) {
    return <div><LoadingComponent /> </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 bg-white text-black rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Clientes en Espera</h1>
      <button
        onClick={refreshData}
        className="mb-4 p-2 bg-gray-300 hover:bg-gray-400 text-black rounded-full"
      >
        Refresh Data
      </button>
      <div className="grid grid-cols-1 gap-4">
        {data.map((item: User) => {
          if (item !== null && item.id !== null && item.id !== undefined) {
            return (
              <div
                key={item.id}
                className={`m-2 p-4 bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 ${
                  selectedUserId === item.id ? "bg-white shadow-inner" : ""
                }`}
                onClick={() => handleClick(item)}
              >
                <p className="font-semibold">Nombre: {item.name}</p>
                <p>Telefono: {numberParser(item.phone)}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://wa.me/${item.phone}`, "_blank");
                    }}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
                    aria-label={`Abrir chat de WhatsApp con ${item.name}`}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default WhatsappMessagesComponent;

