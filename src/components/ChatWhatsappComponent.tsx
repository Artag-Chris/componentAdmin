import React, { useEffect, useState } from 'react';
import { User, WhatsappImage, WhatsappMessage } from './interfaces';
import useSpecificData from './hook/useSpecificUserData';
import ChatInput from './ChatInputComonent';

interface ChatComponentProps {
  user: User | null;
}

const ChatWhatsappComponent: React.FC<ChatComponentProps> = ({ user }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { data, loading, error } = useSpecificData(user?.phone);

  const handleSendMessage = (newMessage: string) => {
    if (newMessage.trim() === '') return;
    // Agregar el nuevo mensaje al estado de mensajes
    setMessages([...messages, newMessage]);
  };  

  useEffect(() => {
    if (data?.WhatsappImage?.length) {
      const mensaje = data.WhatsappImage[0].message.data;
      const blob = new Blob([new Uint8Array(mensaje)], { type: 'image/jpeg' });
      // Crear una URL de objeto a partir del Blob
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      // Limpiar la URL de objeto cuando el componente se desmonte
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImageUrl(null); // Asegurarse de limpiar la URL si no hay imagen
    }
  }, [user]);

  if (!data) {
    return null; // No renderizar nada si no hay un usuario seleccionado
  }

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{data.name}</h2>
      <div className="flex-1 overflow-y-auto mb-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="spinner border-t-4 border-gray-300 border-solid rounded-full w-8 h-8 animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="messages-container space-y-4">
              {data!.WhatsappMessage && data!.WhatsappMessage.length > 0 ? (
                data!.WhatsappMessage.map((message: WhatsappMessage) => (
                  <div
                    key={message.id}
                    className={`message p-4 rounded-lg shadow-sm max-w-[30%] ${
                      message.direction === 'outgoing' ? 'bg-gray-100 self-start' : 'bg-gray-300 self-end'
                    }`}
                  >
                    <p>{message.message}</p>
                  </div>
                ))
              ) : (
                <p>No messages available.</p>
              )}
              {/* Renderizar los mensajes enviados desde ChatInput */}
              {messages.map((msg, index) => (
                <div key={index} className="message p-4 rounded-lg shadow-sm max-w-[30%] bg-blue-500 text-white self-end">
                  <p>{msg}</p>
                </div>
              ))}
            </div>
            <div className="images-container space-y-4 mt-4">
              {data!.WhatsappImage && data!.WhatsappImage.length > 0 ? (
                data!.WhatsappImage.map((image: WhatsappImage) => {
                  const blob = new Blob([new Uint8Array(image.message.data)], { type: 'image/jpeg' });
                  const url = URL.createObjectURL(blob);
                  return (
                    <div
                      key={image.id}
                      className={`message p-4 rounded-lg shadow-sm max-w-[30%] ${
                        image.direction === 'outgoing' ? 'bg-gray-100 self-start' : 'bg-gray-300 self-end'
                      }`}
                    >
                      <img src={url} alt="Whatsapp Image" className="max-w-full h-auto rounded-lg" />
                    </div>
                  );
                })
              ) : (
                <p></p>
              )}
            </div>
          </>
        )}
      </div>
      <div>
        <ChatInput onSendMessage={handleSendMessage} id={data!.phone} />
      </div>
    </div>
  );
};

export default ChatWhatsappComponent;