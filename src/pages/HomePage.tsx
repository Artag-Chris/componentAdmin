import { useState } from 'react';
import WhatsappMessagesComponent from '../components/WhatsappMessagesComponent';
import ChatWhatsappComponent from '../components/ChatWhatsappComponent';
import { User } from '../components/interfaces';
import useWhatsappData from '../components/hook/useWhatsappData';




const HomePage= () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { loading, error, refreshData } = useWhatsappData();

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <div className="flex-3 p-4">
        <h1>Whatsapp</h1>
        <button onClick={refreshData} className="refresh-button">Refresh Data</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <WhatsappMessagesComponent  onSelectUser={handleSelectUser} />
      </div>
      <div className="flex-1 p-4 bg-gray-700">
        <h1>Chat</h1>
        <ChatWhatsappComponent user={selectedUser} />
      </div>
    </div>
  );
};

export default HomePage;