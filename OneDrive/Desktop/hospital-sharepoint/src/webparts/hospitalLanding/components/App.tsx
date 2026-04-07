import * as React from 'react';
import Navbar from './common/Navbar';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState('home');

  return (
    <div>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

     

    </div>
  );
};

export default App;