import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Week1 from './pages/Week1'
import Week2 from './pages/Week2'
import Week3 from './pages/Week3'
import Week4 from './pages/Week4'
import Week5 from './pages/Week5'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/week1" element={<Week1 />} />
            <Route path="/week2" element={<Week2 />} />
            <Route path="/week3" element={<Week3 />} />
            <Route path="/week4" element={<Week4 />} />
            <Route path="/week5" element={<Week5 />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  )
}

export default App
