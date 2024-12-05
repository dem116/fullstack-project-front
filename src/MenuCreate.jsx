import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const MenuCreate = () => {
  const [menu, setMenu] = useState([
    { dia: "lunes", desayuno: "", almuerzo: "", cena: "" },
    { dia: "martes", desayuno: "", almuerzo: "", cena: "" },
    { dia: "miércoles", desayuno: "", almuerzo: "", cena: "" },
    { dia: "jueves", desayuno: "", almuerzo: "", cena: "" },
    { dia: "viernes", desayuno: "", almuerzo: "", cena: "" },
    { dia: "sábado", desayuno: "", almuerzo: "", cena: "" },
    { dia: "domingo", desayuno: "", almuerzo: "", cena: "" },
  ]);

  const [responseMessage, setResponseMessage] = useState('');

  const urlAPICreateMenu = import.meta.env.VITE_APP_API_URL_CREATEMENU;
  const urlAPIGetMenu = import.meta.env.VITE_APP_API_URL;


  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(urlAPIGetMenu);
        if (response.ok) {
          const data = await response.json();
          const updatedMenu = menu.map((day) => {
            const savedDay = data.dias.find((d) => d.dia === day.dia);
            return {
              ...day,
              desayuno: savedDay?.desayuno?.comida || "",
              almuerzo: savedDay?.almuerzo?.comida || "",
              cena: savedDay?.cena?.comida || "",
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

    fetchMenu();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      dias: menu.map((day) => ({
        dia: day.dia,
        desayuno: { comida: day.desayuno },
        almuerzo: { comida: day.almuerzo },
        cena: { comida: day.cena },
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
          { dia: "lunes", desayuno: "", almuerzo: "", cena: "" },
          { dia: "martes", desayuno: "", almuerzo: "", cena: "" },
          { dia: "miércoles", desayuno: "", almuerzo: "", cena: "" },
          { dia: "jueves", desayuno: "", almuerzo: "", cena: "" },
          { dia: "viernes", desayuno: "", almuerzo: "", cena: "" },
          { dia: "sábado", desayuno: "", almuerzo: "", cena: "" },
          { dia: "domingo", desayuno: "", almuerzo: "", cena: "" },
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
          <div key={day.dia}>
            <h3>{day.dia.charAt(0).toUpperCase() + day.dia.slice(1)}</h3>
            <input
              type="text"
              placeholder="Add Breakfast"
              value={day.desayuno}
              onChange={(e) => handleInputChange(e, index, "desayuno")}
            />
            <input
              type="text"
              placeholder="Add Lunch"
              value={day.almuerzo}
              onChange={(e) => handleInputChange(e, index, "almuerzo")}
            />
            <input
              type="text"
              placeholder="Add Dinner"
              value={day.cena}
              onChange={(e) => handleInputChange(e, index, "cena")}
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