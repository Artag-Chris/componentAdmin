"use client";
import React, { useState, useEffect, useRef } from "react";
import { Mic, Paperclip, Send, UserCheck,  } from "lucide-react";
import useSpecificData from "./hook/useSpecificUserData";
import {  toast } from 'react-toastify'; import 'react-toastify/dist/ReactToastify.css'
import { Conversation } from "./class/Conversation";
import { format } from "date-fns/format";
import { ChatMessages } from "./interfaces/mergedDataMessages";
import { User, WhatsappMessage, WhatsappStatus } from "./interfaces";
import { removeBase64Prefix } from "./functions/removeBase64Prefix";
import { ImageMessage, VideoMessage, VoiceMessage, DocumentMessage } from "./chatcomponents";
import { botNumber, dispatchUser, documentResponse, fileMediaMeta, frontDocument, frontImage, frontMessage, frontVideo, imageResponse, metaToken, textResponse, url_base, videoResponse } from "./config/envs";
import TetrisLoader from "../loaders/TetrisLoader";

interface Props {
  user: any;
}

export default function EnhancedWhatsAppChat({ user }: Props) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showDispatchButtons, setShowDispatchButtons] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaId, setMediaId] = useState<any>("");
  const { specificData, refreshData } = useSpecificData(user?.phone);
  const [envio, setenvio] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      const sortedMessages = conversation.mergeArrays().sort((a, b) => {
        const timestampA = (a as WhatsappMessage).timestamp;
        const timestampB = (b as WhatsappMessage).timestamp;

        if (!timestampA || !timestampB) {
          return 0;
        }
        return new Date(timestampA).getTime() - new Date(timestampB).getTime();
      });
      setMessages(sortedMessages);
      setLoading(false);
    };
    loadMessages();
  }, [specificData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [
    messages
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    const ws = new WebSocket(`ws:${url_base}/ws`);

    ws.onopen = () => {
      console.log("Conectado al servidor WebSocket");
    };

    ws.onmessage = (event) => {
      //debo encontrar la manera de hacerlo no tan invasiva
     // refreshData();
    };

    ws.onclose = () => {
      console.log("Desconectado del servidor WebSocket");
      reconnectWebSocket();
    };

    ws.onerror = (error) => {
      console.error("Error en el WebSocket:", error);
    };

    const reconnectWebSocket = () => {
      setTimeout(() => {
        const ws = new WebSocket(`ws:${url_base}/ws`);
        ws.onopen = () => {
          console.log("Reconectado al servidor WebSocket");
        };
      }, 5000);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') {
      alert('Por favor, ingresa un mensaje');
      return;
    }
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
    }
    const array: WhatsappMessage[] = [
      {
        id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        message: inputText,
        to: specificData.phone,
        status: "delivered",
        direction: "outgoing",
        type: "text",
        mediaId: "",
        attendant: 0,
      },
    ];

    const enviar: User = {
      name: "Bot",
      phone: `${botNumber}`,
      identification: `${botNumber}`,
      atending: 0,
      lastActive: new Date(),
      wppStatus: WhatsappStatus.attended,
      WhatsappMessage: array,
      detail: "",
    };
    setenvio(enviar);
    try {
      const [response, responseToSave] = await Promise.all([
        fetch(textResponse, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputText, id: specificData.phone }),
        }),
        fetch(frontMessage, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enviar),
        }),
      ]);

      setInputText("");
      if (!response.ok || !responseToSave.ok) {
        throw new Error(
          `Error sending message: ${response.status} ${response.statusText} o ${responseToSave.status} ${responseToSave.statusText}`
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
 
const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  type: "image" | "video" | "document"
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const uploadToastId = toast.loading("Cargando archivo...");

  const setLoadingIndicator = (progress: number) => {
    if (progress < 100) {
      toast.update(uploadToastId, {
        render: `Carga de archivo: ${progress}%`,
        type: "info",
        isLoading: true,
        autoClose: false,
      });
    }
  };

  const handleLoadEnd = async (base64StringWithoutPrefix: string) => {
    try {
      const blob = await fileToBlob(file, setLoadingIndicator);
      const formData = createFormData(blob, file.type);

      const newMessage = createNewMessage(base64StringWithoutPrefix, file.type);
      const sendToApi = createSendToApi(base64StringWithoutPrefix, file.type);

      toast.update(uploadToastId, {
        render: `Cargando archivo...`,
        type: "info",
        isLoading: true,
        autoClose: false,
      });

      const uploadSuccess = await handleFileTypeSwitch(newMessage.type, formData, sendToApi);

      if (uploadSuccess) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        toast.update(uploadToastId, {
          render: 'Archivo subido exitosamente!',
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        throw new Error('Error al subir el archivo');
      }
    } catch (error) {
      console.error("Error handling file upload:", error);
      toast.update(uploadToastId, {
        render: 'Error al subir el archivo',
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const reader = new FileReader();
  reader.onload = async (e) => {
    const content = e.target?.result as string;
    const base64StringWithoutPrefix = removeBase64Prefix(content);
    await handleLoadEnd(base64StringWithoutPrefix);
  };
  reader.readAsDataURL(file);
};

const fileToBlob = (
  file: File,
  onProgress: (progress: number) => void
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress);
      }
    };
    reader.onload = () => {
      if (reader.result === null) {
        reject(new Error("Failed to read file"));
      } else {
        resolve(new Blob([reader.result], { type: file.type }));
      }
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsArrayBuffer(file);
  });
};

const createFormData = (blob: Blob, fileType: string) => {
  const formData = new FormData();
  formData.append("messaging_product", "whatsapp");
  formData.append("file", blob);
  formData.append("type", fileType);
  return formData;
};

const createNewMessage = (message: string, fileType: string) => ({
  id: `${(messages?.length + 1).toString()}`,
  type: fileType,
  message,
  timestamp: new Date(),
  direction: "outgoing",
  to: specificData.phone,
  customerId: specificData.id,
  attendant: specificData.attending,
  status: "unread",
  mediaId: "",
});

const createSendToApi = (message: string, fileType: string) => ({
  id:
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15),
  name: "Bot",
  phone: botNumber,
  type: fileType,
  message,
  timestamp: new Date(),
  direction: "outgoing",
  to: specificData.phone,
  customerId: specificData.id,
  attendant: specificData.attending,
  status: "unread",
  mediaId: "",
});

const handleFileTypeSwitch = async (
  fileType: string,
  formData: FormData,
  sendToApi: any
) => {
  switch (fileType) {
    case "text/plain":
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/pdf":
      return await handleDocumentUpload(formData, sendToApi);
    case "image/jpeg":
    case "image/png":
    case "image/gif":
      return await handleImageUpload(formData, sendToApi);
    case "video/mp4":
    case "video/quicktime":
    case "video/mpeg":
      return await handleVideoUpload(formData, sendToApi);
    default:
      console.log("Tipo de archivo no reconocido");
      return false;
  }
};

const handleDocumentUpload = async (formData: FormData, sendToApi: any) => {
  const fileName = prompt("Por favor, ingrese el nombre del archivo:");
  if (!fileName) {
    toast.error("El nombre del archivo es obligatorio");
    return false;
  }

  //formData.append("fileName", fileName);
  

  try {
    const response = await fetch(fileMediaMeta, {
      method: "POST",
      headers: { Authorization: `Bearer ${metaToken}` },
      body: formData,
    });
    const data = await response.json();

    if (data.id) {
      const mediaId = data.id;
      sendToApi.mediaId = data.id;
      await fetch(documentResponse, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: specificData.phone,
          mediaId,
          phone: botNumber,
          'nombre':fileName,
        }),
      });

      await fetch(frontDocument, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendToApi),
      });

      return true; // Success
    } else {
      console.log("Media ID es vacío o no válido");
      return false; // Error
    }
  } catch (error) {
    console.error("Error en handleDocumentUpload:", error);
    return false; // Error
  }
};

