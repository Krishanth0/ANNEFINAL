import React, { useState } from 'react';
import bg1 from '../assets/DOOR.png'; // First background
import bg2 from '../assets/DOOR2.png'; // Second background
import inkSprite from '../assets/ink-transition-sprite.png'; // Ink transition sprite

function Vr() {
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  return (
    <>
          <div className="w-full h-[1px] bg-black mb-4"></div>

      <style>
        {`
          .ink-transition {
            background-size: 100% 100%;
            height: 100%;
            left: 50%;
            position: absolute;
            top: 0;
            transform: translateX(-1.25%);
            width: 4000%; /* 40 frames * 100% */
            z-index: 5;
            opacity: 1;
          }

          /* Forward animation when hovered */
          .ink-transition.is-active {
            animation: ink-transition-forward 2s steps(39) 0.5s forwards;
          }

          /* Reverse animation when not hovered */
          .ink-transition:not(.is-active) {
            animation: ink-transition-reverse 2s steps(39) 0s forwards;
          }

          @keyframes ink-transition-forward {
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

          @keyframes ink-transition-reverse {
            0% {
              transform: translateX(-98.75%);
              opacity: 0;
            }
            1% {
              opacity: 1; /* Ensure it becomes visible for reverse animation */
            }
            100% {
              transform: translateX(-1.25%);
              opacity: 1;
            }
          }

          /* Ensure the section is positioned correctly */
          .vr-section {
            overflow: hidden;
            position: relative;
          }

          /* Text color transition */
          .text-content {
            transition: color 0.5s ease-in-out;
          }

          /* Watercolor overlay transition */
          .watercolor-overlay {
            transition: opacity 1s ease-in-out;
          }

          /* Existing watercolor animation styles (assumed from your original code) */
          .watercolor-splash-1 {
            /* Add your watercolor splash styles here if needed */
          }
          .watercolor-splash-2 {
            /* Add your watercolor splash styles here if needed */
          }
          .watercolor-splash-3 {
            /* Add your watercolor splash styles here if needed */
          }
        `}
      </style>
      <section
        className="vr-section h-screen flex flex-col items-center justify-center relative bg-cover transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${isLinkHovered ? bg2 : bg1})` }}
      >
        {/* Ink Transition Overlay */}
        <div
          className={`ink-transition absolute inset-0 pointer-events-none ${
            isLinkHovered ? 'is-active' : ''
          }`}
          style={{
            backgroundImage: `url(${inkSprite})`,
          }}
        ></div>

        {/* Watercolor overlay */}
        <div
          className={`watercolor-overlay absolute inset-0 pointer-events-none ${
            isLinkHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute watercolor-splash-1 rounded-full mix-blend-overlay animate-watercolor-splash"></div>
          <div className="absolute watercolor-splash-2 rounded-full mix-blend-overlay animate-watercolor-splash-delay"></div>
          <div className="absolute watercolor-splash-3 rounded-full mix-blend-overlay animate-watercolor-splash"></div>
        </div>

        <div className={`text-content relative z-10 ${isLinkHovered ? 'text-white' : 'text-black'}`}>
          <h2
            className="text-xl md:text-2xl font-light uppercase"
            style={{ fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}
          >
            VIVEZ Experience
          </h2>
          <h1
            className="text-4xl md:text-8xl font-bold uppercase"
            style={{ fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}
          >
            MONOCHROMES
          </h1>
          <h2
            className="text-xl md:text-2xl font-light uppercase"
            style={{ fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}
          >
            En VR
          </h2>
        </div>

        <a
          href="https://store.steampowered.com/"
          className={`absolute bottom-[8rem] text-[16px] uppercase no-underline hover:no-underline transition-colors duration-500 ease-in-out z-10 ${
            isLinkHovered ? 'text-white' : 'text-black'
          }`}
          onMouseEnter={() => setIsLinkHovered(true)}
          onMouseLeave={() => setIsLinkHovered(false)}
        >
          En savoir plus
        </a>
      </section>
    </>
  );
}

export default Vr;