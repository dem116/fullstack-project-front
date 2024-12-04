import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
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
        {data === null 
        ? (<div>Loading...</div>) 
        : 
        <div>
        <h1>Weekly Meal Planner</h1>
          <Link to="/items">
              <button>Shopping list</button>
          </Link>
          <Link to="/menu/create">
              <button>Edit or create menu</button>
          </Link>
        {data.dias && (
          <ul>
            {data.dias.map((dia) => (
                <div className='menuBox'>
              <li key={dia.dia}>
                <h3>{dia.dia.charAt(0).toUpperCase() + dia.dia.slice(1)}</h3>
                <p>Breakfast: {dia.desayuno?.comida || 'You have not added a meal yet'}</p>
                <p>Lunch: {dia.almuerzo?.comida || 'You have not added a meal yet'}</p>
                <p>Dinner: {dia.cena?.comida || 'You have not added a meal yet'}</p>
              </li>
              </div>
            ))}
          </ul>
        )}
        </div>
        }
      </>
    );
  };
  
  export default Home;