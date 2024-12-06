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
          <div className='buttons-menu'>
          <Link to="/items">
              <button>Shopping list</button>
          </Link>
          <Link to="/menu/create">
              <button>Edit or create menu</button>
          </Link>
          </div>
        {data.days && (
          <ul className='menu-cotainer'>
            {data.days.map((day) => (
                <div className='menuBox'>
              <li key={day.day} className='menu-element'>
                <h3>{day.day.charAt(0).toUpperCase() + day.day.slice(1)}</h3>
                <p>Breakfast: {day.breakfast?.meal || 'You have not added a meal yet'}</p>
                <p>Lunch: {day.lunch?.meal || 'You have not added a meal yet'}</p>
                <p>Dinner: {day.dinner?.meal || 'You have not added a meal yet'}</p>
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