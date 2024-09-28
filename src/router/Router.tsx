import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';

import TemplatesPage from '../pages/MessagesPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sendMessages" element={< TemplatesPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;