import { useState, useEffect, useRef } from "react";
import { User } from "../components/interfaces";
import useWhatsappData from "../components/hook/useWhatsappData";
import WhatsappMessagesComponent from "../components/WhatsappMessagesComponent";
import ChatWhatsappComponent from "../components/ChatWhatsappComponent";

const HomePage = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { loading, error, refreshData } = useWhatsappData();
    const ws = useRef<WebSocket | null>(null);

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
    };

    const connectWebSocket = () => {
        ws.current = new WebSocket("ws://localhost:4000/ws");

        ws.current.onopen = () => {
            console.log("Conectado al WebSocket");
        };

        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("Mensaje recibido:", message);
            // Aquí puedes manejar los mensajes entrantes
        };

        ws.current.onerror = (error) => {
            console.error("Error en el WebSocket:", error);
        };

        ws.current.onclose = () => {
            console.log("Conexión WebSocket cerrada. Intentando reconectar en 5 segundos...");
            setTimeout(() => {
                connectWebSocket();
            }, 5000);
        };
    };

    useEffect(() => {
        // Establecer la conexión WebSocket
        connectWebSocket();

        // Limpiar la conexión al desmontar el componente
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white text-black">
            <div className="w-full md:w-3/12 p-4 bg-gray-100 rounded-lg">
                <h1 className="text-2xl font-bold">Whatsapp</h1>
                <button
                    onClick={refreshData}
                    className="mt-4 mb-4 p-2 bg-gray-300 hover:bg-gray-400 text-black rounded-full"
                >
                    Buscar nuevos Mensajes
                </button>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <WhatsappMessagesComponent onSelectUser={handleSelectUser} />
            </div>
            <div className={`w-full md:w-9/12 p-4 bg-gray-200 rounded-lg ${selectedUser ? "block" : "hidden"} md:block`}>
                <h1 className="text-2xl font-bold">Chat</h1>
                {selectedUser && <ChatWhatsappComponent user={selectedUser} />}
            </div>
        </div>
    );
};

export default HomePage;