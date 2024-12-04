import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home.jsx'
import List from './List.jsx'
import './App.css';

function App() {
  /* lo que estaba antes de componetizar:
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
  }, []);*/

  return (
    <>
    <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<List />} />
          </Routes>
    </Router>
    </>
  )
}

export default App;

/* lo que estaba arriba y tenia un div
   {data === null 
        ? (<div>cargando...</div>) 
        : 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Lista />} />
          </Routes>
        }
*/