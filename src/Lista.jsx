import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

const Lista = () => {
  const [listData, setListData] = useState(null);
  const urlListAPI = import.meta.env.VITE_APP_API_URL_LIST;

  const fetchListData = async () => {
    try {
      const response = await fetch(urlListAPI);
      const resData = await response.json();
      setListData(resData);
    } catch (error) {
      console.error("Error fetching list data:", error);
    }
  };

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <>
      <h1>Lista de la compra</h1>
      <Link to="/">
              <button>Volver al menu semanal</button>
            </Link>
      {listData === null ? (
        <p>Cargando lista de la compra...</p>
      ) : listData.length === 0 ? (
        <p>No hay ítems en la lista de la compra.</p>
      ) : (
        <ul>
          {listData.map((item) => (
            <li key={item._id}>{item.item}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Lista;
