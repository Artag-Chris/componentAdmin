import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEnvelope, faComment } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="block md:hidden text-gray-800 p-4 focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <aside
        className={`bg-white text-black p-4 h-full md:block ${isOpen ? 'block' : 'hidden'} ${className}`}
      >
        <h1 className="text-2xl font-bold">Sidebar</h1>
        <ul className="mt-4">
          <a href="/" className="block">
            <li className="p-4 hover:bg-gray-200 flex items-center rounded-md">
              <FontAwesomeIcon icon={faComment} className="h-6 w-6 mr-2" /> Home
            </li>
          </a>
          <a href="/SendMessages" className="block">
            <li className="p-4 hover:bg-gray-200 flex items-center rounded-md">
              <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 mr-2" /> Send Messages
            </li>
          </a>
          <a href="/item3" className="block">
            <li className="p-4 hover:bg-gray-200 flex items-center rounded-md">
              <FontAwesomeIcon icon={faCog} className="h-6 w-6 mr-2" /> Item 3
            </li>
          </a>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;