import { Mic, Paperclip, Send } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { User, WhatsappMessage, WhatsappStatus } from './interfaces';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  id: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, id }) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [inputText, setInputText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;
    const array: WhatsappMessage[] = [
      {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        message: inputText,
        to: id,
        status: "delivered",
        direction: "outgoing",
        type: "text",
        mediaId: "",
        attendant: 0
      },        
    ]
    
    const enviar:User ={
      name: "Bot",
      phone: "573025970185",
      identification: "573025970185",
      atending: 0,
      lastActive: new Date(),
      wppStatus: WhatsappStatus.attended,
      WhatsappMessage: array,
      detail: ""
    }
    setUser(enviar)
    // Send the first POST request to send the text message
    try {
      const response = await fetch('http://localhost:4000/api/whatsapp/sendTextResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText, id }),
      });
      if (!response.ok) {
        throw new Error(`Error sending message: ${response.status} ${response.statusText}`);
      }
  

   
  
     const responseToSave = await fetch('http://localhost:4000/api/prisma/frontmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });  
      console.log(responseToSave)
  
      // Call the onSendMessage function to pass the message to the parent component
      onSendMessage(inputText);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
    
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'document') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Attach file"
        >
          <Paperclip size={20} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'document')}
          accept=".pdf,.doc,.docx,.txt"
        />
        <button
          // onClick={handleVoiceRecording}
          // className={`p-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gray-200'} text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-red-300`}
          // aria-label={isRecording ? 'Stop recording' : 'Start voice recording'}
        >
          <Mic size={20} />
        </button>
        {/* isRecording && <span className="text-sm text-red-500">{recordingTime}s</span> */}
        <button
          onClick={handleSendMessage}
          className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;


