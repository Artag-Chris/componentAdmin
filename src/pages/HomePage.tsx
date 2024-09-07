import WhatsappMessagesComponent from "../components/WhatsappMessagesComponent";

const HomePage = () => {
  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <div className="flex-3 p-4">
        <h1>Whatsapp</h1>
        <WhatsappMessagesComponent />
      </div>
      <div className="flex-1 p-4 bg-gray-700">
        <h1>Otro Componente</h1>
        {/* Aquí puedes renderizar otro componente */}
      </div>
    </div>
  );
};
export default HomePage;