import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar'
import Banner from './components/Banner/Banner'
import Countdown from './components/Countdown/Countdown'
import CardPage from './pages/CardPage'
import FramePage from './pages/FramePage'
import SnowEffect from './components/Effects/SnowEffect'
import LoadingPage from './components/Loading/LoadingPage'
import AudioPlayer from './components/Audio/AudioPlayer'
import HistoryPage from './pages/HistoryPage'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);

  const handleStart = () => {
    setIsLoading(false);
    setAudioStarted(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <AnimatePresence>
          {isLoading ? (
            <LoadingPage onStart={handleStart} />
          ) : (
            <>
              <SnowEffect />
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={
                    <>
                      <Banner />
                      <Countdown />
                      <div className="container mx-auto px-4 py-20">
                        <div className="card bg-gradient-to-br from-christmas-red/5 to-christmas-green/5 shadow-xl">
                          <div className="card-body">
                            <h2 className="card-title font-christmas text-4xl text-christmas-red mb-4">Giới thiệu</h2>
                            <p className="text-xl">Chào mừng bạn đến với website Giáng sinh của chúng tôi! Nơi đây chúng tôi mang đến không khí Giáng sinh ấm áp và những điều bất ngờ thú vị.</p>
                          </div>
                        </div>
                      </div>
                    </>
                  } />
                  <Route path="/cards" element={<CardPage />} />
                  <Route path="/frames" element={<FramePage />} />
                  <Route path="/history" element={<HistoryPage />} />
                </Routes>
              </div>

              {/* Footer */}
              <footer className="bg-gradient-to-r from-christmas-red to-christmas-green py-4 text-white">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-center font-christmas text-xl">
                      🎄 Merry Christmas 2024 🎄
                    </p>
                    <p className="text-center text-sm opacity-90">
                      Developed with ❤️ by{' '}
                      <span className="font-semibold">AndyAnh - Quốc Anh - Minh Quân</span>
                    </p>
                    <p className="text-center text-xs opacity-75">
                      © {new Date().getFullYear()} All rights reserved
                    </p>
                  </div>
                </div>
              </footer>
            </>
          )}
        </AnimatePresence>
        {audioStarted && <AudioPlayer />}
      </div>
    </Router>
  )
}

export default App
