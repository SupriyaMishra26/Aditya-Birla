import * as React from 'react';
import consultHeroImage from '../assets/consult-hero.avif';
import doctorPortrait from '../assets/doctor.png';
import onlineConsultationPoster from '../assets/vedio.jpg';
import Button from '../ui/Button';
import styles from './Specialities.module.scss';

const diagonalArrow = String.fromCharCode(8599);

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      d="M14.5 6.5L9 12l5.5 5.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      d="M9.5 6.5L15 12l-5.5 5.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface IKeySpeciality {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgImage: string;
  bgPosition?: string;
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

const getViewportWidth = (): number => {
  if (typeof window === 'undefined') {
    return 1440;
  }

  return window.innerWidth;
};

const createIndexRange = (count: number): number[] => {
  const indices: number[] = [];

  for (let index = 0; index < count; index += 1) {
    indices.push(index);
  }

  return indices;
};

const useElementWidth = <T extends HTMLElement>(elementRef: React.RefObject<T>): number => {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const element = elementRef.current;

    if (!element || typeof window === 'undefined') {
      return undefined;
    }

    const updateWidth = (): void => {
      setWidth(element.getBoundingClientRect().width);
    };

    updateWidth();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateWidth);

      return () => window.removeEventListener('resize', updateWidth);
    }

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      setWidth(entry?.contentRect.width ?? element.getBoundingClientRect().width);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef]);

  return width;
};

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

const MedicalCrossIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect
      x="14"
      y="14"
      width="36"
      height="36"
      rx="12"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    <path d="M32 21v22M21 32h22" stroke="currentColor" strokeWidth="2.8" />
    <circle cx="24" cy="24" r="1.8" fill="currentColor" />
    <circle cx="40" cy="40" r="1.8" fill="currentColor" opacity="0.78" />
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
    bgPosition: 'center 38%'
  },
  {
    id: 'gynaecology',
    title: 'Gynaecology',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <GynecologyIcon className={styles.keyIconGlyph} />,
    bgImage: consultHeroImage,
    bgPosition: 'center 34%'
  },
  {
    id: 'orthopedics',
    title: 'Orthopedics',
    description: 'Bones, joints, and mobility care for active lives.',
    icon: <MedicalCrossIcon className={styles.keyIconGlyph} />,
    bgImage: consultHeroImage,
    bgPosition: 'center 46%'
  },
  {
    id: 'pediatrics',
    title: 'Pediatrics',
    description: 'Friendly, complete care for children and newborns.',
    icon: <MedicalCrossIcon className={styles.keyIconGlyph} />,
    bgImage: consultHeroImage,
    bgPosition: 'center 22%'
  },
  {
    id: 'surgery',
    title: 'General Surgery',
    description: 'Advanced surgical support with careful recovery plans.',
    icon: <MedicalCrossIcon className={styles.keyIconGlyph} />,
    bgImage: consultHeroImage,
    bgPosition: 'center 52%'
  },
  {
    id: 'ent',
    title: 'ENT',
    description: 'Specialized ear, nose, and throat treatment.',
    icon: <MedicalCrossIcon className={styles.keyIconGlyph} />,
    bgImage: consultHeroImage,
    bgPosition: 'center 18%'
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
      right: '0',
      width: '54%',
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
      right: '-2px',
      width: '52%',
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
      right: '0',
      width: '53%',
      transform: 'translateX(8px)'
    }
  }
];

