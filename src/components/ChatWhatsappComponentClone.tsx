import React, { useState, useEffect, useRef } from "react";
import {
  File,
  Mic,
  Play,
  Pause,
  Image,
  Video,
  Paperclip,
  Send,
} from "lucide-react";
import useSpecificData from "./hook/useSpecificUserData";
import { Conversation } from "./class/Conversation";
import { format } from "date-fns/format";
import { ChatMessages } from "./interfaces/mergedDataMessages";
import { User, WhatsappMessage, WhatsappStatus } from "./interfaces";

//import { MergedMessagesToChats } from './interfaces/mergedDataMessages';

interface Props {
  user: any; // Define el tipo de usuario que se espera
}

const ImageMessage: React.FC<{
  src: string;
  direction: "outgoing" | "incoming";
}> = ({ src, direction }) => (
  <img
    src={src}
    alt="Shared image"
    className={`max-w-xs lg:max-w-sm rounded-lg ${
      direction === "outgoing" ? "ml-auto" : "mr-auto"
    }`}
  />
);

const VideoMessage: React.FC<{
  src: string;
  direction: "outgoing" | "incoming";
}> = ({ src, direction }) => (
  <video
    controls
    className={`max-w-xs lg:max-w-sm rounded-lg ${
      direction === "outgoing" ? "ml-auto" : "mr-auto"
    }`}
  >
    <source src={src} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);

const VoiceMessage: React.FC<{
  src: string;

  direction: "outgoing" | "incoming";
}> = ({ src, direction }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={`flex items-center space-x-2 ${
        direction === "outgoing" ? "justify-end" : "justify-start"
      }`}
    >
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
        aria-label={isPlaying ? "Pause voice message" : "Play voice message"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <div className="bg-gray-200 h-1 w-32 rounded-full">
        <div
          className="bg-green-500 h-1 rounded-full"
          style={{ width: `${isPlaying ? 50 : 0}%` }}
        ></div>
      </div>
      <audio ref={audioRef} src={src} onEnded={handleEnded} />
    </div>
  );
};

const DocumentMessage: React.FC<{
  direction: "outgoing" | "incoming";
}> = ({ direction }) => (
  <div
    className={`flex items-center space-x-2 ${
      direction === "outgoing" ? "justify-end" : "justify-start"
    }`}
  >
    <File size={24} />
  </div>
);

export default function EnhancedWhatsAppChat({ user }: Props) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { specificData } = useSpecificData(user?.phone);
  const [envio, setenvio] = useState<User | null>(null);
  const conversation = new Conversation(
    specificData.id,
    specificData.name,
    specificData.phone,
    specificData.email,
    specificData.identification,
    specificData.attending,
    specificData.lastActive,
    specificData.wppStatus,
    specificData.detail,
    specificData.WhatsappMessage,
    specificData.WhatsappImage,
    specificData.WhatsappAudio,
    specificData.WhatsappVideo,
    specificData.WhatsappDoc
  );

  useEffect(() => {
    const loadMessages = async () => {
      //const fetchedMessages = await fetchMessages()
      setMessages(conversation.mergeArrays());
      setLoading(false);
    };
    loadMessages();
  }, [specificData]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSendMessage = async() => {
    if (inputText.trim()) {
      const newMessage: ChatMessages = {
        id: `${(messages?.length + 1).toString()}`,
        type: "text",
        message: inputText,
        timestamp: new Date(),
        direction: "outgoing",
        to: specificData.phone,
        customerId: specificData.id,
        attendant: specificData.attending,
        status: "delivered",
        mediaId: "",
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
    const array: WhatsappMessage[] = [
      {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        message: inputText,
        to: specificData.phone,
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
    setenvio(enviar)
    // Send the first POST request to send the text message
    try {
      const [response, responseToSave] = await Promise.all([
        fetch('http://localhost:4000/api/whatsapp/sendTextResponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputText, id: specificData.phone }),
        }),
        fetch('http://localhost:4000/api/prisma/frontmessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(envio),
        }),
      ])
  
      if (!response.ok || !responseToSave.ok) {
        throw new Error(`Error sending message: ${response.status} ${response.statusText} o ${responseToSave.status} ${responseToSave.statusText}`);
      }
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video" | "document"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newMessage: ChatMessages = {
          id: `${(messages?.length + 1).toString()}`,
          type,
          message: content, //aqui tiene que convertirse en un base64
          timestamp: new Date(),
          direction: "outgoing",
          to: specificData.phone,
          customerId: specificData.id,
          attendant: specificData.attending,
          status: "delivered",
          mediaId: "",
        };
        setMessages([...messages, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceRecording = () => {
    if (isRecording) {
      // Stop recording and send voice message
      const newMessage: ChatMessages = {
        id: `${(messages?.length + 1).toString()}`,
        type: "audio",
        message: "https://example.com/recorded-audio.mp3", // This would be the actual recorded audio URL
        timestamp: new Date(),
        direction: "incoming",
        to: specificData.phone,
        customerId: specificData.id,
        attendant: specificData.attending,
        status: "delivered",
        mediaId: "",
      };
      setMessages([...messages, newMessage]);
      setIsRecording(false);
      setRecordingTime(0);
    } else {
      // Start recording
      setIsRecording(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading messages...
      </div>
    );
  }
  // console.log(JSON.stringify(messages));
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.direction === "outgoing" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.direction === "outgoing"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              {message.type === "text" && (
                <p className="text-sm">{message.message}</p>
              )}
              {message.type === "image" && (
                <ImageMessage
                  src={message.message}
                  direction={message.direction}
                />
              )}
              {message.type === "video" && (
                <VideoMessage
                  src={message.message}
                  direction={message.direction}
                />
              )}
              {message.type === "audio" && (
                <VoiceMessage
                  src={message.message}
                  direction={message.direction}
                />
              )}
              {message.type === "document" && (
                <DocumentMessage direction={message.direction} />
              )}
              <p
                className={`text-xs mt-1 ${
                  message.direction === "outgoing"
                    ? "text-green-100"
                    : "text-gray-500"
                }`}
              >
                {format(new Date(message.timestamp), "HH:mm")}
              </p>
            </div>
          </div>
        ))}
      </div>
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
            onChange={(e) => handleFileUpload(e, "document")}
            accept=".pdf,.doc,.docx,.txt"
          />
          <button
            onClick={handleVoiceRecording}
            className={`p-2 rounded-full ${
              isRecording ? "bg-red-500" : "bg-gray-200"
            } text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-red-300`}
            aria-label={
              isRecording ? "Stop recording" : "Start voice recording"
            }
          >
            <Mic size={20} />
          </button>
          {isRecording && (
            <span className="text-sm text-red-500">{recordingTime}s</span>
          )}
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}