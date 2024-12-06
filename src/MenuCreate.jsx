import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const MenuCreate = () => {
  const [menu, setMenu] = useState([
    { day: "monday", breakfast: "", lunch: "", dinner: "" },
    { day: "tuesday", breakfast: "", lunch: "", dinner: "" },
    { day: "wednesday", breakfast: "", lunch: "", dinner: "" },
    { day: "thursday", breakfast: "", lunch: "", dinner: "" },
    { day: "friday", breakfast: "", lunch: "", dinner: "" },
    { day: "saturday", breakfast: "", lunch: "", dinner: "" },
    { day: "sunday", breakfast: "", lunch: "", dinner: "" },
  ]);

  const [responseMessage, setResponseMessage] = useState('');

  const urlAPICreateMenu = import.meta.env.VITE_APP_API_URL_CREATEMENU;
  const urlAPIGetMenu = import.meta.env.VITE_APP_API_URL;

  const fetchMenu = async () => {
    try {
      const response = await fetch(urlAPIGetMenu);
      if (response.ok) {
        const data = await response.json();
        const updatedMenu = menu.map((day) => {
          const savedDay = data.days.find((d) => d.day === day.day);
          return {
            ...day,
            breakfast: savedDay?.breakfast?.meal || "",
            lunch: savedDay?.lunch?.meal || "",
            dinner: savedDay?.dinner?.meal || "",
          };
        });
        setMenu(updatedMenu);
      } else {
        console.error("Failed to fetch the menu");
      }
    } catch (error) {
      console.error("Error fetching the menu:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      days: menu.map((day) => ({
        day: day.day,
        breakfast: { meal: day.breakfast },
        lunch: { meal: day.lunch },
        dinner: { meal: day.dinner },
      })),
    };

    try {
      const response = await fetch(urlAPICreateMenu, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setResponseMessage('Menu saved!');
      } else {
        const errorData = await response.json();
        setResponseMessage(`Error, can not save menu: ${errorData} `);
      }
    } catch (error) {
      console.error("Error saving the menu:", error);
    }
  };

  const handleInputChange = (e, index, meal) => {
    const newMenu = [...menu];
    newMenu[index][meal] = e.target.value;
    setMenu(newMenu);
  };

  const handleReset = async () => {
    try {
      const response = await fetch(urlAPIGetMenu + "/reset", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dias: [] }),
      });
  
      if (response.ok) {
        setMenu([
          { day: "monday", breakfast: "", lunch: "", dinner: "" },
          { day: "tuesday", breakfast: "", lunch: "", dinner: "" },
          { day: "wednesday", breakfast: "", lunch: "", dinner: "" },
          { day: "thursday", breakfast: "", lunch: "", dinner: "" },
          { day: "friday", dbreakfast: "", lunch: "", dinner: "" },
          { day: "saturday", breakfast: "", lunch: "", dinner: "" },
          { day: "sunday", breakfast: "", lunch: "", dinner: "" },
        ]);
        setResponseMessage("Menu reset successfully");
      } else {
        const errorData = await response.json();
        setResponseMessage(`Error resetting menu: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error resetting the menu:", error);
      setResponseMessage("Error resetting the menu");
    }
  };
  
  return (
    <>
      <h2>Edit or create week menu</h2>
      <Link to="/">
        <button>Go back</button>
      </Link>
      <button type="button" onClick={() => handleReset()}>Reset</button>
      <div className="container-menu-create">
      <form onSubmit={handleSubmit}>
        {menu.map((day, index) => (
          <div key={day.day}>
            <h3>{day.day.charAt(0).toUpperCase() + day.day.slice(1)}</h3>
            <input
              type="text"
              placeholder="Add Breakfast"
              value={day.breakfast}
              onChange={(e) => handleInputChange(e, index, "breakfast")}
            />
            <input
              type="text"
              placeholder="Add Lunch"
              value={day.lunch}
              onChange={(e) => handleInputChange(e, index, "lunch")}
            />
            <input
              type="text"
              placeholder="Add Dinner"
              value={day.dinner}
              onChange={(e) => handleInputChange(e, index, "dinner")}
            />
          </div>
        ))}
        <button type="submit">Save menu</button>
      </form>
      <p>{responseMessage}</p>
      </div>
    </>
  );
};

export default MenuCreate;