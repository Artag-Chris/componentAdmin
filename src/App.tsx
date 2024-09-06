import React from 'react';
import AppRouter from './router/Router';
import Footer from './components/Footer';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div>
      
      {<Header />}
      {<AppRouter />}
      <Footer />
    </div>
  );
};

export default App;