import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import bookModel from '../assets/book.glb'; // Adjust the path to your model

// Book Component to Load the 3D Model
const Book = ({ isLarge, onClick }) => {
  const { scene } = useGLTF(bookModel);
  const scale = isLarge ? [2, 2, 2] : [1, 1, 1];
  // Explicitly center the model at [0, 0, 0]
  return <primitive object={scene} scale={scale} position={[0, 0, 0]} onClick={onClick} />;
};

const Livre = () => {
  const [isInView, setIsInView] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const sectionRef = useRef(null);

  const text =
    "Je suis l’autrice d’un roman illustré mêlant fiction et réalité, retranscrivant les souvenirs de seniors dans une histoire romancée pour préserver leur mémoire et toucher un large public, tout en respectant leurs témoignages. Le livre suit Raphaël ONEIROI, un psychologue atteint d’achromatopsie, qui ne voit qu’en nuances de gris. Il aide des couples de seniors – les LAMY, craignant la solitude, les CAILLEUX, anticipant la dépendance, et les ZANELLA-VIVÉS, ennuyés par leur retraite – grâce à un don surnaturel. Ce pouvoir lui permet de plonger dans leurs souvenirs, qu’il perçoit en monochrome selon l’émotion associée. Accompagnez Raphaël dans sa quête pour apporter de la couleur à son monde, et découvrez comment son aptitude pourrait être perçue si elle était révélée.";

  const words = text.split(' '); // Split by words instead of characters
  const anneBackText = "- Anne Back";
  const anneBackWords = anneBackText.split(' '); // Split signature by words

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleBookClick = () => {
    setIsLarge((prev) => !prev);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-white flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Main Content Container */}
      <div className="relative w-full max-w-[80vw] h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side: 3D Book */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
            <ambientLight intensity={2.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Book isLarge={isLarge} onClick={handleBookClick} />
            <OrbitControls
              enablePan={false} // Disable panning to keep book centered
              enableZoom={false} // Disable zooming for consistent size
              enableRotate={true} // Allow rotation only
              autoRotate={true} // Optional: gentle auto-rotation
              autoRotateSpeed={1.0} // Slow rotation speed
              minPolarAngle={Math.PI / 2.5} // Limit vertical rotation
              maxPolarAngle={Math.PI / 2.5} // Keep book horizontal
            />
          </Canvas>
        </div>

        {/* Right Side: Text and Audio Demo */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 py-4 md:px-8 lg:pl-[6rem] lg:pr-[2rem]">
          {/* Book Description with Animation */}
          <div className="text-black relative w-full">
            <h2
              className="absolute top-2 left-0 text-xl md:text-2xl font-bold text-black z-10 uppercase"
              style={{ fontWeight: 400 }}
            >
              À propos de Monochromes
            </h2>
            <motion.div
              style={{ fontFamily: "'Bodoni Moda', serif" }}
              className="text-base md:text-lg lg:text-[20px] leading-relaxed text-black mt-12"
            >
              {/* Main text */}
              <motion.div className="text-justify text-black">
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: 'blur(5px)' }}
                    animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(5px)' }}
                    transition={{
                      delay: index * 0.1, // Increased delay for word-based animation
                      duration: 1,
                      ease: 'easeOut',
                    }}
                    style={{ display: 'inline-block', marginRight: '0.25rem' }} // Space between words
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>

              {/* Signature */}
              <motion.div
                className="mt-4 md:mt-8 text-right italic text-black"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {anneBackWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: 'blur(5px)' }}
                    animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(5px)' }}
                    transition={{
                      delay: words.length * 0.1 + index * 0.1, // Offset by main text length
                      duration: 1,
                      ease: 'easeOut',
                    }}
                    style={{ display: 'inline-block', marginRight: '0.25rem' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Audio Demo */}
          <div className="mt-4 md:mt-8 w-full">
            <h3
              className="text-lg md:text-xl font-medium mb-2 text-center"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Demo Audible
            </h3>
            <audio controls className="w-full max-w-md mx-auto">
              <source
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio>
            <p className="text-xs md:text-sm text-gray-600 mt-2 text-center">
              Démo Audible interprétée par Florian LAUBERTE
            </p>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        /* Responsive Adjustments */
        @media (max-width: 640px) {
          .max-w-[80vw] {
            height: 30vh;
          }
          .text-xl {
            font-size: 1rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .max-w-[80vw] {
            height: 40vh;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .max-w-[80vw] {
            height: 50vh;
          }
        }
      `}</style>
    </section>
  );
};

export default Livre;