import React, { useState } from 'react';
import { User, WhatsappMessage } from './interfaces';
import "./css/chatComponent.css"
interface ChatComponentProps {
  user: User | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ user }) => {
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Aquí puedes agregar la lógica para enviar el mensaje
    console.log('Sending message:', newMessage);

    // Limpiar el campo de entrada después de enviar el mensaje
    setNewMessage('');
  };

  if (!user) {
    return null; // No renderizar nada si no hay un usuario seleccionado
  }

  return (
    <div className="chat-container">
      <h2>{user.name}</h2>
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