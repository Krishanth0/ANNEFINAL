import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Mentions = () => {
  const [codeInput, setCodeInput] = useState('');
  const [error, setError] = useState('');
  const [hasStartedScratching, setHasStartedScratching] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const correctCode = 'CLAUDE';
  const linkUrl = 'https://online.fliphtml5.com/sofsy/kato/#p=1';

  const descriptionText =
    "ANNE BACK est un projet universitaire créé par des étudiants en troisième année de MMI (Métiers du Multimédia et de l’Internet) à l’Université Paris-Est Créteil (UPEC). Ce projet reflète notre apprentissage et notre créativité dans le cadre de notre formation.";
  const teamText = "MARQUES DA SILVA Alexandre\nPERRET Nathaël\nSUNDARAMOORTHY Krishanth\nROUZAUD Clément\nPOTIER Bastien\nTROUSELET Antoine";
  const thanksText =
    "Un immense merci aux seniors qui ont généreusement partagé leurs souvenirs. Votre authenticité et votre bienveillance ont été essentielles à la réalisation de ce projet.\n\n" +
    "Nous remercions chaleureusement :\n" +
    "L'IUT Sénart-Fontainebleau, pour le prêt du matériel nécessaire au tournage.\n" +
    "L’Institut national supérieur du professorat et de l’éducation, pour nous avoir ouvert ses portes.\n" +
    "La communauté d’agglomération Val d’Yerres Val de Seine, pour l’autorisation de tournage dans ses communes.\n" +
    "La médiathèque de Montgeron, pour son accueil.\n" +
    "Le marché de Combs-la-Ville, pour nous avoir permis de filmer en son sein.\n" +
    "Le café Flo’zinha, pour son hospitalité.\n\n" +
    "Et enfin, un grand merci à toutes les personnes qui, de près ou de loin, ont contribué à la concrétisation de ce documentaire.";
  const gameText = "Grattez ici pour révéler une surprise !";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      const width = window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 350 : 400;
      canvas.width = width;
      canvas.height = window.innerWidth < 640 ? 80 : 100;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const handleScratchStart = (e) => {
    setIsScratching(true);
    setHasStartedScratching(true);
    handleScratchMove(e);
  };

  const handleScratchMove = (e) => {
    if (!isScratching) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, false);
    ctx.fill();
  };

  const handleScratchEnd = () => {
    setIsScratching(false);
  };

  const handleCodeSubmit = () => {
    if (codeInput.toUpperCase() === correctCode) {
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
      setError('');
      setCodeInput('');
    } else {
      setError('Code incorrect. Essayez encore !');
    }
  };

  const handleBackClick = () => {
    navigate('/'); // Navigate back to the main page
  };

  return (
    <section className="min-h-screen w-full bg-white flex items-start justify-start py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="w-full max-w-4xl flex flex-col space-y-8 mt-8">
        {/* Title */}
        <h1
          className="text-7xl font-normal text-black uppercase"
          style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 400 }}
        >
          MENTIONS LÉGALES
        </h1>

        {/* Project Description */}
        <div
          className="text-base sm:text-lg text-black"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          {descriptionText}
        </div>

        {/* Team Members */}
        <div>
          <h2
            className="text-4xl font-normal text-black uppercase mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 400 }}
          >
            Équipe
          </h2>
          <div
            className="text-base sm:text-lg text-black"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {teamText.split('\n').map((line, index) => (
              <div key={index} className="mb-2">{line}</div>
            ))}
          </div>
        </div>

        {/* Acknowledgments */}
        <div>
          <h2
            className="text-4xl font-normal text-black uppercase mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 400 }}
          >
            Remerciements
          </h2>
          <div
            className="text-base sm:text-lg text-black"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {thanksText.split('\n').map((line, index) => (
              <div key={index} className={line.length === 0 ? 'mb-4' : 'mb-2'}>
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Scratch Game */}
        <div>
          <div
            className="text-base sm:text-lg text-black"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {gameText}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full max-w-[400px] h-[80px] sm:h-[100px] border-2 border-black rounded-md">
              <div
                className="absolute inset-0 flex items-center justify-center text-black text-xl sm:text-2xl font-bold"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                CLAUDE
              </div>
              <canvas
                ref={canvasRef}
                onMouseDown={handleScratchStart}
                onMouseMove={handleScratchMove}
                onMouseUp={handleScratchEnd}
                onMouseLeave={handleScratchEnd}
                className="absolute inset-0 cursor-pointer w-full h-full"
              />
            </div>
            {hasStartedScratching && (
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Entrez le code"
                  className="px-4 py-2 text-black border border-gray-300 rounded-md w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  onClick={handleCodeSubmit}
                  className="px-6 py-2 text-black uppercase border-2 border-black rounded-md hover:bg-black hover:text-white transition-all duration-300"
                >
                  Valider
                </button>
              </div>
            )}
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
      </div>

      {/* Back Button at Bottom Right */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <button
          className="group relative text-sm sm:text-base md:text-lg text-black uppercase tracking-wide focus:outline-none"
          onClick={handleBackClick}
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          Retour
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </button>
      </div>
    </section>
  );
};

export default Mentions;