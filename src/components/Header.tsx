import React from 'react';


const Header: React.FC = () => {
  return (
    <header style={{ display: 'block', padding: '1rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
      <nav>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', gap: '1rem' }}>
          <li><a href='/' style={{ textDecoration: 'none', color: '#007bff' }}>Home</a></li>
          <li><a  href='/about' style={{ textDecoration: 'none', color: '#007bff' }}>About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;