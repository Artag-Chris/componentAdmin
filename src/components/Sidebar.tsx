import React from 'react';
import { Home, Mail, Settings } from 'lucide-react';


interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const menuItems = [
    { icon: Home, text: 'Home', href: '/' },
    { icon: Mail, text: 'Send Messages', href: '/SendMessages' },
    { icon: Settings, text: 'Settings', href: '/settings' },
  ];

  return (
    <aside className={className}>
      <div className="p-5">
        <h2 className="text-2xl font-bold text-purple-600 mb-8">Menu</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>
                  <a className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-purple-100 transition-all duration-200 group">
                    <item.icon className="w-6 h-6 text-gray-500 group-hover:text-purple-600 transition-colors duration-200" />
                    <span className="ml-3 font-medium group-hover:text-purple-600 transition-colors duration-200">{item.text}</span>
                  </a>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;