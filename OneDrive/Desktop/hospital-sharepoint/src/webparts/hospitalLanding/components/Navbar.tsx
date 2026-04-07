import * as React from 'react';
import styles from '../common/Navbar.module.scss';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: 'home',              label: 'Home'              },
  { id: 'specialities',      label: 'Specialities'      },
  { id: 'wellness-packages', label: 'Wellness Packages' },
  { id: 'testimonials',      label: 'Testimonials'      },
  { id: 'contact',           label: 'Contact'           },
];

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className={styles.navbar}>

      {/* Logo */}
      <div className={styles.logo}>
       
        <div className={styles.logoText}>
          <img src="/path/to/logo.png" alt="Logo" className={styles.logoTop} />
          ADITYA BIRLA
        </div>
      </div>

      {/* Nav Links */}
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

      {/* CTA Button */}
      <button
        className={styles.cta}
        onClick={() => onNavigate('appointments')}
      >
        Book An Appointment ↗
      </button>

    </nav>
  );
};

export default Navbar;