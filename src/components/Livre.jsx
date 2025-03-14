import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import bookModel from '../assets/book.glb'; // Adjust the path to your model

// Book Component to Load the 3D Model
const Book = ({ isLarge, onClick }) => {
  const { scene } = useGLTF(bookModel);
  const scale = isLarge ? [4, 4, 4] : [2, 2, 2]; // Doubled from [2, 2, 2] : [1, 1, 1]
  return <primitive object={scene} scale={scale} position={[0, -1.5, 0]} onClick={onClick} />; // Lowered by setting y to -1
};

const Livre = () => {
  const [isInView, setIsInView] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const sectionRef = useRef(null);

  const text =
    "Je suis l’autrice d’un roman illustré mêlant fiction et réalité, retranscrivant les souvenirs de seniors dans une histoire romancée pour préserver leur mémoire et toucher un large public, tout en respectant leurs témoignages. Le livre suit Raphaël ONEIROI, un psychologue atteint d’achromatopsie, qui ne voit qu’en nuances de gris. Il aide des couples de seniors – les LAMY, craignant la solitude, les CAILLEUX, anticipant la dépendance, et les ZANELLA-VIVÉS, ennuyés par leur retraite – grâce à un don surnaturel. Ce pouvoir lui permet de plonger dans leurs souvenirs, qu’il perçoit en monochrome selon l’émotion associée. Accompagnez Raphaël dans sa quête pour apporter de la couleur à son monde, et découvrez comment son aptitude pourrait être perçue si elle était révélée.";

  const words = text.split(' ');
  const anneBackText = "- Anne Back";
  const anneBackWords = anneBackText.split(' ');

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
      className=" w-full bg-white flex flex-col items-center justify-center relative overflow-hidden"
    >

<h1
          className="absolute top-6 text-3xl font-bold text-black z-10 uppercase"
          style={{ fontWeight: 400 }}
        >
          Le Livre
        </h1>
      {/* Main Content Container */}
      <div className="relative w-full max-w-[90vw] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 ">
        {/* Left Side: 3D Book */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 7], fov: 50, near: 0.1 }}>
            <ambientLight intensity={2.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Book isLarge={isLarge} onClick={handleBookClick} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={1.0}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 2.5}
            />
          </Canvas>
        </div>

        {/* Right Side: Text and Audio Demo */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-0">
          {/* Book Description with Animation */}
          <div className="text-black relative w-full">
            <h2
              className="absolute top-0 left-0 text-lg sm:text-xl md:text-2xl font-bold text-black z-10 uppercase"
              style={{ fontWeight: 400 }}
            >
              À propos de Monochromes
            </h2>
            <motion.div
              style={{ fontFamily: "'Bodoni Moda', serif" }}
              className="text-sm sm:text-base md:text-lg leading-relaxed text-black mt-10 md:mt-12"
            >
              {/* Main text */}
              <motion.div className="text-justify text-black">
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: 'blur(5px)' }}
                    animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.8,
                      ease: 'easeOut',
                    }}
                    style={{ display: 'inline-block', marginRight: '0.25rem' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>

              {/* Signature */}
              <motion.div
                className="mt-4 md:mt-6 text-right italic text-black"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {anneBackWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: 'blur(5px)' }}
                    animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
                    transition={{
                      delay: words.length * 0.05 + index * 0.1,
                      duration: 0.8,
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
          <div className="mt-6 md:mt-8 w-full">
            <h3
              className="text-base sm:text-lg md:text-xl font-medium mb-2 text-center"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Demo Audible
            </h3>
            <audio controls className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              <source
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center">
              Démo Audible interprétée par Florian LAUBERTE
            </p>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        /* Base styles */
        section {
          padding: 2rem 0;
        }

        /* Responsive Adjustments */
        @media (max-width: 640px) {
          .h-screen {
            height: 40vh; /* Adjusted for larger book on mobile */
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .mt-10 {
            margin-top: 2rem;
          }
          .gap-6 {
            gap: 1.5rem;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .h-screen {
            height: 50vh; /* Medium height for tablets */
          }
          .text-base {
            font-size: 1rem;
          }
        }

        @media (min-width: 769px) {
          .h-screen {
            height: 70vh; /* Larger height for desktop */
          }
        }

        /* Ensure canvas stays contained */
        canvas {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </section>
  );
};

export default Livre;