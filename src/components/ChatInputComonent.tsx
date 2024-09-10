import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  id: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage,id }) => {
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    // Enviar el mensaje a la API
    try {
      const response = await fetch('http://localhost:4000/api/whatsapp/sendTextResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage,id }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje a la API');
      }

      // Llamar a la función onSendMessage para pasar el mensaje al componente padre
      onSendMessage(newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  return (
    <div className="message-input-container flex mt-4">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe un mensaje"
        className="flex-1 p-2 border border-gray-300 rounded-l-lg"
      />
      <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-r-lg">
        Enviar
      </button>
    </div>
  );
};

export default ChatInput;