import { useState, useEffect } from 'react';
import { ReactComponent as Signature } from '../assets/Signature.svg';
import inkSprite from '../assets/ink.png'; // Ink transition sprite

export default function Welcome({ onStart }) {
  const [fadeText, setFadeText] = useState(false);
  const [triggerInk, setTriggerInk] = useState(false);

  useEffect(() => {
    setTriggerInk(true); // Trigger ink animation on load

    const timer = setTimeout(() => {
      setFadeText(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    setTriggerInk(false);
    setTimeout(() => {
      setTriggerInk(true);
      onStart();
    }, 10); // Small delay to reset animation before triggering onStart
  };

  return (
    <>
      <section className="bg-white min-h-screen w-full flex items-center justify-center relative bg-cover bg-center overflow-hidden">
        {/* Ink Sprite Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            triggerInk ? 'ink-active' : ''
          }`}
          style={{
            backgroundImage: `url(${inkSprite})`,
            backgroundSize: '100% 100%',
            height: '100%',
            width: '4000%', // Assuming 40 frames
            left: '50%',
            transform: 'translateX(-1.25%)',
            zIndex: 5,
          }}
        ></div>

        {/* Signature SVG (3D Book) */}
        <div
          className={`welcome-container text-center relative z-10 transition-opacity duration-1000 ${
            fadeText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="svg-wrapper">
            <Signature className="w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] md:w-[40vw] md:h-[40vw] lg:w-[800px] lg:h-[800px] max-w-[900px] max-h-[900px] mx-auto" />
          </div>
        </div>

        {/* "Commencer" Button */}
        <div
          className={`absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${
            fadeText ? 'opacity-100' : 'opacity-0'
          } z-10`}
        >
          <button
            className="group relative text-sm sm:text-base md:text-lg text-black uppercase tracking-wide focus:outline-none"
            onClick={handleButtonClick}
          >
            Commencer
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
      </section>

      {/* CSS for Ink Sprite Animation and Responsiveness */}
      <style jsx>{`
        .ink-active {
          animation: ink-transition 2s steps(39) 0s forwards;
        }

        @keyframes ink-transition {
          0% {
            transform: translateX(-1.25%);
            opacity: 1;
          }
          99% {
            transform: translateX(-98.75%);
            opacity: 1;
          }
          100% {
            transform: translateX(-98.75%);
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .svg-wrapper {
            margin-top: 2rem; /* Add some top margin on mobile */
          }
          .text-sm {
            font-size: 0.875rem; /* Smaller button text */
          }
          .bottom-8 {
            bottom: 4rem; /* Higher button position on mobile */
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .svg-wrapper {
            margin-top: 1.5rem;
          }
          .text-base {
            font-size: 1rem;
          }
          .bottom-12 {
            bottom: 5rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .svg-wrapper {
            margin-top: 1rem;
          }
          .text-lg {
            font-size: 1.125rem;
          }
          .bottom-16 {
            bottom: 6rem;
          }
        }

        @media (min-width: 1025px) {
          .svg-wrapper {
            margin-top: 0;
          }
          .text-lg {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </>
  );
}