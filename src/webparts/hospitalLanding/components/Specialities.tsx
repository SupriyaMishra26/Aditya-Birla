import * as React from 'react';
import consultHeroImage from '../assets/consult-hero.avif';
import doctorPortrait from '../assets/doctor.png';
import Button from '../ui/Button';
import styles from './Specialities.module.scss';

const diagonalArrow = String.fromCharCode(8599);
const prevArrow = String.fromCharCode(8249);
const nextArrow = String.fromCharCode(8250);

interface IKeySpeciality {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgImage: string;
  bgPosition?: string;
  featured?: boolean;
}

interface ISpecialistCard {
  id: string;
  name: string;
  specialty: string;
  credentials: string;
  experience: string;
  expertise: string[];
  opdTime: string;
  portraitStyle?: React.CSSProperties;
}

interface IFilterChip {
  id: string;
  label: string;
}

const CardiologyIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path
      d="M31.8 52.4C24.4 46.4 12.8 37.6 12.8 24.5c0-6.1 4.8-10.9 10.9-10.9 4.2 0 7.7 2.1 9.3 5.6 1.6-3.5 5.1-5.6 9.3-5.6 6.1 0 10.9 4.8 10.9 10.9 0 13.1-11.6 21.9-18.9 27.9-1.2 1-2.8 1-4 0Z"
      stroke="currentColor"
      strokeWidth="2.4"
    />
    <path
      d="M20 30.5h6.5l3.2-6.2 3.6 15.5 3.3-7.8H47"
      stroke="currentColor"
      strokeWidth="2.4"
    />
    <path
      d="M22.5 18.5v4.2M41.5 18.5v4.2"
      stroke="currentColor"
      strokeWidth="2.1"
      opacity="0.85"
    />
  </svg>
);

const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path
      d="M22 14c-4.4 0-8 3.6-8 8v1.2c-2.8 1.4-4.7 4.2-4.7 7.4 0 4.3 3 8 7 9.3.9 4.7 5 8.2 9.9 8.2h8.6c4.9 0 9-3.5 9.9-8.2 4-1.3 7-5 7-9.3 0-3.2-1.9-6-4.7-7.4V22c0-4.4-3.6-8-8-8-2.4 0-4.5 1-6 2.6-1.5-1.6-3.6-2.6-6-2.6Z"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    <path
      d="M25 24c1.6-2 4-3.2 6.8-3.2S37 22 38.6 24"
      stroke="currentColor"
      strokeWidth="2.1"
    />
    <path
      d="M23 34h5M36 34h5M27 44l3.2-5.2 3 5.2 2.6-3.8 2 3.8"
      stroke="currentColor"
      strokeWidth="2.1"
    />
    <circle cx="18" cy="20" r="2.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="46" cy="20" r="2.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="39" r="2.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="48" cy="39" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const DentalIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path
      d="M24 14c-4.4 0-8 3.6-8 8v1.2c0 2.7 1.1 5.2 2.9 7.1 1.8 1.8 2.7 4.2 3.1 6.6l2.8 14c.3 1.5 1.6 2.5 3.1 2.5 1.3 0 2.4-.7 3-1.8l3.1-5.3 3.1 5.3c.6 1 1.7 1.8 3 1.8 1.5 0 2.8-1 3.1-2.5l2.8-14c.5-2.4 1.4-4.8 3.1-6.6 1.8-1.9 2.9-4.4 2.9-7.1V22c0-4.4-3.6-8-8-8-3 0-5.6 1.3-7.4 3.5-1.3 1.5-3.5 1.5-4.8 0C29.6 15.3 27 14 24 14Z"
      stroke="currentColor"
      strokeWidth="2.3"
    />
    <path
      d="M15 28h-4M13 26v4M53 28h-4M51 26v4"
      stroke="currentColor"
      strokeWidth="2.1"
    />
  </svg>
);

const GynecologyIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path
      d="M20.5 16.5c0 4.6-2.8 7.8-2.8 12.7 0 4.5 2.5 8 5.7 9.7 2.3 1.2 3.8 3.5 3.8 6v4c0 1.6 1.3 2.9 2.9 2.9h1.8c1.6 0 2.9-1.3 2.9-2.9v-4.4c0-1.7 1.3-3.1 3-3.1s3 1.4 3 3.1V51c0 1.6 1.3 2.9 2.9 2.9h1.8c1.6 0 2.9-1.3 2.9-2.9v-4c0-2.5 1.5-4.8 3.8-6 3.2-1.7 5.7-5.2 5.7-9.7 0-4.9-2.8-8.1-2.8-12.7"
      stroke="currentColor"
      strokeWidth="2.3"
    />
    <path
      d="M22.5 25.3c2.9 0 5.2 1.9 7.1 4.1 1.9-2.2 4.2-4.1 7.1-4.1"
      stroke="currentColor"
      strokeWidth="2.1"
    />
    <circle cx="18.8" cy="31.3" r="2.6" stroke="currentColor" strokeWidth="2.1" />
    <circle cx="45.2" cy="31.3" r="2.6" stroke="currentColor" strokeWidth="2.1" />
  </svg>
);

