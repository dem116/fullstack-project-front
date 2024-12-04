import { useState } from "react";
import { Link } from 'react-router-dom';

const MenuCreate = () => {
  const [menu, setMenu] = useState([
    { dia: "lunes", desayuno: "", almuerzo: "", cena: "" },
    { dia: "martes", desayuno: "", almuerzo: "", cena: "" },
    { dia: "miercoles", desayuno: "", almuerzo: "", cena: "" },
    { dia: "jueves", desayuno: "", almuerzo: "", cena: "" },
    { dia: "viernes", desayuno: "", almuerzo: "", cena: "" },
    { dia: "sabado", desayuno: "", almuerzo: "", cena: "" },
    { dia: "domingo", desayuno: "", almuerzo: "", cena: "" },
    
  ]);

  const urlAPICreateMenu = import.meta.env.VITE_APP_API_URL_CREATEMENU;

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
        alert("Menu saved successfully");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
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

  return (
    <>
    <h2>Edit or create week menu</h2>
    <Link to="/">
        <button>Go back</button>
    </Link>
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
    </>
  );
};

export default MenuCreate;
