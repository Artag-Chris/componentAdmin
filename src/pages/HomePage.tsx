import { useState } from "react";
import { User } from "../components/interfaces";
import useWhatsappData from "../components/hook/useWhatsappData";
//import ChatWhatsappComponetClone from "../components/ChatWhatsappComponetClone";
import WhatsappMessagesComponent from "../components/WhatsappMessagesComponent";
import ChatWhatsappComponent from "../components/ChatWhatsappComponent";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { loading, error, refreshData } = useWhatsappData();

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

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
        <WhatsappMessagesComponent onSelectUser={handleSelectUser}/> 
      
      </div>
      <div
        className={`w-full md:w-9/12 p-4 bg-gray-200 rounded-lg ${
          selectedUser ? "block" : "hidden"
        } md:block`}
      >
        <h1 className="text-2xl font-bold">Chat</h1>
        { selectedUser && <ChatWhatsappComponent user={selectedUser} /> }
       {/* <ChatWhatsappComponetClone /> */}
      </div>
    </div>
  );
};

export default HomePage;
