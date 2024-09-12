import React, { useEffect, useState, useRef } from 'react';
import { User, WhatsappMessage, WhatsappImage, WhatsappAudio, WhatsappVideo, WhatsappDoc, } from './interfaces';
import useSpecificData from './hook/useSpecificUserData';
import ChatInput from './ChatInputComonent';
import { Loader2, File, Play, Pause } from 'lucide-react';

interface ChatComponentProps {
  user: User | null;
}

const ChatWhatsappComponent: React.FC<ChatComponentProps> = ({ user }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const { data, loading, error } = useSpecificData(user?.phone);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});

  const userData = data.user;
  const botData = data.botMessages;

  const handleSendMessage = (newMessage: string) => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, newMessage]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [data, messages]);

  const renderMessage = (message: WhatsappMessage | WhatsappImage | WhatsappAudio | WhatsappVideo | WhatsappDoc) => {
    const isOutgoing = message.direction === 'outgoing';
    const baseClasses = `p-4 rounded-lg shadow-sm max-w-[70%] ${
      isOutgoing ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'
    }`;

    switch (message.type) {
      case 'text':
        return (
          <div key={message.id} className={baseClasses}>
            <p>{(message as WhatsappMessage).message}</p>
          </div>
        );
      case 'image':
        const imageMessage = message as WhatsappImage;
        const imageBlob = new Blob([new Uint8Array(imageMessage.message.data)], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(imageBlob);
        return (
          <div key={message.id} className={baseClasses}>
            <img src={imageUrl} alt="Whatsapp Image" className="max-w-full h-auto rounded-lg" />
          </div>
        );
      case 'audio':
        const audioMessage = message as WhatsappAudio;
        const audioBlob = new Blob([new Uint8Array(audioMessage.message.data)], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        return (
          <div key={message.id} className={`${baseClasses} flex items-center`}>
           { /*<button
              onClick={() => {
                const audio = new Audio(audioUrl);
                if (isPlaying[message.id!]) {
                  audio.pause();
                } else {
                  audio.play();
                }
                setIsPlaying({ ...isPlaying, [message.id!]: !isPlaying[message.id!] });
              }}
              className="mr-2 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
              aria-label={isPlaying[message.id!] ? "Pause audio" : "Play audio"}
            >
              {isPlaying[message.id!] ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <span>Audio message</span> */}
          </div>
        );
      case 'video':
        const videoMessage = message as WhatsappVideo;
        const videoBlob = new Blob([new Uint8Array(videoMessage.message.data)], { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(videoBlob);
        return (
          <div key={message.id} className={baseClasses}>
            <video controls className="max-w-full h-auto rounded-lg">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'document':
        const docMessage = message as WhatsappDoc;
        const docBlob = new Blob([new Uint8Array(docMessage.message.data)], { type: 'application/octet-stream' });
        const docUrl = URL.createObjectURL(docBlob);
        return (
          <div key={message.id} className={`${baseClasses} flex items-center`}>
            <File className="mr-2" size={24} />
            <a href={docUrl} download="document" className="underline">
              Download document
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <h1>{ userData?.name || 'Chat'}</h1>
  );
};

export default ChatWhatsappComponent;


/*
<div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{data?.name || 'Chat'}</h2>
      <div className="flex-1 overflow-y-auto mb-4" ref={chatContainerRef}>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {data?.WhatsappMessage?.map(renderMessage)}
            {data?.WhatsappImage?.map(renderMessage)}
            {data?.WhatsappAudio?.map(renderMessage)}
            {data?.WhatsappVideo?.map(renderMessage)}
            {data?.WhatsappDoc?.map(renderMessage)}
            {messages.map((msg, index) => (
              <div key={`local-${index}`} className="p-4 rounded-lg shadow-sm max-w-[70%] bg-blue-500 text-white self-end">
                <p>{msg}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <ChatInput onSendMessage={handleSendMessage} id={data?.phone || ''} />
      </div>
    </div>*/