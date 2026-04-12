import * as React from 'react';
import consultHeroImage from '../assets/consult-hero.avif';
import doctorPortrait from '../assets/doctor.png';
import caseTourBackdrop from '../assets/bg-case-of-month.png';
import styles from './CaseOfMonth.module.scss';

interface ICaseOfMonthCard {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  specialty: string;
}

const CASE_OF_MONTH_CARDS: ICaseOfMonthCard[] = [
  {
    id: 'case-of-month-1',
    title: 'A Second Chance At Life',
    excerpt:
      'A 58-Year-Old Patient Was Admitted With Severe Chest Pain And Multiple Blockages. Our Cardiology Team Performed A High-Risk Angioplasty With Precision And Speed. Within 48 Hours, The Patient Was Stable And On The Road To Recovery.',
    author: 'By Dr. Amit Patil',
    role: 'Cardiologist',
    image: doctorPortrait,
    imageAlt: 'Smiling doctor portrait',
    imagePosition: 'center center',
    specialty: 'Cardiology'
  },
  {
    id: 'case-of-month-2',
    title: 'A Second Chance At Life',
    excerpt:
      'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat.',
    author: 'By Dr. Savili Chavan',
    role: 'Cardiologist',
    image: consultHeroImage,
    imageAlt: 'Doctor consulting a patient',
    imagePosition: 'center center',
    specialty: 'Cardiology'
  }
];

const CaseOfMonth: React.FC = () => {
  return (
    <section className={styles.section} aria-labelledby="case-of-month-heading">
      <div
        className={styles.backdrop}
        aria-hidden="true"
        style={{ backgroundImage: `url(${caseTourBackdrop})` }}
      />

      <div className={styles.canvas}>
        <header className={styles.header}>
          <h2 id="case-of-month-heading" className={styles.title}>
            Case Of The Month
          </h2>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </header>

        <div className={styles.grid} role="list" aria-label="Case of month stories">
          {CASE_OF_MONTH_CARDS.map(card => (
            <article key={card.id} className={styles.card} role="listitem">
              <div className={styles.mediaPane}>
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className={styles.image}
                  style={{ objectPosition: card.imagePosition }}
                  loading="lazy"
                />
                <span className={styles.cross} aria-hidden="true">
                  +
                </span>
              </div>

              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.excerpt}>{card.excerpt}</p>

                <div className={styles.meta}>
                  <p className={styles.author}>{card.author}</p>
                  <p className={styles.role}>{card.role}</p>
                </div>
              </div>

              <span className={styles.ribbon}>{card.specialty}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseOfMonth;
