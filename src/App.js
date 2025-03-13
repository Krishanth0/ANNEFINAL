import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Histoires from './components/Histoires';
import Vr from './components/Vr';
import Footer from './components/footer'; // Ensure correct casing
import Doc from './components/doc';
import Carte from './components/carte';
import Livre from './components/Livre';
import Mentions from './components/mentions'; // Ensure correct casing

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleStart = () => {
    setShowWelcome(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Route */}
        <Route
          path="/"
          element={
            <>
              {showWelcome ? (
                <Welcome onStart={handleStart} />
              ) : (
                <>
                  <Doc />
                  <Livre />
                  <Histoires />
                  <Carte />
                  <Vr />
                  <Footer />
                </>
              )}
            </>
          }
        />
        {/* Mentions Route */}
        <Route path="/mentions" element={<Mentions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;