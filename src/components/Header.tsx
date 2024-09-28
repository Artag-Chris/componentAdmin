import React, { useState } from 'react';
import { Menu, X, Home, Info, Mail } from 'lucide-react';


interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (onMenuClick) {
      onMenuClick();
    }
  };

  const menuItems = [
    { icon: Home, text: 'Home', href: '/' },
    { icon: Info, text: 'About', href: '/about' },
    { icon: Mail, text: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Component Admin</h1>
          </div>
          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item, index) => (
                <a key={index} href={item.href}>
                  <a className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors duration-200">
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.text}
                  </a>
                </a>
              ))}
            </nav>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item, index) => (
            <a key={index} href={item.href}>
              <a className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-colors duration-200">
                <item.icon className="w-5 h-5 mr-2" />
                {item.text}
              </a>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;