const KEY_SPECIALITIES: IKeySpeciality[] = [
  {
    id: 'cardiology',
    title: 'Cardiology',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <CardiologyIcon className={styles.keyIconGlyph} />,
    bgImage: consultHeroImage,
    bgPosition: 'center 30%'
  },
  {
    id: 'neurology',
    title: 'Neurology',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <BrainIcon className={styles.keyIconGlyph} />,
    bgImage: consultHeroImage,
    bgPosition: 'center 42%'
  },
  {
    id: 'dental',
    title: 'Dental Care',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <DentalIcon className={styles.keyIconGlyph} />,
    bgImage: consultHeroImage,
    bgPosition: 'center 38%',
    featured: true
  },
  {
    id: 'gynaecology',
    title: 'Gynaecology',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <GynecologyIcon className={styles.keyIconGlyph} />,
    bgImage: consultHeroImage,
    bgPosition: 'center 34%'
  }
];

const SPECIALIST_FILTERS: IFilterChip[] = [
  { id: 'all', label: 'All' },
  { id: 'surgeon-1', label: 'Surgeon' },
  { id: 'cardiologist', label: 'Cardiologist' },
  { id: 'dentist', label: 'Dentist' },
  { id: 'pediatrician', label: 'Pediatrician' },
  { id: 'surgeon-2', label: 'Surgeon' }
];

const SPECIALIST_CARDS: ISpecialistCard[] = [
  {
    id: 'rajesh-badani',
    name: 'Dr. Rajesh Badani',
    specialty: 'Electrophysiology & Ablation',
    credentials: 'MBBS, MD, DNB (Med), FCPS, DNB (Cardiology)',
    experience: '9+',
    expertise: [
      'Interventional electrophysiology',
      'Complex arrhythmia ablation',
      'Device implantation',
      'Coronary angiography and angioplasty'
    ],
    opdTime: 'Mon to Sat - 9.00 AM to 5.30 PM.',
    portraitStyle: {
      right: '-6px',
      bottom: '74px',
      width: '48%',
      transform: 'translateX(6px)'
    }
  },
  {
    id: 'annapoorna-kalia',
    name: 'Dr. Annapoorna Kalia',
    specialty: 'Cath Lab',
    credentials: 'MBBS, DNB (MEDICINE), DNB (CARDIOLOGY), FESC, FACC',
    experience: '10+',
    expertise: [
      'Coronary Angioplasties',
      'Interventional cardiologist',
      'Device closure of Congenital Heart Defects',
      'Treatment of Heart Failure and Hypertension'
    ],
    opdTime: 'Mon to Sat - 10:00 AM - 03:00 PM',
    portraitStyle: {
      right: '-12px',
      bottom: '70px',
      width: '47%',
      transform: 'translateX(8px)'
    }
  },
  {
    id: 'amit-patil',
    name: 'Dr. Amit Patil',
    specialty: 'Obs & Gynae',
    credentials: 'MBBS, MD (Obstetrics and Gynecology), FMAS, PhD, MBA, PGDMLS, FICMCH',
    experience: '18+',
    expertise: [
      'Robotic Gynecology surgery',
      'High risk Obstetrics',
      'Ivf and Infertility treatment',
      'Fetal medicine and Obstetric Ultrasound (Sonography)'
    ],
    opdTime: 'Mon to Sat - 09:00 AM - 05:30 PM',
    portraitStyle: {
      right: '-8px',
      bottom: '68px',
      width: '48%',
      transform: 'translateX(10px)'
    }
  }
];

const KEY_DOTS = [0, 1, 2, 3];
const SPECIALIST_DOTS = [0, 1, 2, 3];

