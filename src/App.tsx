import React from 'react';
import AppRouter from './router/Router';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <div className="flex">
      <Header />
      <Sidebar />
      <AppRouter />
      <Footer />
    </div>
  );
};

export default App;