import * as React from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import consultHeroImage from '../assets/consult-hero.avif';
import caseTourBackdrop from '../assets/bg-case-of-month.png';
import facilityPoster from '../assets/vedio.jpg';
import Button from '../ui/Button';
import 'swiper/css';
import styles from './FacilityTour.module.scss';

interface IFacilityTourMotion {
  zoomBase: number;
  zoomRange: number;
  driftX: number;
  driftY: number;
  driftSpeedX: number;
  driftSpeedY: number;
}

interface IFacilityTourSlide {
  id: string;
  poster: string;
  ariaLabel: string;
  motion: IFacilityTourMotion;
}

const FACILITY_TOUR_SLIDES: IFacilityTourSlide[] = [
  {
    id: 'facility-tour-consultation-wing',
    poster: consultHeroImage,
    ariaLabel: 'Hospital consultation wing video',
    motion: {
      zoomBase: 1.04,
      zoomRange: 0.01,
      driftX: 16,
      driftY: 10,
      driftSpeedX: 0.28,
      driftSpeedY: 0.22
    }
  },
  {
    id: 'facility-tour-online-room',
    poster: facilityPoster,
    ariaLabel: 'Hospital online consultation room video',
    motion: {
      zoomBase: 1.035,
      zoomRange: 0.012,
      driftX: 12,
      driftY: 14,
      driftSpeedX: 0.24,
      driftSpeedY: 0.3
    }
  },
  {
    id: 'facility-tour-care-space',
    poster: caseTourBackdrop,
    ariaLabel: 'Hospital care space video',
    motion: {
      zoomBase: 1.03,
      zoomRange: 0.01,
      driftX: 10,
      driftY: 8,
      driftSpeedX: 0.2,
      driftSpeedY: 0.18
    }
  },
  {
    id: 'facility-tour-consultation-wing-alt',
    poster: consultHeroImage,
    ariaLabel: 'Hospital consultation wing alternate video',
    motion: {
      zoomBase: 1.05,
      zoomRange: 0.008,
      driftX: 13,
      driftY: 9,
      driftSpeedX: 0.22,
      driftSpeedY: 0.26
    }
  },
  {
    id: 'facility-tour-online-room-alt',
    poster: facilityPoster,
    ariaLabel: 'Hospital online consultation room alternate video',
    motion: {
      zoomBase: 1.028,
      zoomRange: 0.01,
      driftX: 14,
      driftY: 11,
      driftSpeedX: 0.31,
      driftSpeedY: 0.21
    }
  },
  {
    id: 'facility-tour-care-space-alt',
    poster: caseTourBackdrop,
    ariaLabel: 'Hospital care space alternate video',
    motion: {
      zoomBase: 1.032,
      zoomRange: 0.009,
      driftX: 9,
      driftY: 12,
      driftSpeedX: 0.19,
      driftSpeedY: 0.24
    }
  }
];

const diagonalArrow = String.fromCharCode(8599);

const FacilityTourVideoCard: React.FC<IFacilityTourSlide> = ({ poster, ariaLabel, motion }) => {
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

    const image = new Image();
    image.src = poster;
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

    const renderFrame = (time: number): void => {
      if (cancelled) {
        return;
      }

      const frameWidth = canvas.width;
      const frameHeight = canvas.height;
      const imageWidth = image.naturalWidth || 1;
      const imageHeight = image.naturalHeight || 1;
      const imageRatio = imageWidth / imageHeight;
      const frameRatio = frameWidth / frameHeight;
      const elapsed = time / 1000;
      const zoom = motion.zoomBase + Math.sin(elapsed * 0.45) * motion.zoomRange;

      let drawWidth = frameWidth;
      let drawHeight = frameHeight;

      if (imageRatio > frameRatio) {
        drawHeight = frameHeight * zoom;
        drawWidth = drawHeight * imageRatio;
      } else {
        drawWidth = frameWidth * zoom;
        drawHeight = drawWidth / imageRatio;
      }

      const driftX = Math.sin(elapsed * motion.driftSpeedX) * motion.driftX * pixelRatio;
      const driftY = Math.cos(elapsed * motion.driftSpeedY) * motion.driftY * pixelRatio;

      context.clearRect(0, 0, frameWidth, frameHeight);
      context.drawImage(
        image,
        (frameWidth - drawWidth) / 2 + driftX,
        (frameHeight - drawHeight) / 2 + driftY,
        drawWidth,
        drawHeight
      );

      const overlay = context.createLinearGradient(0, 0, frameWidth, frameHeight);
      overlay.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
      overlay.addColorStop(1, 'rgba(8, 10, 14, 0.12)');
      context.fillStyle = overlay;
      context.fillRect(0, 0, frameWidth, frameHeight);

      animationFrameRef.current = window.requestAnimationFrame(renderFrame);
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
      video.loop = true;
      video.playsInline = true;

      video.play().catch(() => {
        /* Ignore autoplay failures in browsers that require a user gesture. */
      });

      animationFrameRef.current = window.requestAnimationFrame(renderFrame);
    };

    const bootId = window.requestAnimationFrame(() => {
      if (cancelled) {
        return;
      }

      if (image.complete && image.naturalWidth > 0) {
        startStream();
        return;
      }

      image.onload = () => {
        if (!cancelled) {
          startStream();
        }
      };
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(bootId);
      image.onload = null;
      stopStream();
    };
  }, [isPlaying, motion, poster]);

  const handlePlay = (): void => {
    if (typeof window === 'undefined') {
      return;
    }

    setIsPlaying(true);
  };

  return (
    <div className={styles.facilityTourCard}>
      <video
        ref={videoRef}
        className={styles.facilityTourVideo}
        muted
        playsInline
        loop
        preload="metadata"
        poster={poster}
        aria-label={ariaLabel}
      />

      {!isPlaying ? (
        <button
          type="button"
          className={styles.facilityTourPlayButton}
          aria-label={`Play ${ariaLabel}`}
          onClick={handlePlay}
        >
          <span className={styles.facilityTourPlayGlyph} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
};

const FacilityTour: React.FC = () => {
  const enableLoop = FACILITY_TOUR_SLIDES.length > 1;

  return (
    <section className={styles.facilityTourSection} aria-label="Facility tour">
      <div className={styles.facilityTourCanvas}>
        <div className={styles.facilityTourHeader}>
          <div className={styles.facilityTourHeaderCopy}>
            <h2 className={styles.facilityTourTitle}>Facility Tour</h2>
            <p className={styles.facilityTourDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            tone="brand"
            size="md"
            className={styles.facilityTourReadMore}
            icon={<span aria-hidden="true">{diagonalArrow}</span>}
            iconPosition="trailing"
          >
            Read More
          </Button>
        </div>

        <Swiper
          className={styles.facilityTourSwiper}
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={16}
          loop={enableLoop}
          speed={1100}
          slidesPerGroup={1}
          watchSlidesProgress
          breakpointsBase="container"
          observer
          observeParents
          resizeObserver
          autoplay={
            enableLoop
              ? {
                  delay: 2200,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false
                }
              : false
          }
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 18
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 24
            }
          }}
          onSwiper={(swiper: SwiperClass) => {
            if (enableLoop && swiper.autoplay) {
              swiper.autoplay.start();
            }
          }}
        >
          {FACILITY_TOUR_SLIDES.map(slide => (
            <SwiperSlide key={slide.id} className={styles.facilityTourSlide}>
              <FacilityTourVideoCard {...slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FacilityTour;
