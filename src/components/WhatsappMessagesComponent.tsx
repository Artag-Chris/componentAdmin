import React, { useEffect, useState } from "react";
import { useWhatsappData } from "./hook/useWhatsappData";
import { User } from "./interfaces";
import { numberParser } from "./functions/numberParser";
import { MessageCircle, RefreshCw } from "lucide-react";
import TetrisLoader from "../loaders/TetrisLoader";


interface WhatsappMessagesComponentProps {
  onSelectUser: (user: User) => void;
}

const WhatsappMessagesComponent: React.FC<WhatsappMessagesComponentProps> = ({
  onSelectUser,
}) => {
  const { data, loading, error, refreshData } = useWhatsappData();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleClick = (item: User) => {
    onSelectUser(item);
    setSelectedUserId(item.id || null);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshData();
    }, 20000); // 20 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshData]);

  if (loading) {
    return <TetrisLoader />;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="bg-white text-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-500">
        <h1 className="text-2xl font-bold text-white mb-2">Clientes en Espera</h1>
        <button
          onClick={refreshData}
          className="flex items-center justify-center w-full p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-md transition duration-300 ease-in-out"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Actualizar Datos
        </button>
      </div>
      <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {data.map((item: User) => {
          if (item !== null && item.id !== null && item.id !== undefined) {
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
                <p className="font-semibold text-lg mb-1">{item.name}</p>
                <p className="text-gray-600 mb-2">{numberParser(item.phone)}</p>
                <div className="flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://wa.me/${item.phone}`, "_blank");
                    }}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
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