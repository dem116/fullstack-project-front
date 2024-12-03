import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home.jsx'
import Lista from './Lista.jsx'
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const urlAPI = import.meta.env.VITE_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(urlAPI);
      const resData = await response.json();

      setData(resData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    {console.log(data)}
    <Router>
      <div>
        {data === null 
        ? (<div>cargando...</div>) 
        : 
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/items" element={<Lista />} />
          </Routes>
        }
        
      </div>
    </Router>
    </>
  )
}

export default App;