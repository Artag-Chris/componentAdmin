import { useState,} from "react";
import { User } from "../components/interfaces";
import {useWhatsappData }from "../components/hook/useWhatsappData";
import WhatsappMessagesComponent from "../components/WhatsappMessagesComponent";
//import ChatWhatsappComponent from "../components/ChatWhatsappComponent";
import ChatWhatsappComponentClone from "../components/ChatWhatsappComponentClone";

const HomePage = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { loading, error, } = useWhatsappData();
   

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white text-black">
            <div className="w-full md:w-3/12 p-4 bg-gray-100 rounded-lg">
                <h1 className="text-2xl font-bold">Whatsapp</h1>
              
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <WhatsappMessagesComponent onSelectUser={handleSelectUser} />
            </div>
            <div className={`w-full md:w-9/12 p-4 bg-gray-200 rounded-lg ${selectedUser ? "block" : "hidden"} md:block`}>
                <h1 className="text-2xl font-bold">Chat</h1>
                { /*selectedUser && <ChatWhatsappComponent user={selectedUser} /> */}
                { selectedUser && <ChatWhatsappComponentClone user={selectedUser} /> }
            </div>
        </div>
    );
};

export default HomePage;