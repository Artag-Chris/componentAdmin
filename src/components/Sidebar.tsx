
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';


const Sidebar = () => {
  return (
    <aside className="bg-white text-black p-4 h-full">
      <h1 className="text-2xl font-bold">Sidebar</h1>
      <ul className="mt-4">
        <a href='/'>
        <li className="p-4 hover:bg-red-500 flex items-center">
        <FontAwesomeIcon icon={faComment} className="h-6 w-6 mr-2"/>
         Home
        </li>
        </a>
        <a href='/about'>
        <li className="p-4 hover:bg-red-500 flex items-center">
        <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 mr-2" />
          about
        </li>
        </a>
        <li className="p-4 hover:bg-red-500 flex items-center">
          <FontAwesomeIcon icon={faCog} className="h-6 w-6 mr-2" />
          Item 3
        </li>
      </ul>
    </aside>
    
  );
};


export default Sidebar;