const OnlineConsultationVideo: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;

    if (!isPlaying || !video || typeof window === 'undefined') {
      return undefined;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context || typeof canvas.captureStream !== 'function') {
      return undefined;
    }

    const poster = new Image();
    poster.src = onlineConsultationPoster;
    let cancelled = false;
    let pixelRatio = 1;

    const stopStream = (): void => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      video.pause();
      video.srcObject = null;
    };

    const render = (time: number): void => {
      if (cancelled) {
        return;
      }

      const frameWidth = canvas.width;
      const frameHeight = canvas.height;
      const imageWidth = poster.naturalWidth || 1;
      const imageHeight = poster.naturalHeight || 1;
      const imageRatio = imageWidth / imageHeight;
      const frameRatio = frameWidth / frameHeight;
      const elapsed = time / 1000;
      const zoom = 1.04 + Math.sin(elapsed * 0.3) * 0.01;

      let drawWidth = frameWidth;
      let drawHeight = frameHeight;

      if (imageRatio > frameRatio) {
        drawHeight = frameHeight * zoom;
        drawWidth = drawHeight * imageRatio;
      } else {
        drawWidth = frameWidth * zoom;
        drawHeight = drawWidth / imageRatio;
      }

      const driftX = Math.sin(elapsed * 0.28) * 14 * pixelRatio;
      const driftY = Math.cos(elapsed * 0.24) * 10 * pixelRatio;

      context.clearRect(0, 0, frameWidth, frameHeight);
      context.drawImage(
        poster,
        (frameWidth - drawWidth) / 2 + driftX,
        (frameHeight - drawHeight) / 2 + driftY,
        drawWidth,
        drawHeight
      );

      const overlay = context.createLinearGradient(0, 0, frameWidth, frameHeight);
      overlay.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
      overlay.addColorStop(1, 'rgba(12, 16, 20, 0.18)');
      context.fillStyle = overlay;
      context.fillRect(0, 0, frameWidth, frameHeight);

      animationFrameRef.current = window.requestAnimationFrame(render);
    };

    const startStream = (): void => {
      if (cancelled || !videoRef.current) {
        return;
      }

      const rect = videoRef.current.getBoundingClientRect();
      const width = Math.max(Math.round(rect.width), 1);
      const height = Math.max(Math.round(rect.height), 1);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));

      const stream = canvas.captureStream(30);
      streamRef.current = stream;
      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.play().catch(() => {
        /* Ignore autoplay failures on browsers that require a user gesture. */
      });

      animationFrameRef.current = window.requestAnimationFrame(render);
    };

    const bootId = window.requestAnimationFrame(() => {
      if (cancelled) {
        return;
      }

      if (poster.complete && poster.naturalWidth > 0) {
        startStream();
        return;
      }

      poster.onload = () => {
        if (!cancelled) {
          startStream();
        }
      };
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(bootId);
      poster.onload = null;
      stopStream();
    };
  }, [isPlaying]);

  const handlePlay = (): void => {
    setIsPlaying(true);
  };

  return (
    <div className={styles.consultationSection}>
      <div className={styles.consultationFrame}>
        {!isPlaying ? (
          <img
            src={onlineConsultationPoster}
            alt="Online consultation preview"
            className={styles.consultationPoster}
          />
        ) : (
          <video
            ref={videoRef}
            className={styles.consultationVideo}
            muted
            playsInline
            preload="auto"
            poster={onlineConsultationPoster}
            aria-label="Online consultation video"
          />
        )}

        <div className={styles.consultationOverlay} aria-hidden="true" />

        {!isPlaying ? (
          <button
            type="button"
            className={styles.consultationPlayButton}
            aria-label="Play online consultation video"
            onClick={handlePlay}
          >
            <span className={styles.consultationPlayGlyph} aria-hidden="true" />
          </button>
        ) : null}

        <span className={styles.consultationLabel}>Online Consultation</span>
      </div>
    </div>
  );
};

