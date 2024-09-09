import React from 'react';
import { User } from './interfaces'; // Asegúrate de importar la interfaz desde el archivo adecuado

interface ChatComponentProps {
  user: User | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ user }) => {
  if (!user) {
    return null; // No renderizar nada si no hay un usuario seleccionado
  }

  return (
    <div>
      <h2>Chat con {user.name}</h2>
      {/* Aquí puedes agregar la lógica y el diseño del chat */}
    </div>
  );
};

export default ChatComponent;