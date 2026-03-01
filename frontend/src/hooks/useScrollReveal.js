import { useEffect } from 'react';

/**
 * Attaches an IntersectionObserver to every element that has one of the
 * section-reveal* classes and adds the `in-view` class when it enters the
 * viewport.  Also works for `.stagger-children` containers.
 *
 * Call once at the top of any page component:
 *   useScrollReveal()
 */
const SELECTORS = [
  '.section-reveal',
  '.section-reveal-left',
  '.section-reveal-right',
  '.section-reveal-scale',
  '.stagger-children',
];

export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const elements = document.querySelectorAll(SELECTORS.join(', '));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Once revealed, stop observing so it stays visible
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