const Specialities: React.FC = () => {
  const [activeKeyDot, setActiveKeyDot] = React.useState(0);
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [activeSpecialistDot, setActiveSpecialistDot] = React.useState(0);
  const keyGridRef = React.useRef<HTMLDivElement | null>(null);
  const specialistGridRef = React.useRef<HTMLDivElement | null>(null);
  const keyCardRefs = React.useRef<Array<HTMLElement | null>>([]);
  const specialistCardRefs = React.useRef<Array<HTMLElement | null>>([]);
  const keyGridWidth = useElementWidth(keyGridRef);
  const specialistGridWidth = useElementWidth(specialistGridRef);

  const resolvedKeyWidth = keyGridWidth > 0 ? keyGridWidth : getViewportWidth();
  const resolvedSpecialistWidth = specialistGridWidth > 0 ? specialistGridWidth : getViewportWidth();

  const keyVisibleCount =
    resolvedKeyWidth >= 1280 ? 4 : resolvedKeyWidth >= 1024 ? 3 : resolvedKeyWidth >= 768 ? 2 : 1;
  const specialistVisibleCount =
    resolvedSpecialistWidth >= 1280 ? 3 : resolvedSpecialistWidth >= 768 ? 2 : 1;
  const keyPageCount = Math.max(1, Math.ceil(KEY_SPECIALITIES.length / keyVisibleCount));
  const specialistPageCount = Math.max(1, Math.ceil(SPECIALIST_CARDS.length / specialistVisibleCount));
  const showKeyNav = keyPageCount > 1;
  const showSpecialistNav = specialistPageCount > 1;

  React.useEffect(() => {
    setActiveKeyDot(current => Math.min(current, keyPageCount - 1));
  }, [keyPageCount]);

  React.useEffect(() => {
    setActiveSpecialistDot(current => Math.min(current, specialistPageCount - 1));
  }, [specialistPageCount]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !showKeyNav) {
      return undefined;
    }

    const targetIndex = Math.min(activeKeyDot * keyVisibleCount, KEY_SPECIALITIES.length - 1);
    const targetCard = keyCardRefs.current[targetIndex];

    if (!targetCard) {
      return undefined;
    }

    targetCard.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });

    return undefined;
  }, [activeKeyDot, keyVisibleCount, showKeyNav]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !showSpecialistNav) {
      return undefined;
    }

    const targetIndex = Math.min(activeSpecialistDot * specialistVisibleCount, SPECIALIST_CARDS.length - 1);
    const targetCard = specialistCardRefs.current[targetIndex];

    if (!targetCard) {
      return undefined;
    }

    targetCard.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });

    return undefined;
  }, [activeSpecialistDot, specialistVisibleCount, showSpecialistNav]);

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
              >
                View All
              </Button>
            </div>
          </div>

              <div className={styles.keyCardsStage}>
              {showKeyNav ? (
                <button
                  type="button"
                  className={[styles.navArrow, styles.navPrev].join(' ')}
                  aria-label="Previous key specialities"
                  onClick={() => setActiveKeyDot(d => Math.max(0, d - 1))}
              >
                <ArrowLeftIcon className={styles.navArrowGlyph} />
              </button>
            ) : null}

            {showKeyNav ? (
                <button
                  type="button"
                  className={[styles.navArrow, styles.navNext].join(' ')}
                  aria-label="Next key specialities"
                  onClick={() => setActiveKeyDot(d => Math.min(keyPageCount - 1, d + 1))}
                >
                  <ArrowRightIcon className={styles.navArrowGlyph} />
                </button>
              ) : null}

              <div
                ref={keyGridRef}
                className={styles.keyGrid}
                role="list"
                aria-label="Key specialities cards"
              >
                {KEY_SPECIALITIES.map((speciality, index) => (
                  <article
                    key={speciality.id}
                    className={styles.keyCard}
                  ref={element => {
                    keyCardRefs.current[index] = element;
                  }}
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
                      size="sm"
                      noLift
                      className={styles.keyLearnMoreBtn}
                      icon={<span aria-hidden="true">{diagonalArrow}</span>}
                      iconPosition="trailing"
                    >
                      Learn More
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {keyPageCount > 1 ? (
            <div className={styles.keyDots} aria-label="Key specialities pages">
              {createIndexRange(keyPageCount).map(index => (
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
          ) : null}
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
            {showSpecialistNav ? (
              <button
                type="button"
                className={[styles.navArrow, styles.navPrev].join(' ')}
                aria-label="Previous specialists"
                onClick={() => setActiveSpecialistDot(d => Math.max(0, d - 1))}
              >
                <ArrowLeftIcon className={styles.navArrowGlyph} />
              </button>
            ) : null}

            {showSpecialistNav ? (
              <button
                type="button"
                className={[styles.navArrow, styles.navNext].join(' ')}
                aria-label="Next specialists"
                onClick={() => setActiveSpecialistDot(d => Math.min(specialistPageCount - 1, d + 1))}
              >
                <ArrowRightIcon className={styles.navArrowGlyph} />
              </button>
            ) : null}

            <div
              ref={specialistGridRef}
              className={styles.specialistsCardsGrid}
              role="list"
              aria-label="Featured specialists"
            >
              {SPECIALIST_CARDS.map((card, index) => (
                <article
                  key={card.id}
                  className={styles.specialistCard}
                  ref={element => {
                    specialistCardRefs.current[index] = element;
                  }}
                  role="listitem"
                >
                  <div className={styles.specialistCardTop}>
                    <h3 className={styles.specialistName}>{card.name}</h3>
                    <p className={styles.specialistRole}>{card.specialty}</p>
                    <p className={styles.specialistCredentials}>{card.credentials}</p>

                    <p className={styles.specialistExperience}>
                      <strong>{card.experience}</strong> Years of Experience
                    </p>
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

                  <img
                    src={doctorPortrait}
                    alt=""
                    aria-hidden="true"
                    className={styles.specialistPortrait}
                    style={card.portraitStyle}
                  />
                </article>
              ))}
            </div>
          </div>

          {specialistPageCount > 1 ? (
            <div className={styles.specialistDots} aria-label="Specialists pages">
              {createIndexRange(specialistPageCount).map(index => (
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
          ) : null}
        </div>
      </div>

      <OnlineConsultationVideo />
    </section>
  );
};

export default Specialities;
