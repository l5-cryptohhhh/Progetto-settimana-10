import { Routes, Route } from 'react-router-dom'
import StarfieldCanvas from './assets/components/StarfieldCanvas'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import CityDetailPage from './pages/CityDetailPage'

function App() {
  return (
    <>
      <StarfieldCanvas />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cerca" element={<SearchPage />} />
        <Route path="/citta/:citySlug" element={<CityDetailPage />} />
      </Routes>
    </>
  )
}

export default App
