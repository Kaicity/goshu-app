import { Variants } from 'framer-motion';

export const fadeInFramer = (direction: string = 'up', delay: number = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 50 : -50,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
});
