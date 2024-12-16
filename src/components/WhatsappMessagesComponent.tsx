import React, { useEffect, useState, useRef } from "react";
import { useWhatsappData } from "./hook/useWhatsappData";
import { User } from "./interfaces";
import { numberParser } from "./functions/numberParser";
import { MessageCircle, RefreshCw } from "lucide-react";
import TetrisLoader from "../loaders/TetrisLoader";
import { url_base } from "./config/envs";

interface WhatsappMessagesComponentProps {
  onSelectUser: (user: User) => void;
}

const WhatsappMessagesComponent: React.FC<WhatsappMessagesComponentProps> = ({
  onSelectUser,
}) => {
  const { data: initialData, loading, error, refreshData } = useWhatsappData();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [wsConnected, setWsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  useEffect(() => { 
    // Solicitar permisos de notificaciones al montar el componente
     if ("Notification" in window && Notification.permission !== "granted")
       { Notification.requestPermission(); } },
      []);

  useEffect(() => {
    if (initialData) {
      setMessages(initialData);
    }
  }, [initialData]);

  useEffect(() => {
     wsRef.current = new WebSocket(`ws://${url_base}/ws`); wsRef.current.onopen = () => { console.log('Conexión establecida con la API');
    setWsConnected(true); };

    wsRef.current.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        if (newData.type === 'broadcast' && newData.payload) {
          const { phone, message } = newData.payload;
          const existingUser = messages.find((user) => user.phone === phone);
          if (!existingUser) {
            // Vuelve a pedir la data inicial si el usuario no está en el arreglo
            refreshData();
          } else {
            setMessages(prevMessages => {
              return prevMessages.map((user) => {
                if (user.phone === phone) {
                  // Mostrar notificación
                  if (document.hidden && Notification.permission === "granted") {
                    new Notification("Nuevo mensaje", {
                      body: message,
                    });
                  }
                  return { ...user, WhatsappMessage: [{ message }] };
                }
                return user;
              });
            });
          }
        } else {
          console.error('Error: La información recibida no es un objeto válido');
        }
      } catch (error) {
        console.error('Error al parsear la información recibida:', error);
      }
    };

    wsRef.current.onclose = () => {
      console.log('Conexión cerrada');
    };

    return () => {
      if (wsRef.current) {
        console.log('Cerrando WebSocket');
      }
    };
  }, [messages]);

  const handleClick = (item: User) => {
    onSelectUser(item);
    setSelectedUserId(item.id || null);
  };

  if (loading) {
    return <TetrisLoader />;
  }

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

  return (
    <div className="bg-white text-gray-800 rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
      <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-500">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Clientes en Espera</h1>
        <button
          onClick={refreshData}
          className="flex items-center justify-center w-full p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-md transition duration-300 ease-in-out"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Actualizar Datos
        </button>
      </div>
      <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {messages.map((item: any) => {
          if (item !== null && item.id !== null && item.id !== undefined && item.WhatsappMessage && item.WhatsappMessage.length > 0 && item.WhatsappMessage[0].status === 'unread') {
            return (
              <div
                key={item.id}
                className={`mb-4 p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out
          ${selectedUserId === item.id
                    ? "bg-purple-100 border-2 border-purple-500"
                    : "hover:bg-gray-200"
                  }`}
                onClick={() => handleClick(item)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-gray-600">{numberParser(item.phone)}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://wa.me/${item.phone}`, "_blank");
                    }}
                    className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                    aria-label={`Abrir chat de WhatsApp con ${item.name}`}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-700 bg-white p-2 rounded-md shadow-sm">
                  "{item.WhatsappMessage[0].message}"
                </p>
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
