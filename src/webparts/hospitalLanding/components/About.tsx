import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import doctorImage from '../assets/doctor.png';
import circleImage from '../assets/circle.png';
import propertyOneImage from '../assets/Property 1.png';
import propertyTwoImage from '../assets/Property 2.png';
import propertyThreeImage from '../assets/Property 3.png';
import propertyFourImage from '../assets/Property 4.png';
import bedIcon from '../assets/bed-icon.png';
import doctorIcon from '../assets/Doctor-icon.png';
import experienceIcon from '../assets/exp-icon.png';
import patientIcon from '../assets/patient icon.png';
import Button from '../ui/Button';
import styles from './About.module.scss';

const diagonalArrow = String.fromCharCode(8599);

const quickActions = [
  {
    id: 'telemedicine',
    iconName: 'Phone',
    label: 'Telemedicine'
  },
  {
    id: 'appointment',
    iconName: 'Calendar',
    label: 'Book An Appointment'
  },
  {
    id: 'packages',
    iconName: 'PageList',
    label: 'Health Packages'
  },
  {
    id: 'opinion',
    iconName: 'Shield',
    label: 'Second Opinion'
  }
];

const statsItems = [
  {
    id: 'patients',
    iconSrc: patientIcon,
    value: '50,000+',
    label: 'Patients Treated Successfully'
  },
  {
    id: 'doctors',
    iconSrc: doctorIcon,
    value: '75+',
    label: 'Expert Doctors'
  },
  {
    id: 'experience',
    iconSrc: experienceIcon,
    value: '25+',
    label: 'Years of experience'
  },
  {
    id: 'beds',
    iconSrc: bedIcon,
    value: '150+',
    label: 'Beds/ Infrastructure'
  }
];

const badgeSlides = [
  {
    id: 'property-1',
    src: propertyOneImage
  },
  {
    id: 'property-2',
    src: propertyTwoImage
  },
  {
    id: 'property-3',
    src: propertyThreeImage
  },
  {
    id: 'property-4',
    src: propertyFourImage
  }
];

const aboutCopy =
  "Healthcare shouldn't be a luxury. At Aditya Birla Memorial Hospital, often regarded as the best hospital in Pimpri Pune, our 500-bed, NABH-accredited facility brings together some of Pune's finest specialists, ensuring exceptional care for all your health needs. Unlike other hospitals in Pimpri-Chinchwad, Pune, with visiting consultants, our full-time specialists are dedicated solely to your care. They follow your progress, understand your case thoroughly, and are available round-the-clock. We have invested in cutting-edge medical technology typically found in premium facilities, but made it accessible to families across Hinjewadi, Wakad, Baner, Aundh, Pimple Saudagar, Bhosari, Ravet, Chinchwad Gaon, Tathawade, Nigdi, Moshi, Chakan, Pimpri, and nearby areas.";

const About: React.FC = () => {
  const [activeBadgeIndex, setActiveBadgeIndex] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === 'undefined' || badgeSlides.length < 2) {
      return undefined;
    }

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveBadgeIndex(currentIndex => (currentIndex + 1) % badgeSlides.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={styles.aboutSection} aria-labelledby="about-title">
      <div className={styles.quickActions} aria-label="Hospital quick actions">
        {quickActions.map(action => (
          <div className={styles.quickAction} key={action.id}>
            <span className={styles.quickActionIcon} aria-hidden="true">
              <Icon iconName={action.iconName} className={styles.quickActionGlyph} />
            </span>
            <span className={styles.quickActionLabel}>{action.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.canvas}>
        <div className={styles.copyPanel}>
          <div className={styles.copyContent}>
            <h2 id="about-title" className={styles.title}>
              About Us
            </h2>

            <p className={styles.description}>{aboutCopy}</p>

            <Button
              className={styles.readMore}
              icon={diagonalArrow}
              noLift
              size="lg"
              tone="deep"
              variant="outline"
            >
              Read More
            </Button>
          </div>
        </div>

        <div className={styles.visualPanel} aria-hidden="true">
          <div className={styles.visualGlow} />

          <img src={doctorImage} alt="" className={styles.doctorImage} loading="eager" />

          <div className={styles.badgeCluster}>
            <span className={styles.badgeHalo} />
            <img src={circleImage} alt="" className={styles.badgeRing} />

            <div className={styles.badgeFrame}>
              {badgeSlides.map((slide, slideIndex) => {
                const isActive = slideIndex === activeBadgeIndex;

                return (
                  <img
                    key={slide.id}
                    src={slide.src}
                    alt=""
                    className={[
                      styles.badgeImage,
                      isActive ? styles.badgeImageActive : styles.badgeImageInactive
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statsSection} aria-label="Hospital performance highlights">
        <div className={styles.statsCard}>
          {statsItems.map(stat => (
            <article className={styles.statItem} key={stat.id}>
              <span className={styles.statIcon} aria-hidden="true">
                <img src={stat.iconSrc} alt="" className={styles.statGlyph} />
              </span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
