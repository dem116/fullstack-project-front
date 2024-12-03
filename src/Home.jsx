import {Link} from 'react-router-dom'

const Home = ({ data }) => {
    return (
      <>
        <h1>Mi menu semanal</h1>
        <Link to="/items">
              <button>Ir a la lista de compra</button>
            </Link>
        {data.dias && (
          <ul>
            {data.dias.map((dia) => (
              <li key={dia.dia}>
                <h3>{dia.dia.charAt(0).toUpperCase() + dia.dia.slice(1)}</h3>
                <p>Desayuno: {dia.desayuno?.comida || 'No definido'}</p>
                <p>Almuerzo: {dia.almuerzo?.comida || 'No definido'}</p>
                <p>Cena: {dia.cena?.comida || 'No definido'}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };
  
  export default Home;