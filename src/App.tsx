import React from 'react';
import AppRouter from './router/Router';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 p-4">
      <AppRouter />
      </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;