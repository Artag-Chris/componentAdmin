import { useState } from 'react';
import WhatsappMessagesComponent from '../components/WhatsappMessagesComponent';
import ChatWhatsappComponent from '../components/ChatWhatsappComponent';
import { User } from '../components/interfaces';




const HomePage= () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <div className="flex-3 p-4">
        <h1>Whatsapp</h1>
        <WhatsappMessagesComponent onSelectUser={handleSelectUser} />
      </div>
      <div className="flex-1 p-4 bg-pink-700">
        <ChatWhatsappComponent user={selectedUser} />
      </div>
    </div>
  );
};

export default HomePage;