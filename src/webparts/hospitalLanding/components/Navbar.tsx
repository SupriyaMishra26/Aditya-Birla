import * as React from 'react';
import logo from '../assets/logo.jpg';
import Button from '../ui/Button';
import styles from './Navbar.module.scss';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'specialities', label: 'Specialities' },
  { id: 'wellness-packages', label: 'Wellness Packages' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' }
];

const diagonalArrow = String.fromCharCode(8599);

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <div className={styles.logoText}>
          <img src={logo} alt="Hospital logo" className={styles.logoTop} />
        </div>
      </div>

      <ul className={styles.menu}>
        {navLinks.map(link => (
          <li key={link.id}>
            <button
              className={`${styles.link} ${currentPage === link.id ? styles.active : ''}`}
              onClick={() => onNavigate(link.id)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      <Button
        className={styles.ctaButton}
        onClick={() => onNavigate('appointments')}
        variant="outline"
        tone="brand"
        icon={diagonalArrow}
      >
        Book An Appointment
      </Button>
    </nav>
  );
};

export default Navbar;
