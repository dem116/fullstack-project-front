import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
  const [listData, setListData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [crossedItems, setCrossedItems] = useState([]); 

  const urlListAPI = import.meta.env.VITE_APP_API_URL_LIST;
  const urlListAPICREATE = import.meta.env.VITE_APP_API_URL_LISTCREATE;
  const urlListAPIDELETE = import.meta.env.VITE_APP_API_URL_LISTDELETE;

  const fetchListData = async () => {
    try {
      const response = await fetch(urlListAPI);
      const resData = await response.json();
      setListData(resData);
    } catch (error) {
      console.error('Error fetching list data:', error);
    }
  };

  useEffect(() => {
    fetchListData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const payload = { item: inputValue };

    try {
      const response = await fetch(urlListAPICREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setResponseMessage('Item added');
        setInputValue('');
        fetchListData();
      }
    } catch (error) {
      console.error('Error adding the item', error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Invalid ID:', id);
      return;
    }
    try {
      const response = await fetch(`${urlListAPIDELETE}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setListData((prevData) => prevData.filter((item) => item._id !== id));
        setResponseMessage('Item deleted');
      } else {
        console.error('Failed to delete the item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting the item:', error);
    }
  };

  const toggleCross = (id) => {
    setCrossedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <h1>Shopping List</h1>
      <Link to="/">
        <button>Go to meal planner</button>
      </Link>
      <div className="list-container">
        <form onSubmit={handleSubmit}>
          <input
            className="input-list"
            type="text"
            placeholder="I need..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="button-add-list">
            Add
          </button>
        </form>
        {listData === null ? (
          <p>Loading shopping list...</p>
        ) : listData.length === 0 ? (
          <p>Nothing to buy! The shopping list is empty</p>
        ) : (
          <ul>
            {listData.map((item) => (
              <li
                key={item._id}
                className={crossedItems.includes(item._id) ? 'crossed-out' : ''}
                onClick={() => toggleCross(item._id)}
              >
                {item.item}
                <button
                  type="button"
                  className="button-list"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item._id);
                  }}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        )}
        <p>{responseMessage}</p>
      </div>
    </>
  );
};

export default List;