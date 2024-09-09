import React, { useEffect, useState } from 'react';
import { User, WhatsappMessage } from './interfaces';
import "./css/chatComponent.css";
import useSpecificData from './hook/useSpecificUserData';

interface ChatComponentProps {
  user: User | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ user }) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { data, loading, error } = useSpecificData(user?.phone);


  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Aquí puedes agregar la lógica para enviar el mensaje
    console.log('Sending message:', newMessage);

    // Limpiar el campo de entrada después de enviar el mensaje
    setNewMessage('');
  };

{ /* 
  
  useEffect(() => {
    if (user?.WhatsappImage?.length) {
      const mensaje = user.WhatsappImage[0].message.data;
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

  */}  

  if (!user) {
    return null; // No renderizar nada si no hay un usuario seleccionado
  }
 console.log(data)
  return (
    <div className="chat-container">
      <h2>{user.name}</h2>
      {}
      <div className="messages-container">
        {user.WhatsappMessage && user.WhatsappMessage.length > 0 ? (
          user.WhatsappMessage.map((message: WhatsappMessage) => (
            <div
              key={message.id}
              className={`message ${message.direction === 'incoming' ? 'incoming' : 'outgoing'}`}
            >
              <p>{message.message}</p>
            </div>
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </div>
      <div>
        {imageUrl && (
          <div>
            <img src={imageUrl} alt="Imagen" />
          </div>
        )}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;