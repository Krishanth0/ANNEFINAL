import React, { useState } from 'react';
import ballon from '../assets/balloon.png';
import house from '../assets/house.png';
import camera from '../assets/camera.png';
import zone from '../assets/zone.png';
import zone1 from '../assets/zone1.png';
import zone2 from '../assets/zone2.png';
import star from '../assets/star.png';

const MapPage = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Legend data with titles and specific images
  const legendCategories = [
    {
      title: "Points de rencontre",
      image: camera, // CAMERA next to "Points de rencontre"
    },
    {
      title: "EHPAD",
      image: star, // STAR next to "EHPAD"
    },
    {
      title: "Zones",
      image: zone2, // ZONE2 next to "Zones"
    },
    {
      title: "Résidences séniors",
      image: house, // HOUSE next to "Résidences séniors"
    },
    {
      title: "Contacts personnels",
      image: zone, // ZONE and ZONE1 handled below with additional logic
    },
    {
      title: "Associations",
      image: ballon, // BALLON next to "Associations"
    },
  ];

  const handlePointClick = (title) => {
    setSelectedPoint({ title, description: `Détails sur ${title}` });
  };

  return (
    <section className="min-h-screen w-full bg-white flex flex-col items-center justify-start relative overflow-hidden">
      {/* Title - Always Visible */}
      <h1
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-black uppercase py-6 text-center z-10"
        style={{ fontWeight: 400 }}
      >
        La Carte
      </h1>

      {/* Main Content Container */}
      <div className="relative w-full max-w-[80vw] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] mx-auto flex flex-col lg:flex-row">
        {/* Map Container */}
        <div className="w-full lg:w-3/4 h-full flex items-center justify-center relative z-10">
          <div className="w-full h-full bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1-YANc3FhyWO529iF795vRe3OINF0pGs&ehbc=2E312F"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.1) brightness(1.2) grayscale(30%)', borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Legend Section */}
        <div className="w-full lg:w-1/4 h-full flex items-start justify-start relative z-10 px-4 sm:px-6 lg:px-8 py-6">
          <div className="w-full h-full overflow-y-auto">
            <h2
              className="text-xl sm:text-xl md:text-2xl font-bold text-black mb-4 sm:mb-6"
              style={{ fontWeight: 400 }}
            >
              LÉGENDE
            </h2>
            {legendCategories.map((category, index) => (
              <div key={index} className="mb-4 sm:mb-6 flex items-center">
                <img
                  src={category.image}
                  alt={`${category.title} icon`}
                  className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3 rounded-md"
                />
                {/* Special case for "Contacts personnels" to add zone1 */}
                {category.title === "Contacts personnels" ? (
                  <div className="flex items-center">
                    <img
                      src={zone1}
                      alt="Zone 1 icon"
                      className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3 rounded-md"
                    />
                    <button
                      onClick={() => handlePointClick(category.title)}
                      className="text-base sm:text-lg md:text-xl font-medium text-black hover:text-gray-700 transition-colors duration-300 text-left"
                    >
                      {category.title}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePointClick(category.title)}
                    className="text-base sm:text-lg md:text-xl font-medium text-black hover:text-gray-700 transition-colors duration-300 text-left"
                  >
                    {category.title}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ink {
          0% { transform: scale(0.7) translate(-50%, -50%); opacity: 0.15; }
          50% { transform: scale(1.2) translate(-50%, -50%); opacity: 0.25; }
          100% { transform: scale(0.7) translate(-50%, -50%); opacity: 0.15; }
        }
        
        @keyframes ink-delay {
          0% { transform: scale(0.7) translate(50%, 50%); opacity: 0.15; }
          50% { transform: scale(1.3) translate(50%, 50%); opacity: 0.25; }
          100% { transform: scale(0.7) translate(50%, 50%); opacity: 0.15; }
        }

        .animate-ink {
          animation: ink 7s infinite ease-in-out;
        }

        .animate-ink-delay {
          animation: ink-delay 5s infinite ease-in-out;
        }

        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Responsive Adjustments */
        @media (max-width: 640px) {
          h1 {
            font-size: 2.5rem;
          }
          .max-w-\[80vw\] {
            height: 40vh;
          }
          .text-xl {
            font-size: 1rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          h1 {
            font-size: 4rem;
          }
          .max-w-\[80vw\] {
            height: 60vh;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          h1 {
            font-size: 6rem;
          }
          .max-w-\[80vw\] {
            height: 70vh;
          }
        }
      `}</style>
    </section>
  );
};

export default MapPage;