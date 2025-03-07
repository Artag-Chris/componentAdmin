import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';

import TemplatesPage from '../pages/MessagesPage';
import DecevalMainPage from '../decevalComponents/decevalMainPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sendMessages" element={< TemplatesPage/>} />
        <Route path="/deceval" element={< DecevalMainPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;