const Specialities: React.FC = () => {
  const [activeKeyDot, setActiveKeyDot] = React.useState(0);
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [activeSpecialistDot, setActiveSpecialistDot] = React.useState(0);

  return (
    <section className={styles.specialitiesSection} aria-label="Hospital specialties">
      <div className={styles.keySection}>
        <div className={styles.keyCanvas}>
          <div className={styles.keyHeader}>
            <div className={styles.keyHeaderCopy}>
              <h2 id="key-specialities-heading" className={styles.keyTitle}>
                Our Key Specialities
              </h2>
              <p className={styles.keyDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className={styles.keyViewAllWrap}>
              <Button
                variant="solid"
                tone="brand"
                size="lg"
                icon={<span aria-hidden="true">{diagonalArrow}</span>}
                iconPosition="trailing"
                style={{ minWidth: '246px' }}
              >
                View All
              </Button>
            </div>
          </div>

          <div className={styles.keyCardsStage}>
            <button
              type="button"
              className={[styles.navArrow, styles.navPrev].join(' ')}
              aria-label="Previous key specialities"
              onClick={() => setActiveKeyDot(d => Math.max(0, d - 1))}
            >
              {prevArrow}
            </button>

            <button
              type="button"
              className={[styles.navArrow, styles.navNext].join(' ')}
              aria-label="Next key specialities"
              onClick={() => setActiveKeyDot(d => Math.min(KEY_DOTS.length - 1, d + 1))}
            >
              {nextArrow}
            </button>

            <div className={styles.keyGrid} role="list" aria-label="Key specialities cards">
              {KEY_SPECIALITIES.map(speciality => (
                <article
                  key={speciality.id}
                  className={[
                    styles.keyCard,
                    speciality.featured ? styles.keyCardFeatured : ''
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="listitem"
                >
                  <div
                    className={styles.keyCardBg}
                    style={{
                      backgroundImage: `url(${speciality.bgImage})`,
                      backgroundPosition: speciality.bgPosition
                    }}
                    aria-hidden="true"
                  />

                  <div className={styles.keyCardContent}>
                    <div className={styles.keyIconWrap} aria-hidden="true">
                      {speciality.icon}
                    </div>

                    <h3 className={styles.keyCardTitle}>{speciality.title}</h3>
                    <p className={styles.keyCardDesc}>{speciality.description}</p>

                    <Button
                      variant="outline"
                      tone="brand"
                      size="md"
                      noLift
                      className={styles.keyLearnMoreBtn}
                      icon={<span aria-hidden="true">{diagonalArrow}</span>}
                      iconPosition="trailing"
                      style={{ minHeight: '42px', padding: '0 18px' }}
                    >
                      Learn More
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.keyDots} aria-label="Key specialities pages">
            {KEY_DOTS.map(index => (
              <button
                key={index}
                type="button"
                aria-pressed={activeKeyDot === index}
                aria-label={`Page ${index + 1}`}
                className={[
                  styles.keyDot,
                  activeKeyDot === index ? styles.keyDotActive : styles.keyDotSmall
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setActiveKeyDot(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.specialistsSection}>
        <div className={styles.specialistsCanvas}>
          <div className={styles.specialistsHeader}>
            <h2 id="specialists-heading" className={styles.specialistsTitle}>
              Our Specialists
            </h2>
            <p className={styles.specialistsDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className={styles.specialistsFilters} aria-label="Specialist categories">
            {SPECIALIST_FILTERS.map(filter => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={activeFilter === filter.id}
                className={[
                  styles.filterChip,
                  activeFilter === filter.id ? styles.filterChipActive : ''
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className={styles.specialistsCardsStage}>
            <button
              type="button"
              className={[styles.navArrow, styles.navPrev].join(' ')}
              aria-label="Previous specialists"
              onClick={() => setActiveSpecialistDot(d => Math.max(0, d - 1))}
            >
              {prevArrow}
            </button>

            <button
              type="button"
              className={[styles.navArrow, styles.navNext].join(' ')}
              aria-label="Next specialists"
              onClick={() => setActiveSpecialistDot(d => Math.min(SPECIALIST_DOTS.length - 1, d + 1))}
            >
              {nextArrow}
            </button>

            <div className={styles.specialistsCardsGrid} role="list" aria-label="Featured specialists">
              {SPECIALIST_CARDS.map(card => (
                <article key={card.id} className={styles.specialistCard} role="listitem">
                  <div className={styles.specialistCardTop}>
                    <h3 className={styles.specialistName}>{card.name}</h3>
                    <p className={styles.specialistRole}>{card.specialty}</p>
                    <p className={styles.specialistCredentials}>{card.credentials}</p>

                    <p className={styles.specialistExperience}>
                      <strong>{card.experience}</strong> Years of Experience
                    </p>

                    <img
                      src={doctorPortrait}
                      alt=""
                      aria-hidden="true"
                      className={styles.specialistPortrait}
                      style={card.portraitStyle}
                    />
                  </div>

                  <div className={styles.specialistCardBody}>
                    <h4 className={styles.specialistBodyTitle}>Areas of Expertise</h4>
                    <ul className={styles.expertiseList}>
                      {card.expertise.map(item => (
                        <li key={item} className={styles.expertiseItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.specialistCardFooter}>
                    <span className={styles.opdTag}>OPD Timing:</span>
                    <p className={styles.opdTime}>{card.opdTime}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.specialistDots} aria-label="Specialists pages">
            {SPECIALIST_DOTS.map(index => (
              <button
                key={index}
                type="button"
                aria-pressed={activeSpecialistDot === index}
                aria-label={`Page ${index + 1}`}
                className={[
                  styles.specialistDot,
                  activeSpecialistDot === index ? styles.specialistDotActive : styles.specialistDotSmall
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setActiveSpecialistDot(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specialities;
