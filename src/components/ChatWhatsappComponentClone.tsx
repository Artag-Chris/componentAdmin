import React, { useState, useEffect, useRef } from "react";
import { Mic, Paperclip, Send } from "lucide-react";
import useSpecificData from "./hook/useSpecificUserData";
import { Conversation } from "./class/Conversation";
import { format } from "date-fns/format";
import { ChatMessages } from "./interfaces/mergedDataMessages";
import { User, WhatsappMessage, WhatsappStatus } from "./interfaces";
import { LoadingComponent } from "./LoadingComponente";
import { removeBase64Prefix } from "./functions/removeBase64Prefix";
import { base64ToBlob } from "./functions";
import {ImageMessage , VideoMessage, VoiceMessage, DocumentMessage} from "./chatcomponents";
interface Props {
  user: any; // Define el tipo de usuario que se espera
}


export default function EnhancedWhatsAppChat({ user }: Props) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { specificData, refreshData } = useSpecificData(user?.phone);
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
      const sortedMessages = conversation.mergeArrays().sort((a, b) => {
        const timestampA = (a as WhatsappMessage).timestamp;
        const timestampB = (b as WhatsappMessage).timestamp;

        if (!timestampA || !timestampB) {
          // You can decide how to handle this case, e.g., return 0 to keep the original order
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
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleNewMessage = (message: any) => {
    console.log("Nuevo mensaje recibido:", message);
    refreshData();
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000/ws");

    ws.onopen = () => {
      console.log("Conectado al servidor WebSocket");
    };

    ws.onmessage = (event) => {
      // const message = JSON.parse(event.data);
      //  handleNewMessage(message);
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
        const ws = new WebSocket("ws://localhost:4000/ws");
        // Aquí puedes volver a establecer los eventos ws.onopen, ws.onmessage, etc.
        ws.onopen = () => {
          console.log("Reconectado al servidor WebSocket");
        };
        // ...
      }, 5000); // Intenta reconectar después de 5 segundos
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSendMessage = async () => {
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
      phone: "573025970185",
      identification: "573025970185",
      atending: 0,
      lastActive: new Date(),
      wppStatus: WhatsappStatus.attended,
      WhatsappMessage: array,
      detail: "",
    };
    //console.log(envio);
    // Send the first POST request to send the text message
    setenvio(enviar);
    try {
      const [response, responseToSave] = await Promise.all([
        fetch("http://localhost:4000/api/whatsapp/sendTextResponse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputText, id: specificData.phone }),
        }),
        fetch("http://localhost:4000/api/prisma/frontmessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(envio),
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

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string; //
        const blob = base64ToBlob(content);
        const fileUrl = URL.createObjectURL(blob);
        const messagingProduct = "whatsapp";
        const base64StringWithoutPrefix = removeBase64Prefix(content);
        //const fileUrl = URL.createObjectURL(urlMedia!);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", file.type);
        formData.append("messaging_product", messagingProduct);

        const newMessage: ChatMessages = {
          id: `${(messages?.length + 1).toString()}`,
          type: file.type,
          message: base64StringWithoutPrefix,
          timestamp: new Date(),
          direction: "outgoing",
          to: specificData.phone,
          customerId: specificData.id,
          attendant: specificData.attending,
          status: "delivered",
          mediaId: "",
        };
        const sendToApi: any = {
          id:
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
          name: "Bot",
          phone: "573025970185", //numero del bot
          type: file.type, //tipo de archivo toca desfragmentarlo para enviarlo a la ap
          message: base64StringWithoutPrefix,
          timestamp: new Date(),
          direction: "outgoing",
          to: specificData.phone,
          customerId: specificData.id,
          attendant: specificData.attending,
          status: "delivered",
          mediaId: "",
        };

        const documentTypes = {
          "text/plain": "Texto",
          "application/vnd.ms-excel": "Microsoft Excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            "Microsoft Excel",
          "application/msword": "Microsoft Word",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            "Microsoft Word",
          "application/vnd.ms-powerpoint": "Microsoft PowerPoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            "Microsoft PowerPoint",
          "application/pdf": "PDF",
          "image/jpeg": "Imagen",
          "image/png": "Imagen",
          "image/gif": "Imagen",
          "video/mp4": "Video",
          "video/quicktime": "Video",
          "video/mpeg": "Video",
        };

        switch (newMessage.type) {
          case "text/plain":
          case "application/vnd.ms-excel":
          case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          case "application/msword":
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          case "application/vnd.ms-powerpoint":
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          case "application/pdf":
            // Manejo de documentos
            console.log("Documento recibido");
            break;
          case "image/jpeg":
          case "image/png":
          case "image/gif":
            // Manejo de imágenes
            console.log("Imagen recibida");
            Promise.all([
              fetch("http://localhost:4000/api/prisma//frontmessageImage", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(sendToApi),
              })
                // .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error)),
              fetch(
                "https://graph.facebook.com/v20.0/368124183059222/media?messaging_product=whatsapp",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization:
                      "Bearer EAAMGwDhngcsBO8ZB5C0hnmwzRB2AD53h6hPTI9N1xfWJldhFqCJ5xekhhcTLSqrHATRaGQ5eS90O1rZBPftRuUQdPsExZCTmFr66v7qfTqv5D1loiK5xqaDUwN94KSwXi8yZAw0KXxhtvwCdqA0bZAkGZAfzDUX6ZAGqtU0tTFkYlT9lRGJX9e8uuoZB1l72ml9deLvEl85k7Q4onk0LTiZCFTc1xNnhTwPvl4ddA1ZCojawZDZD",
                    // 'messaging_product': 'whatsapp'
                  },
                  body: JSON.stringify({
                    file: file,
                    type: file.type,
                    //messaging_product: 'whatsapp'
                  }),
                }
              )
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error)),
            ])
              .then(() =>
                console.log("Ambas solicitudes se han completado con éxito")
              )
              .catch((error) =>
                console.error("Error al enviar las solicitudes:", error)
              );

            break;
          case "video/mp4":
          case "video/quicktime":
          case "video/mpeg":
            // Manejo de videos
            console.log("Video recibido");
            break;
          default:
            console.log("Tipo de archivo no reconocido");
            break;
        }

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
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.length}
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
