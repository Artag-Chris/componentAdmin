import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    onSendMessage(newMessage);
    setNewMessage('');
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
        enviar
      </button>
    </div>
  );
};

export default ChatInput;