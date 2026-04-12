import * as React from 'react';
import '../ui/global.scss';
import About from './About';
import Banner from './Banner';
import CaseOfMonth from './CaseOfMonth';
import FacilityTour from './FacilityTour';
import HospitalFooter from './HospitalFooter';
import Navbar from './Navbar';
import LatestNews from './LatestNews';
import Specialities from './Specialities';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState('home');

  return (
    <div className="hospitalLandingAppShell">
      <div className="hospitalLandingPageStack">
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="hospitalLandingMain">
          <Banner onPrimaryAction={() => setCurrentPage('specialities')} />
          <About />
          <Specialities />
         
          <CaseOfMonth />
          <LatestNews />
           <FacilityTour />
        </main>

        <HospitalFooter />
      </div>

      <div className="hospitalLandingStickyRail" aria-hidden="true">
        <span className="hospitalLandingStickyRailLabel">Second Opinion</span>
      </div>
    </div>
  );
};

export default App;
