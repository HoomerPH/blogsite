import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Week1 from './pages/Week1'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/week1" element={<Week1 />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  )
}

export default App
