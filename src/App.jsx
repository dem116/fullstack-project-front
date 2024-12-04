import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home.jsx'
import List from './List.jsx'
import MenuCreate from './MenuCreate.jsx';
import './App.css';

function App() {

  return (
    <>
    <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<List />} />
            <Route path="/menu/create" element={<MenuCreate />} />
          </Routes>
    </Router>
    </>
  )
}

export default App;