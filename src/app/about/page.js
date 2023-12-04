'use client'
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const About = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
  };

  return (
        <div className="max-w-screen-lg mx-auto">
        <h1 className="flex justify-center items-center text-xl font-bold m-4 p-2 rounded-lg">About</h1>
        <motion.div
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ duration: 0.5 }}
      >
        <div style={{ height: '100vh', padding: '20px' }}>
          <p className='bg-yellow-100 m-4 p-4 rounded-md'>
          The hottest comic in America, Sebastian Maniscalco, joins forces with legendary Italian-American 
          and two-time Oscar winner Robert De Niro, in the new comedy "About My Father." 
          The film centers around Sebastian (Maniscalco) who is encouraged by his fiancée (Leslie Bibb) to 
          bring his immigrant hairdresser father Salvo (De Niro) to a weekend get-together with her super-rich
        and exceedingly eccentric family (Kim Cattrall, Anders Holm, Brett Dier, David Rasche). 
        The weekend develops into what can only be described as a culture clash, leaving Sebastian and Salvo 
        to discover that the great thing about family is everything about family.
          </p>
          {/* Add more content here */}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
