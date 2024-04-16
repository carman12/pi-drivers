import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchDriver } from "../../redux/action/index";
import '../Searchbar/search.css';

export default function SearchBar({ onSearch }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchDriver(input));

    // Que no se pueda enviar vacío el campo de búsqueda
    if (input.trim() === "") {
      alert("Please write a driver name");
      return;
    }
  };

  // Si el campo de búsqueda está vacío, traer todas las tarjetas
  useEffect(() => {
    if (input.trim() === "") {
      dispatch(searchDriver(""));
    }
  }, [input, dispatch]);

  return (
    <div className="center-container">
      <form onSubmit={handleSubmit} className='search'>
        <div className='inputbox'>
          <input
            type="search"
            onChange={handleChange}
            placeholder='Write a driver name here!'
          />
        <button
          className='button1'
          onClick={handleSubmit}
          type="submit"
        >
          Search
        </button>
        </div>
      </form>
    </div>
  );
}
