import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import bgPattern from '../assets/bg-case-of-month.png';
import circleImage from '../assets/circle.png';
import footerShield from '../assets/final.png';
import logo from '../assets/logo.jpg';
import propertyOneImage from '../assets/Property 1.png';
import propertyTwoImage from '../assets/Property 2.png';
import propertyThreeImage from '../assets/Property 3.png';
import propertyFourImage from '../assets/Property 4.png';
import styles from './HospitalFooter.module.scss';

interface IFooterLinkGroup {
  id: string;
  label: string;
}

interface ISocialItem {
  id: string;
  label: string;
  iconName: string;
}

const SPECIALTIES: IFooterLinkGroup[] = [
  { id: 'cardiology', label: 'Cardiology' },
  { id: 'neurology', label: 'Neurology' },
  { id: 'oncology', label: 'Oncology' },
  { id: 'urology', label: 'Urology' },
  { id: 'nephrology', label: 'Nephrology' },
  { id: 'gynae', label: 'Gynae & Obstetrics' },
  { id: 'pediatrics', label: 'Pediatrics' },
  { id: 'orthopedics', label: 'Orthopedics' },
  { id: 'surgery', label: 'General Surgery' },
  { id: 'ent', label: 'ENT' },
  { id: 'ophthalmology', label: 'Ophthalmology' }
];

const SOCIAL_ITEMS: ISocialItem[] = [
  { id: 'facebook', label: 'Facebook', iconName: 'FacebookLogo' },
  { id: 'instagram', label: 'Instagram', iconName: 'InstagramLogo' },
  { id: 'linkedin', label: 'LinkedIn', iconName: 'LinkedInLogo' },
  { id: 'youtube', label: 'YouTube', iconName: 'YoutubeLogo' }
];

const ORNAMENT_SLIDES = [propertyOneImage, propertyTwoImage, propertyThreeImage, propertyFourImage];

const HospitalFooter: React.FC = () => {
  const [activeOrnament, setActiveOrnament] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === 'undefined' || ORNAMENT_SLIDES.length < 2) {
      return undefined;
    }

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveOrnament(currentIndex => (currentIndex + 1) % ORNAMENT_SLIDES.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className={styles.footerSection} aria-label="Hospital footer">
      <div
        className={styles.footerBackdrop}
        aria-hidden="true"
        style={{ backgroundImage: `url(${bgPattern})` }}
      />

      <div className={styles.footerCanvas}>
        <div className={styles.footerOrnament} aria-hidden="true">
          <span className={styles.footerOrnamentGlow} />
          <img src={footerShield} alt="" className={styles.footerOrnamentShield} />
          <img src={circleImage} alt="" className={styles.footerOrnamentRing} />

          <div className={styles.footerOrnamentFrame}>
            {ORNAMENT_SLIDES.map((slide, slideIndex) => (
              <img
                key={`footer-ornament-${slideIndex}`}
                src={slide}
                alt=""
                className={[
                  styles.footerOrnamentSlide,
                  activeOrnament === slideIndex
                    ? styles.footerOrnamentSlideActive
                    : styles.footerOrnamentSlideInactive
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            ))}
          </div>
        </div>

        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <img src={logo} alt="Aditya Birla Memorial Hospital" className={styles.footerLogo} />
            <p className={styles.footerAddress}>
              Aditya Birla Memorial Hospital, Aditya Birla Hospital Marg, Chinchwad, Pune - 411033,
              Maharashtra, India.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <h3 className={styles.footerHeading}>Specialities</h3>
            <div className={styles.footerLinksGrid}>
              <ul className={styles.footerLinkColumn}>
                {SPECIALTIES.slice(0, 5).map(item => (
                  <li key={item.id} className={styles.footerLinkItem}>
                    {item.label}
                  </li>
                ))}
              </ul>

              <ul className={styles.footerLinkColumn}>
                {SPECIALTIES.slice(5).map(item => (
                  <li key={item.id} className={styles.footerLinkItem}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.footerContact}>
            <h3 className={styles.footerHeading}>Contact Us</h3>

            <div className={styles.contactStack}>
              <div className={styles.contactRow}>
                <span className={styles.contactIcon} aria-hidden="true">
                  <Icon iconName="Phone" className={styles.contactGlyph} />
                </span>
                <span className={styles.contactText}>+91 9881123006</span>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.contactIcon} aria-hidden="true">
                  <Icon iconName="Mail" className={styles.contactGlyph} />
                </span>
                <span className={styles.contactText}>corporate.desk@adityabirla.com</span>
              </div>
            </div>

            <div className={styles.socialRow} aria-label="Social media links">
              {SOCIAL_ITEMS.map(item => (
                <span key={item.id} className={styles.socialIcon} aria-label={item.label}>
                  <Icon iconName={item.iconName} className={styles.socialGlyph} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footerDivider} />

        <p className={styles.footerCopyright}>
          COPYRIGHT (C) 2026 | ADITYA BIRLA HEALTH SERVICES PRIVATE LIMITED. | ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
};

export default HospitalFooter;

