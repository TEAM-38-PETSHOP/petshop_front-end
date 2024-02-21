'use client';
import { useEffect, useState } from 'react';
import Arrow from '../Arrow/Arrow';
import styles from './scrollToTop.module.scss';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {isVisible && (
        <Arrow
          styleName={styles.scrollToTop}
          onClick={scrollToTop}
          isWhite
        />
      )}
    </>
  );
}