const handleImageUpload = async (formData: FormData, sendToApi: any) => {
  try {
    const response = await fetch(fileMediaMeta, {
      method: "POST",
      headers: { Authorization: `Bearer ${metaToken}` },
      body: formData,
    });
    const data = await response.json();
    
    if (data.id) {
      sendToApi.mediaId = data.id;
      const mediaId = data.id;
      await fetch(imageResponse, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: specificData.phone,
          mediaId: mediaId,
          phone: botNumber,
          type: formData.get("type"),
        }),
      });

      await fetch(frontImage, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendToApi),
      });
     
      return true; // Success
    } else {
      console.log("Media ID es vacío o no válido");
      return false; // Error
    }
  } catch (error) {
    console.error("Error en handleImageUpload:", error);
    return false; // Error
  }
};

const handleVideoUpload = async (formData: FormData, sendToApi: any) => {
  try {
    const response = await fetch(fileMediaMeta, {
      method: "POST",
      headers: { Authorization: `Bearer ${metaToken}` },
      body: formData,
    });
    const data = await response.json();
    if (data.id) {
      sendToApi.mediaId = data.id;
      const mediaId = data.id;
      
      await fetch(videoResponse, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: specificData.phone,
          mediaId,
          phone: botNumber,
          type: formData.get("type"),
        }),
      });
      await fetch(frontVideo, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendToApi),
      });
      return true; // Success
    } else {
      console.log("Media ID es vacío o no válido");
      return false; // Error
    }
  } catch (error) {
    console.error("Error en handleVideoUpload:", error);
    return false; // Error
  }
};
  
  const handleVoiceRecording = () => {
    if (isRecording) {
      const newMessage: ChatMessages = {
        id: `${(messages?.length + 1).toString()}`,
        type: "audio",
        message: "https://example.com/recorded-audio.mp3",
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
      setIsRecording(true);
    }
  };

  const handleDispatchClient = async () => {
    try {
      const response = await fetch(dispatchUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: specificData.phone,
          botNumber: botNumber
        }),
      });

      if (response.ok) {
        setShowDispatchButtons(false);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <TetrisLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.direction === "outgoing" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.direction === "outgoing"
                ? "bg-purple-500 text-white"
                : "bg-white text-gray-800 border border-gray-200"
                }`}
            >
              {message.type === "text" && (
                <p className="text-sm">{message.message}</p>
              )}
              {message.type === "image" && (
                <ImageMessage src={message} direction={message.direction} />
              )}
              {message.type === "video" && (
                <VideoMessage src={message} direction={message.direction} />
              )}
              {message.type === "audio" && (
                <VoiceMessage src={message} direction={message.direction} />
              )}
              {message.type === "document" && (
                <DocumentMessage direction={message.direction} src={message} />
              )}
              <p
                className={`text-xs mt-1 ${message.direction === "outgoing"
                  ? "text-purple-200"
                  : "text-gray-500"
                  }`}
              >
                {format(new Date(message.timestamp), "HH:mm")}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe un mensaje"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.keyCode === 13) {
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Adjuntar archivo"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFileUpload(e, "document")}
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,"
          />
          <button
            onClick={handleVoiceRecording}
            className={`p-2 rounded-full ${isRecording ? "bg-red-500" : "bg-gray-200"
              } text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-red-300`}
            aria-label={isRecording ? "Detener grabación" : "Iniciar grabación de voz"}
          >
            <Mic size={20} />
          </button>
          {isRecording && (
            <span className="text-sm text-red-500">{recordingTime}s</span>
          )}
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
            aria-label="Enviar mensaje"
          >
            <Send size={20} />
          </button>
          <button
            onClick={() => setShowDispatchButtons(!showDispatchButtons)}
            className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
            aria-label="Opciones de despacho"
          >
            <UserCheck size={20} />
          </button>
        </div>
        {showDispatchButtons && (
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={handleDispatchClient}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Despachar cliente
            </button>
            <button
              onClick={() => setShowDispatchButtons(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}