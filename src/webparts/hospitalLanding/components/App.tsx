import * as React from 'react';
import styles from './App.module.scss';
import Banner from './Banner';
import Navbar from './Navbar';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState('home');

  return (
    <div className={styles.appShell}>
      <div className={styles.pageStack}>
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className={styles.main}>
          <Banner onPrimaryAction={() => setCurrentPage('specialities')} />
        </main>
      </div>
    </div>
  );
};

export default App;
