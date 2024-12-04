import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

const List = () => {
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
      <h1>Shopping List</h1>
      <Link to="/">
              <button>Go to meal planner</button>
            </Link>
      {listData === null ? (
        <p>Loading shopping list...</p>
      ) : listData.length === 0 ? (
        <p>Nothing to buy! The shopping list is empty</p>
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

export default List;
