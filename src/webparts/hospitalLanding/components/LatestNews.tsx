import * as React from 'react';
import Button from '../ui/Button';
import styles from './LatestNews.module.scss';

export interface INewsArticle {
  id: string | number;
  category: string;
  dateLabel: string;
  dateIso: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt?: string;
  href?: string;
}

interface ILatestNewsProps {
  heading?: string;
  subtext?: string;
  articles?: INewsArticle[];
  onViewAll?: () => void;
  onReadMore?: (article: INewsArticle) => void;
}

const DEFAULT_ARTICLES: INewsArticle[] = [
  {
    id: 1,
    category: 'Mental Health',
    dateLabel: 'Jan 30, 2022',
    dateIso: '2022-01-30',
    title: '6 Tips To Protect Your Mental Health When You\'re Sick',
    excerpt:
      'It\'s normal to feel anxiety, worry and grief any time you\'re diagnosed with a condition that feels life changing. The right support can make the journey easier.',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&auto=format&fit=crop',
    imageAlt: 'Doctor consulting a patient'
  },
  {
    id: 2,
    category: 'Infectious',
    dateLabel: 'Jan 30, 2022',
    dateIso: '2022-01-30',
    title: 'Unsure About Wearing A Face Mask? Here\'s How And Why',
    excerpt:
      'It\'s normal to feel anxiety, worry and grief any time you\'re diagnosed with a condition that feels life changing. Clear guidance helps people stay safe and confident.',
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=900&auto=format&fit=crop',
    imageAlt: 'Medical professional wearing a face mask'
  },
  {
    id: 3,
    category: 'Nutrition',
    dateLabel: 'Jan 30, 2022',
    dateIso: '2022-01-30',
    title: 'Tips For Eating Healthy When You\'re Working From Home',
    excerpt:
      'It\'s normal to feel anxiety, worry and grief any time you\'re diagnosed with a condition that feels life changing. Small habits around food can make a big difference.',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&auto=format&fit=crop',
    imageAlt: 'Healthy food and vegetables'
  }
];

const diagonalArrow = String.fromCharCode(8599);
const rightArrow = String.fromCharCode(8594);

const LatestNews: React.FC<ILatestNewsProps> = ({
  heading = 'Latest News',
  subtext = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  articles = DEFAULT_ARTICLES,
  onViewAll,
  onReadMore
}) => {
  return (
    <section className={styles.section} aria-labelledby="latest-news-heading">
      <div className={styles.canvas}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 id="latest-news-heading" className={styles.heading}>
              {heading}
            </h2>
            <p className={styles.subtext}>{subtext}</p>
          </div>

          <Button
            type="button"
            variant="solid"
            tone="deep"
            size="md"
            className={styles.viewAllBtn}
            icon={<span aria-hidden="true">{diagonalArrow}</span>}
            iconPosition="trailing"
            onClick={onViewAll}
            aria-label="View all news articles"
          >
            View All
          </Button>
        </div>

        <div className={styles.grid} role="list" aria-label="Latest news articles">
          {articles.map(article => (
            <article key={article.id} className={styles.card} role="listitem">
              <div className={styles.imageWrap}>
                <img
                  src={article.imageUrl}
                  alt={article.imageAlt ?? article.title}
                  className={styles.image}
                  loading="lazy"
                />
                <span className={styles.badge}>{article.category}</span>
              </div>

              <div className={styles.body}>
                <time className={styles.date} dateTime={article.dateIso}>
                  {article.dateLabel}
                </time>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.excerpt}>{article.excerpt}</p>

                <Button
                  type="button"
                  variant="solid"
                  tone="deep"
                  size="sm"
                  className={styles.readMoreBtn}
                  icon={<span aria-hidden="true">{rightArrow}</span>}
                  iconPosition="trailing"
                  onClick={() => onReadMore?.(article)}
                  aria-label={`Read more about ${article.title}`}
                >
                  Read More
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
