import React, { useEffect, useState, useRef } from 'react';
import { User, WhatsappMessage, WhatsappImage, WhatsappAudio, WhatsappVideo, WhatsappDoc } from './interfaces';
import useSpecificData from './hook/useSpecificUserData';
import ChatInput from './ChatInputComonent';
import { Loader2, File, Play, Pause, Phone, Video, Image as ImageIcon, Mic, FileText } from 'lucide-react';

interface ChatComponentProps {
  user: User | null;
}

const ChatWhatsappComponent: React.FC<ChatComponentProps> = ({ user }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const { specificData, loading, error } = useSpecificData(user?.phone);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});


  
  const handleSendMessage = (newMessage: string) => {
    if (newMessage.trim() === '') return;
  };

  

  const renderMessage = (message: WhatsappMessage | WhatsappImage | WhatsappAudio | WhatsappVideo | WhatsappDoc) => {
    if (!message) return null;
    const isOutgoing = message.direction === 'outgoing';
    const baseClasses = `p-3 rounded-lg shadow-sm max-w-[70%] ${
      isOutgoing ? 'bg-green-500 text-white self-end' : 'bg-white self-start'
    }`;

    const renderIcon = () => {
      switch (message.type) {
        case 'image': return <ImageIcon size={16} className="mr-2" />;
        case 'audio': return <Mic size={16} className="mr-2" />;
        case 'video': return <Video size={16} className="mr-2" />;
        case 'document': return <FileText size={16} className="mr-2" />;
        default: return null;
      }
    };

    return (
      <div key={message.id} className={`${baseClasses} mb-2 flex items-start`}>
        {renderIcon()}
        <div className="flex-1">
          {message.type === 'text' && <p>{(message as WhatsappMessage).message}</p>}
          {message.type === 'image' && (
            <img 
              src={URL.createObjectURL(new Blob([new Uint8Array((message as WhatsappImage).message.data)], { type: 'image/jpeg' }))} 
              alt="Whatsapp Image" 
              className="max-w-full h-auto rounded"
            />
          )}
          {message.type === 'audio' && (
            <audio controls className="w-full">
              <source src={URL.createObjectURL(new Blob([new Uint8Array((message as WhatsappAudio).message.data)], { type: 'audio/mpeg' }))} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
          {message.type === 'video' && (
            <video controls className="max-w-full h-auto rounded">
              <source src={URL.createObjectURL(new Blob([new Uint8Array((message as WhatsappVideo).message.data)], { type: 'video/mp4' }))} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {message.type === 'document' && (
            <a 
              href={URL.createObjectURL(new Blob([new Uint8Array((message as WhatsappDoc).message.data)], { type: 'application/octet-stream' }))} 
              download="document" 
              className="flex items-center text-blue-500 hover:underline"
            >
              <File size={16} className="mr-2" />
              Download document
            </a>
          )}
        </div>
      </div>
    );
  };

  if (error) {
    return <div className="text-red-500 text-center p-4 bg-white rounded-lg shadow-md">Error: {error}</div>;
  }

  return (
   <h1> Chat </h1>
  );
};

export default ChatWhatsappComponent;
/*
<div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-lg overflow-hidden">
<div className="bg-green-500 text-white p-4 flex items-center">
  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
    <Phone className="text-green-500" size={20} />
  </div>
  <h2 className="text-xl font-semibold">{specificData?.name || 'Chat'}</h2>
</div>
<div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
  {loading ? (
    <div className="flex justify-center items-center h-full">
      <Loader2 className="w-8 h-8 animate-spin text-green-500" />
    </div>
  ) : (
    <div className="space-y-2">
      {specificData?.WhatsappMessage?.map(renderMessage)}
      {specificData?.WhatsappImage?.map(renderMessage)}
      {specificData?.WhatsappAudio?.map(renderMessage)}
      {specificData?.WhatsappVideo?.map(renderMessage)}
      {specificData?.WhatsappDoc?.map(renderMessage)}
      {messages.map((msg, index) => (
        <div key={`local-${index}`} className="p-3 rounded-lg shadow-sm max-w-[70%] bg-green-500 text-white self-end mb-2">
          <p>{msg}</p>
        </div>
      ))}
    </div>
  )}
</div>
<div className="bg-white p-4 border-t border-gray-200">
  <ChatInput onSendMessage={handleSendMessage} id={specificData?.phone || ''} />
</div>
</div>*/