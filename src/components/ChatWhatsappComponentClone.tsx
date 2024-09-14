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

//import { MergedMessagesToChats } from './interfaces/mergedDataMessages';

interface Props {
  user: any; // Define el tipo de usuario que se espera
}

// Simulated API call to fetch messages

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
  duration: number;
  direction: "outgoing" | "incoming";
}> = ({ src, duration, direction }) => {
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
      <span className="text-sm text-gray-500">{duration}s</span>
      <audio ref={audioRef} src={src} onEnded={handleEnded} />
    </div>
  );
};

const DocumentMessage: React.FC<{
  fileName: string;
  fileSize: string;
  direction: "outgoing" | "incoming";
}> = ({ fileName, fileSize, direction }) => (
  <div
    className={`flex items-center space-x-2 ${
      direction === "outgoing" ? "justify-end" : "justify-start"
    }`}
  >
    <File size={24} />
    <div>
      <p className="text-sm font-medium">{fileName}</p>
      <p className="text-xs text-gray-500">{fileSize}</p>
    </div>
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

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: MergedMessagesToChats = {
        id: messages?.length + 1,
        type: "text",
        content: inputText,
        timestamp: new Date().toISOString(),
        direction: "outgoing",
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video" | "document"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newMessage: MergedMessagesToChats = {
          id: messages.length + 1,
          type,
          content,
          timestamp: new Date().toISOString(),
          direction: "incoming",
          fileName: file.name,
          fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        };
        setMessages([...messages, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceRecording = () => {
    if (isRecording) {
      // Stop recording and send voice message
      const newMessage: MergedMessagesToChats = {
        id: messages.length + 1,
        type: "audio",
        content: "https://example.com/recorded-audio.mp3", // This would be the actual recorded audio URL
        timestamp: new Date().toISOString(),
        direction: "incoming",
        duration: recordingTime,
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
  console.log(JSON.stringify(messages));
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

              <p
                className={`text-xs mt-1 ${
                  message.direction === "outgoing" ? "text-green-100" : "text-gray-500"
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

{
  /*messages.map((message) => (
  <div
    key={message.id}
    className={`flex ${message.direction==='outgoing' ? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        message.direction==='outgoing'
          ? 'bg-green-500 text-white'
          : 'bg-white text-gray-800 border border-gray-200'
      }`}
    >
      {message.type === 'text' && <p className="text-sm">{message.content}</p>}
      {message.type === 'image' && <ImageMessage src={message.content} direction={message.direction} />}
      {message.type === 'video' && <VideoMessage src={message.content} direction={message.direction} />}
      {message.type === 'audio' && <VoiceMessage src={message.content} duration={message.duration!} direction={message.direction} />}
      {message.type === 'document' && <DocumentMessage fileName={message.fileName!} fileSize={message.fileSize!} direction={message.direction} />}
      <p
        className={`text-xs mt-1 ${
          message.direction ? 'text-green-100' : 'text-gray-500'
        }`}
      >
        {format(new Date(message.timestamp), 'HH:mm')}
      </p>
    </div>
  </div>
)) */
}

