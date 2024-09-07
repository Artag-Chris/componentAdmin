
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';

const Sidebar = () => {
  return (
    <aside className="bg-white text-black p-4 h-full">
      <h1 className="text-2xl font-bold">Sidebar</h1>
      <ul className="mt-4">
        <li className="p-4 hover:bg-red-500 flex items-center">
        <a href='/'>
        <FontAwesomeIcon icon={faComment} className="h-6 w-6 mr-2"/>
        </a>
          Home
        </li>
        <li className="p-4 hover:bg-red-500 flex items-center">
          <a> 
          <FontAwesomeIcon icon={faUser} className="h-6 w-6 mr-2" />
          </a>
          about
        </li>
        <li className="p-4 hover:bg-red-500 flex items-center">
          <FontAwesomeIcon icon={faCog} className="h-6 w-6 mr-2" />
          Item 3
        </li>
      </ul>
    </aside>
    
  );
};


export default Sidebar;