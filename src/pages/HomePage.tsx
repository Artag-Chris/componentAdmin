import React, { useState, useEffect } from "react";
import { User } from "../components/interfaces";
import { useWhatsappData } from "../components/hook/useWhatsappData";
import WhatsappMessagesComponent from "../components/WhatsappMessagesComponent";
import ChatWhatsappComponent from "../components/ChatWhatsappComponent";
import TetrisLoader from "../loaders/TetrisLoader";

const HomePage = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { data, loading, error, refreshData } = useWhatsappData();

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
    };


    if (loading) {
        return <TetrisLoader />;
    }

    if (error) {
        
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <>
        
        <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-purple-100 to-pink-100">
            <div className="w-full md:w-4/12 lg:w-3/12 p-4 bg-white shadow-lg rounded-lg md:rounded-r-none">
                <h1 className="text-2xl font-bold text-purple-600 mb-4">WhatsApp</h1>
                <div className="h-full overflow-y-auto">
                    <WhatsappMessagesComponent onSelectUser={handleSelectUser} />
                </div>
            </div>
            <div className={`w-full md:w-8/12 lg:w-9/12 p-4 bg-white shadow-lg rounded-lg md:rounded-l-none ${selectedUser ? "block" : "hidden md:block"}`}>
                <h1 className="text-2xl font-bold text-purple-600 mb-4">Chat</h1>
                {selectedUser ? (
                    <ChatWhatsappComponent user={selectedUser} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-lg">Selecciona un usuario para comenzar la conversación</p>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default HomePage;