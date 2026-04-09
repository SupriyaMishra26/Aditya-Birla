import * as React from 'react';
import consultImage from '../assets/consult-hero.avif';
import Button from '../ui/Button';
import styles from './Banner.module.scss';

interface IBannerProps {
  onPrimaryAction?: () => void;
}

interface IHeroSlide {
  id: string;
  imagePosition: string;
}

const diagonalArrow = String.fromCharCode(8599);

const heroSlides: IHeroSlide[] = [
  { id: 'trusted-care-1', imagePosition: 'center center' },
  { id: 'trusted-care-2', imagePosition: '42% center' },
  { id: 'trusted-care-3', imagePosition: '58% center' },
  { id: 'trusted-care-4', imagePosition: '68% center' }
];

const Banner: React.FC<IBannerProps> = ({ onPrimaryAction }) => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  React.useEffect(() => {
    if (heroSlides.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveSlide(currentSlide => (currentSlide + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const showPreviousSlide = (): void => {
    setActiveSlide(currentSlide => {
      if (currentSlide === 0) {
        return heroSlides.length - 1;
      }

      return currentSlide - 1;
    });
  };

  const showNextSlide = (): void => {
    setActiveSlide(currentSlide => (currentSlide + 1) % heroSlides.length);
  };

  return (
    <section className={styles.banner} aria-label="Hospital hero banner">
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {heroSlides.map(slide => (
            <article className={styles.slide} key={slide.id}>
              <div className={styles.visual}>
                <img
                  src={consultImage}
                  alt=""
                  aria-hidden="true"
                  className={styles.image}
                  style={{ objectPosition: slide.imagePosition }}
                />
                <div className={styles.imageGlow} />
              </div>

              <div className={styles.contentCard}>
                <div className={styles.copyStack}>
                  <p className={styles.eyebrow}>TRUSTED CARE</p>
                  <h1 className={styles.heading}>FOR EVERY STAGE OF LIFE</h1>
                  <p className={styles.description}>
                    From Routine Check-Ups To Specialized Treatments, We&apos;re Here For You.
                  </p>
                </div>

                <Button
                  className={styles.primaryAction}
                  icon={diagonalArrow}
                  onClick={onPrimaryAction}
                  size="lg"
                  tone="brand"
                  variant="solid"
                >
                  Find a Specialist
                </Button>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.control} ${styles.prevControl}`}
          onClick={showPreviousSlide}
          aria-label="Show previous slide"
        >
          <span className={`${styles.controlGlyph} ${styles.controlGlyphPrev}`} />
        </button>

        <button
          type="button"
          className={`${styles.control} ${styles.nextControl}`}
          onClick={showNextSlide}
          aria-label="Show next slide"
        >
          <span className={`${styles.controlGlyph} ${styles.controlGlyphNext}`} />
        </button>

        <div className={styles.pagination}>
          {heroSlides.map((slide, slideIndex) => (
            <button
              type="button"
              key={slide.id}
              className={`${styles.dot} ${slideIndex === activeSlide ? styles.dotActive : ''}`}
              aria-label={`Show slide ${slideIndex + 1}`}
              onClick={() => setActiveSlide(slideIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
