import React, { useEffect, useState } from 'react';
import { User, WhatsappImage, WhatsappMessage } from './interfaces';
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

  //funcion para ver si hay imagnes y colocarlas en un url
  
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

    
  if(data){
    console.log(data.WhatsappImage)
  }  
 
   

  if (!user) {
    return null; // No renderizar nada si no hay un usuario seleccionado
  }
  
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
      <div className="images-container">
        {data!.WhatsappImage && data!.WhatsappImage.length > 0 ? (
          data!.WhatsappImage.map((image: WhatsappImage) => {
            const blob = new Blob([new Uint8Array(image.message.data)], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            return (
              <div key={image.id} className={`message ${image.direction === 'incoming' ? 'incoming' : 'outgoing'}`}>
                <img src={url} alt="Whatsapp Image" />
              </div>
            );
          })
        ) : (
          <p>No images available.</p>
        )}
      </div>
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