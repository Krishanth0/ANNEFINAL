  import React, { useState, useRef, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import bg from '../assets/michel.png';
  import bg2 from '../assets/blue6.png';
  import bg3 from '../assets/hug.png';
  import audio1 from '../assets/Balenciaga.mp3'; // Example audio files
  import audio2 from '../assets/Balenciaga.mp3';
  import audio3 from '../assets/Balenciaga.mp3';

  const slides = [
    {
      image: bg,
      text: "MICHEL & ODILE",
      details: {
        title: "Michel & Odile CAILLEUX",
        description:
          "« On a vécu heureux. Mais c’est maintenant qu’on se rend compte qu’on a été heureux. »\n" +
          "Alors qu’ils étaient tous deux invités lors d’un mariage d’une de leurs connaissances en commun, " +
          "ils s’y sont rencontrés et ont fait connaissance alors qu’Odile était âgée de 16 ans et que Michel " +
          "avait lui 17 ans. Née d’une coïncidence marquante et inoubliable, cette première rencontre marque " +
          "alors le début de leur histoire d’amour. Lorsqu’ils avaient 22 ans, ils achetèrent leur premier " +
          "appartement ensemble symbolisant ainsi leur passage à l’âge adulte, l’indépendance et leur " +
          "volonté de construire une vie ensemble. Leurs souvenirs marquants furent sans doute leurs " +
          "vacances mémorables avec leurs 8 petits-enfants. Ces moments montrent leur engagement envers " +
          "la famille et la joie partagée malgré les contraintes qu’une famille nombreuse peut rencontrer. À " +
          "leurs 42 ans, ils déménagèrent dans un lieu plus grand : un pavillon. Y vivant encore aujourd’hui " +
          "alors qu’ils sont âgés de 80 et 81 ans, ils vivent heureux.",
        audio: audio1,
      },
    },
    {
      image: bg2,
      text: "CHRISTIAN & MARIE-PAULE",
      details: {
        title: "Christian et Marie-Paule LAMY",
        description:
          "« Puisque vous voulez tout savoir, vous allez tout savoir. »\n" +
          "Tous deux veufs, Huguette et Francis se sont rencontrés lorsqu’ils avaient respectivement 78 ans et " +
          "79 ans lors d’un bal pour seniors. Tandis qu’elle se disait ne pas vouloir se remettre en couple et " +
          "bien qu’elle se fit mise en garde du côté dragueur de Francis, ils se sont mis à se voir plus " +
          "régulièrement depuis cette première rencontre. Ne voulant se remarier dû à la perte douloureuse de " +
          "leurs conjoints respectifs alors qu’il était assez dragueur et romantique, ils se mirent en couple afin " +
          "de pouvoir compter sur le support de l’un vers l’autre. Étant tous les deux des passionnés de " +
          "voyages, ils voyagèrent à bord d’un paquebot lors de plusieurs croisières. Afin de toujours avoir des " +
          "liens sociaux, ils font souvent des sorties dans des clubs de seniors pour s’amuser et jouer aux cartes " +
          "avec des amis. À l’aube de leurs 93 et 95 ans, ils sont toujours propriétaires d’un pavillon acquis " +
          "plusieurs années plus tôt et ont ainsi gardé une certaine indépendance malgré leurs grands âges.",
        audio: audio2,
      },
    },
    {
      image: bg3,
      text: "FRANCIS & HUGETTE",
      details: {
        title: "FRANCIS VIVÉS & HUGETTE ZANELLA",
        description:
          "« Puisque vous voulez tout savoir, vous allez tout savoir. »\n" +
          "Tous deux veufs, Huguette et Francis se sont rencontrés lorsqu’ils avaient respectivement 78 ans et " +
          "79 ans lors d’un bal pour seniors. Tandis qu’elle se disait ne pas vouloir se remettre en couple et " +
          "bien qu’elle se fit mise en garde du côté dragueur de Francis, ils se sont mis à se voir plus " +
          "régulièrement depuis cette première rencontre. Ne voulant se remarier dû à la perte douloureuse de " +
          "leurs conjoints respectifs alors qu’il était assez dragueur et romantique, ils se mirent en couple afin " +
          "de pouvoir compter sur le support de l’un vers l’autre. Étant tous les deux des passionnés de " +
          "voyages, ils voyagèrent à bord d’un paquebot lors de plusieurs croisières. Afin de toujours avoir des " +
          "liens sociaux, ils font souvent des sorties dans des clubs de seniors pour s’amuser et jouer aux cartes " +
          "avec des amis. À l’aube de leurs 93 et 95 ans, ils sont toujours propriétaires d’un pavillon acquis " +
          "plusieurs années plus tôt et ont ainsi gardé une certaine indépendance malgré leurs grands âges.",
        audio: audio3,
      },
    },
  ];

  export default function MO() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [detailedView, setDetailedView] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // Volume range: 0 to 1
    const [progress, setProgress] = useState(0); // Progress in percentage
    const audioRef = useRef(new Audio(slides[0].details.audio));

    // Update audio source when slide changes
    useEffect(() => {
      const audio = audioRef.current;
      audio.src = slides[currentSlide].details.audio;
      audio.load();
      audio.volume = volume;
      setIsPlaying(false);
      setProgress(0);

      const updateProgress = () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100 || 0;
        setProgress(progressPercent);
      };

      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
      };
    }, [currentSlide, volume]);

    const handleEnSavoirPlusClick = () => {
      if (isTransitioning) return;
      setDetailedView(true);
      setIsPlaying(false);
      setProgress(0);
    };

    const handleBackClick = () => {
      if (isTransitioning) return;
      setDetailedView(false);
      audioRef.current.pause();
      setIsPlaying(false);
    };

    const nextSlide = () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      audioRef.current.pause();
      setIsPlaying(false);
      setProgress(0);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    };

    const prevSlide = () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      audioRef.current.pause();
      setIsPlaying(false);
      setProgress(0);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsTransitioning(false);
      }, 500);
    };

    const handleSlideChange = (index) => {
      if (isTransitioning || currentSlide === index) return;
      setIsTransitioning(true);
      audioRef.current.pause();
      setIsPlaying(false);
      setProgress(0);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
        setDetailedView(false);
      }, 500);
    };

    const toggleAudio = () => {
      const audio = audioRef.current;
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => console.error("Audio playback failed:", error));
      }
      setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
    };

    const handleProgressChange = (e) => {
      const newProgress = parseFloat(e.target.value);
      setProgress(newProgress);
      const audio = audioRef.current;
      const newTime = (newProgress / 100) * audio.duration;
      audio.currentTime = newTime || 0;
    };

    // Parse description to highlight text within « » with slide-specific colors
    const renderDescription = (description, slideIndex) => {
      const parts = description.split(/(«[^»]*»)/g); // Split by « » while keeping the delimiters
      const quoteColor = [
        'text-red-500', // Michel & Odile - Red
        'text-teal-500', // Christian & Marie-Paule - Teal (greenish-blue)
        'text-purple-500', // Francis & Huguette - Purple
      ][slideIndex];

      return parts.map((part, index) => {
        if (part.startsWith('«') && part.endsWith('»')) {
          return (
            <span
              key={index}
              className={`text-xl font-bold ${quoteColor} italic`}
            >
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      });
    };

    // Fade animation variants for slides
    const fadeVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
      exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    };

    return (
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-white">
        <h1
          className="absolute top-6 text-3xl font-bold text-black z-10 uppercase"
          style={{ fontWeight: 400 }}
        >
          Les Seniors
        </h1>

        {/* Slider Container */}
        <div className="w-4/5 h-4/5 relative">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center absolute inset-0"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Bottom content */}
              {!detailedView && (
                <motion.div
                  className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1
                    className="text-4xl text-white bg-black/50 p-4 rounded-lg uppercase"
                    style={{ fontWeight: 400 }}
                  >
                    {slides[currentSlide].text}
                  </h1>
                  <button
                    onClick={handleEnSavoirPlusClick}
                    className="mt-4 px-6 py-2 text-white uppercase border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
                  >
                    En savoir plus
                  </button>
                </motion.div>
              )}

              {/* Slide selectors */}
              {!detailedView && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlideChange(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index ? 'bg-white scale-125' : 'bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Navigation Arrows */}
              {!detailedView && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-5xl z-10 hover:text-gray-300 transition-colors duration-300"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-5xl z-10 hover:text-gray-300 transition-colors duration-300"
                  >
                    ›
                  </button>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Detailed View */}
          <AnimatePresence>
            {detailedView && (
              <motion.div
                className="absolute inset-0 w-full h-full bg-cover bg-center flex z-20"
                style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div
                  className="w-3/5 h-full flex flex-col justify-center p-16 bg-gradient-to-r from-black/80 to-transparent shadow-lg relative" // Added relative positioning
                  variants={fadeVariants}
                >
                  <h1
                    className="text-5xl font-serif text-white mb-6 uppercase tracking-wide"
                    style={{ fontWeight: 400, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                  >
                    {slides[currentSlide].details.title}
                  </h1>
                  <p className="text-lg text-gray-200 mb-8 leading-relaxed font-light whitespace-pre-wrap">
                    {renderDescription(slides[currentSlide].details.description, currentSlide)}
                  </p>
                  {/* Audio Player UI */}
                  <div className="space-y-3 mb-6"> {/* Reduced space-y-6 to space-y-3 */}
                    <h3 className="text-lg font-serif text-white font-medium">Extrait de l'entretien :</h3> {/* Changed to font-serif */}
                    <div className="flex items-center space-x-3"> {/* Reduced space-x-4 to space-x-3 */}
                      <button
                        onClick={toggleAudio}
                        className="px-3 py-1 text-white uppercase bg-white/20 hover:bg-white/40 rounded-full border border-white/50 transition-all duration-300 text-xs font-medium" // Reduced size
                      >
                        {isPlaying ? 'Pause' : 'Play'}
                      </button>
                    </div>
                    {/* Timeline Bar */}
                    <div className="w-full">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                        className="w-full h-1 bg-gray-300 rounded-full appearance-none cursor-pointer" // Reduced height to h-1
                        style={{
                          background: `linear-gradient(to right, #fff ${progress}%, #888 ${progress}%)`,
                        }}
                      />
                    </div>
                    {/* Volume Slider */}
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-xs">Volume:</span> {/* Reduced text-sm to text-xs */}
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-gray-300 rounded-full appearance-none cursor-pointer" // Reduced w-24 to w-20 and h-2 to h-1
                        style={{
                          background: `linear-gradient(to right, #fff ${volume * 100}%, #888 ${volume * 100}%)`,
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleBackClick}
                    className="absolute bottom-4 right-4 px-4 py-1 text-white uppercase bg-white/20 hover:bg-white/40 rounded-full border border-white/50 transition-all duration-300 text-xs font-medium" // Positioned bottom-right, reduced size
                  >
                    Retour
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Audio Element (Hidden) */}
        <audio ref={audioRef} />

        {/* CSS */}
        <style jsx>{`
          section {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 10px; /* Reduced from 12px */
            height: 10px; /* Reduced from 12px */
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
            border: 1px solid #ccc;
          }
          input[type='range']::-moz-range-thumb {
            width: 10px; /* Reduced from 12px */
            height: 10px; /* Reduced from 12px */
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
            border: 1px solid #ccc;
          }
        `}</style>
      </section>
    );
  }