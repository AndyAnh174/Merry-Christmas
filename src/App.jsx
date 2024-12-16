import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Banner from './components/Banner/Banner'
import Countdown from './components/Countdown/Countdown'
import CardPage from './pages/CardPage'
import FramePage from './pages/FramePage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
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
        </Routes>
      </div>
    </Router>
  )
}

export default App