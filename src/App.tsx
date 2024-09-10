import React from 'react';
import AppRouter from './router/Router';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar className="w-full md:w-1/4 lg:w-1/5" />
        <main className="flex-1 p-4 mb-16 md:mb-0"> {/* Añadido mb-16 para evitar superposición */}
          <AppRouter />
        </main>
      </div>
      <div className="flex-grow"></div> {/* Espaciador */}
       { /*<Footer /> */}
    </div>
  );
};

export default App;