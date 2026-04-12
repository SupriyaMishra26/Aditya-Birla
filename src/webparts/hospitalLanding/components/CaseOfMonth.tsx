import * as React from 'react';
import consultHeroImage from '../assets/consult-hero.avif';
import doctorPortrait from '../assets/doctor.png';
import videoPoster from '../assets/vedio.jpg';
import caseTourBackdrop from '../assets/bg-case-of-month.png';
import Button from '../ui/Button';
import styles from './CaseOfMonth.module.scss';

type TourMediaKind = 'image' | 'video' | 'portrait';

interface ITourSlide {
  id: string;
  title: string;
  badge: string;
  kind: TourMediaKind;
  image: string;
  imagePosition?: string;
}

const diagonalArrow = String.fromCharCode(8599);

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
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
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
    <path
      d="M9.5 6.5L15 12l-5.5 5.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TOUR_SLIDES: ITourSlide[] = [
  {
    id: 'tour-consultation-wing',
    title: 'Consultation Wing',
    badge: 'Image',
    kind: 'image',
    image: consultHeroImage,
    imagePosition: 'center center'
  },
  {
    id: 'tour-virtual-care',
    title: 'Virtual Care',
    badge: 'Video',
    kind: 'video',
    image: videoPoster,
    imagePosition: 'center center'
  },
  {
    id: 'tour-doctor-spotlight',
    title: 'Doctor Spotlight',
    badge: 'Portrait',
    kind: 'portrait',
    image: doctorPortrait,
    imagePosition: 'center top'
  },
  {
    id: 'tour-patient-guidance',
    title: 'Patient Guidance',
    badge: 'Image',
    kind: 'image',
    image: consultHeroImage,
    imagePosition: '56% center'
  },
  {
    id: 'tour-video-walkthrough',
    title: 'Facility Walkthrough',
    badge: 'Video',
    kind: 'video',
    image: videoPoster,
    imagePosition: 'center center'
  },
  {
    id: 'tour-care-team',
    title: 'Care Team',
    badge: 'Image',
    kind: 'image',
    image: consultHeroImage,
    imagePosition: '42% center'
  }
];

const getViewportWidth = (): number => {
  if (typeof window === 'undefined') {
    return 1440;
  }

  return window.innerWidth;
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

const createIndexRange = (count: number): number[] => {
  const indices: number[] = [];

  for (let index = 0; index < count; index += 1) {
    indices.push(index);
  }

  return indices;
};

const FacilityTour: React.FC = () => {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [activePage, setActivePage] = React.useState(0);
  const viewportWidth = useElementWidth(viewportRef);

  const resolvedWidth = viewportWidth > 0 ? viewportWidth : getViewportWidth();
  const visibleCount =
    resolvedWidth >= 1280 ? 3 : resolvedWidth >= 768 ? 2 : 1;
  const slideGap = resolvedWidth >= 1280 ? 24 : resolvedWidth >= 768 ? 20 : 16;
  const slideWidth = Math.max(1, (resolvedWidth - slideGap * (visibleCount - 1)) / visibleCount);
  const pageCount = Math.max(1, Math.ceil(TOUR_SLIDES.length / visibleCount));
  const maxPageIndex = pageCount - 1;
  const canGoPrev = activePage > 0;
  const canGoNext = activePage < maxPageIndex;
  const sliderStyle = {
    '--tour-gap': `${slideGap}px`,
    '--tour-slide-width': `${slideWidth}px`
  } as React.CSSProperties;

  React.useEffect(() => {
    setActivePage(currentPage => Math.min(currentPage, maxPageIndex));
  }, [maxPageIndex]);

  React.useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    viewport.scrollTo({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      left: activePage * resolvedWidth
    });

    return undefined;
  }, [activePage, resolvedWidth]);

  const handleScroll = (): void => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const nextPage = Math.min(maxPageIndex, Math.round(viewport.scrollLeft / Math.max(viewport.clientWidth, 1)));
    setActivePage(currentPage => (currentPage === nextPage ? currentPage : nextPage));
  };

  return (
    <section className={styles.tourSection} aria-labelledby="case-of-month-title">
      <div
        className={styles.tourBackdrop}
        aria-hidden="true"
        style={{ backgroundImage: `url(${caseTourBackdrop})` }}
      />

      <div className={styles.tourHeaderWrap}>
        <header className={styles.tourHeader}>
          <div className={styles.tourHeaderCopy}>
            <h2 id="case-of-month-title" className={styles.tourTitle}>
              Case Of The Month
            </h2>
            <p className={styles.tourDescription}>
              Explore a featured care story through a clean, responsive slider built to stay
              balanced on smaller screens.
            </p>
          </div>

          <Button
            variant="outline"
            tone="brand"
            size="md"
            className={styles.tourReadMore}
            icon={<span aria-hidden="true">{diagonalArrow}</span>}
            iconPosition="trailing"
          >
            Read More
          </Button>
        </header>
      </div>

      <div className={styles.tourSliderShell}>
        <button
          type="button"
          className={[
            styles.tourNav,
            styles.tourNavPrev,
            canGoPrev ? '' : styles.tourNavDisabled
          ]
            .filter(Boolean)
            .join(' ')}
          aria-label="Previous case of month slides"
          aria-disabled={!canGoPrev}
          disabled={!canGoPrev}
          onClick={() => setActivePage(page => Math.max(0, page - 1))}
        >
          <ArrowLeftIcon className={styles.tourNavGlyph} />
        </button>

        <button
          type="button"
          className={[
            styles.tourNav,
            styles.tourNavNext,
            canGoNext ? '' : styles.tourNavDisabled
          ]
            .filter(Boolean)
            .join(' ')}
          aria-label="Next case of month slides"
          aria-disabled={!canGoNext}
          disabled={!canGoNext}
          onClick={() => setActivePage(page => Math.min(maxPageIndex, page + 1))}
        >
          <ArrowRightIcon className={styles.tourNavGlyph} />
        </button>

        <div
          ref={viewportRef}
          className={styles.tourViewport}
          onScroll={handleScroll}
          role="list"
          aria-label="Case of month media cards"
          style={sliderStyle}
        >
          <div className={styles.tourTrack}>
            {TOUR_SLIDES.map(slide => (
              <article
                key={slide.id}
                className={[
                  styles.tourSlide,
                  slide.kind === 'portrait' ? styles.tourSlidePortrait : ''
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="listitem"
              >
                <div className={styles.tourMediaWrap}>
                  <img
                    src={slide.image}
                    alt=""
                    aria-hidden="true"
                    className={styles.tourMedia}
                    style={{
                      objectPosition: slide.imagePosition,
                      objectFit: slide.kind === 'portrait' ? 'contain' : 'cover'
                    }}
                  />

                  <div className={styles.tourMediaShade} aria-hidden="true" />

                  <span className={styles.tourTypeChip}>{slide.badge}</span>

                  <span className={styles.tourPlayBadge} aria-hidden="true">
                    <span className={styles.tourPlayGlyph} />
                  </span>

                  <div className={styles.tourSlideCopy}>
                    <p className={styles.tourSlideTitle}>{slide.title}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {pageCount > 1 ? (
          <div className={styles.tourPagination} aria-label="Case of month pages">
            {createIndexRange(pageCount).map(index => (
              <button
                key={index}
                type="button"
                className={[
                  styles.tourDot,
                  activePage === index ? styles.tourDotActive : styles.tourDotSmall
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-label={`Go to page ${index + 1}`}
                aria-pressed={activePage === index}
                onClick={() => setActivePage(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default FacilityTour;
