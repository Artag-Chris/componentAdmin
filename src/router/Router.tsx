import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';

import SendMessages from '../pages/SendMessages';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sendMessages" element={<SendMessages />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;