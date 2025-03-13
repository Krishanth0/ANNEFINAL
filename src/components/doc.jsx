import { useState, useRef, useEffect } from 'react';
import PAINT from '../assets/PAINT.mp4';

export default function VideoPage() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progressPercent = (video.currentTime / video.duration) * 100 || 0;
      setProgress(progressPercent);
    };

    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', handleEnded);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((error) => console.error('Play error:', error));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressChange = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    const newTime = (newProgress / 100) * video.duration;
    video.currentTime = newTime;
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <section className="min-h-screen w-full bg-white flex flex-col items-center justify-start relative overflow-hidden">
      {/* Title - Always Visible */}
      <h1
        className="text-5xl md:text-7xl lg:text-9xl font-bold text-black uppercase py-6 text-center z-10"
        style={{ fontWeight: 400 }}
      >
        Monochromes
      </h1>

      {/* Video Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[80vw] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={PAINT}
          loop
          playsInline
        />

        {/* Hover Overlay - Bottom Left */}
        <div
          className={`absolute bottom-10 p-4 sm:p-6 transition-opacity duration-500 ease-in-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2
            className="text-white text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2 sm:mb-4"
            style={{ fontWeight: 400, textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
          >
            Penser un livre selon Anne BACK
          </h2>
          <p className="text-white text-sm sm:text-lg md:text-xl font-light uppercase max-w-xs sm:max-w-md">
            {/* Placeholder description */}
          </p>
        </div>

        {/* Video Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            {/* Progress Bar with Title */}
            <div className="w-full relative">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-gray-400 rounded-full appearance-none cursor-pointer focus:outline-none"
                style={{ background: `linear-gradient(to right, #fff ${progress}%, #666 ${progress}%)` }}
              />
              
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={togglePlay}
                className="p-1 sm:p-2 text-white bg-white/20 hover:bg-white/40 rounded-full transition-all duration-300 focus:outline-none"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button
                onClick={toggleMute}
                className="p-1 sm:p-2 text-white bg-white/20 hover:bg-white/40 rounded-full transition-all duration-300 focus:outline-none"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-24 h-1 bg-gray-400 rounded-full appearance-none cursor-pointer focus:outline-none"
                style={{ background: `linear-gradient(to right, #fff ${volume * 100}%, #666 ${volume * 100}%)` }}
              />
              <button
                onClick={toggleFullscreen}
                className="p-1 sm:p-2 text-white bg-white/20 hover:bg-white/40 rounded-full transition-all duration-300 focus:outline-none"
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16h3v3h2v-5H5v2zm8 0h3v2h-5v-5h2v3zm-8-9V5h5v2H7zm8 0h3v5h-2V7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        video {
          display: block;
        }

        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          background: #fff;
          border-radius: 50%;
          cursor: pointer;
          border: 1px solid #ccc;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
        }
        input[type='range']::-moz-range-thumb {
          width: 10px;
          height: 10px;
          background: #fff;
          border-radius: 50%;
          cursor: pointer;
          border: 1px solid #ccc;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

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
          .my-8 {
            margin-top: 4rem;
            margin-bottom: 4rem;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          h1 {
            font-size: 4rem;
          }
          .max-w-\[80vw\] {
            height: 60vh;
          }
          .my-8 {
            margin-top: 5rem;
            margin-bottom: 5rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          h1 {
            font-size: 6rem;
          }
          .max-w-\[80vw\] {
            height: 70vh;
          }
          .my-8 {
            margin-top: 6rem;
            margin-bottom: 6rem;
          }
        }
      `}</style>
    </section>
  );
}