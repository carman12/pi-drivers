import { useState, useEffect } from "react";
import validate from "./validate";
import axios from "axios";
import teamIDs from "./teamIDs";
import "../Form/form.css";

function FormDriver() {
  const [driver, setDriver] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teamID: [],
  });
  console.log("auc: ",driver);
  const [error, setError] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    message: "",
  });

  const [selectedteamIDs, setSelectedteamIDs] = useState(""); // Nuevo estado para almacenar los países seleccionados como una cadena

  const [isFormTouched, setIsFormTouched] = useState(false);

//   useEffect(() => {
//     // Validar solo cuando el formulario ha sido tocado
//     if (isFormTouched) {
//       validate(driver, error, setError);
//     }
//   }, [driver, error, isFormTouched]);

  const handleChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    // // Modificar el manejo de equipos para enviar IDs en lugar de nombres
    // if (property === "teamID") {
    //     const selectedOptions = event.target.selectedOptions;
    //     value = Array.from(selectedOptions, option => option.value);
    // }

    setDriver({ ...driver, [property]: value });
    setIsFormTouched(true);
  };

  const handleTeamSelection = (event) => {
    const selectedteamID = event.target.value;
    if (!driver.teamID.includes(selectedteamID)) { // Verifica si el equipo ya está seleccionado
      setSelectedteamIDs((prevIDs) => `${prevIDs} ${selectedteamID}`); // Concatenar el ID seleccionado al estado selectedteamIDs
      setDriver({ ...driver, teamID: [...driver.teamID, selectedteamID] });
    } else {
      alert("Este equipo ya ha sido seleccionado."); // Muestra una alerta si el equipo ya está seleccionado
    }
  };

  const getSelectedTeamNames = () => {
    return selectedteamIDs
      .trim()
      .split(" ")
      .map((id) => {
        const team = teamIDOptions.find((team) => team.id === parseInt(id));
        return team ? team.name : ""; // Retorna el nombre del equipo si se encuentra, de lo contrario, una cadena vacía
      })
      .join(", "); // Une los nombres con coma y espacio
  };

  // const getSelectedTeamNames = () => {
  //   return .map((id) => {
  //     const team = teamIDOptions.find((team) => team.id === parseInt(id));
  //     return team ? team.name : ''; // Retorna el nombre del equipo si se encuentra, de lo contrario, una cadena vacía
  //   }).join(', '); // Une los nombres con coma y espacio
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    
  
    if (showEmptyFieldsAlert()) {
      return;
    }
  
    if (!validate(driver, error, setError)) {
      return;
    }
  
    console.log("Driver state before sending:", driver);
  
    try {
        const res = await axios.post("http://localhost:3001/drivers/postDriver", {
            ...driver
          });
  
      if (res.status === 200) {
        setError({
          ...error,
          forename: "",
          surname: "",
          description: "",
          image: "",
          nationality: "",
          dob: "",
          teamID: "",
          message: "¡Buen trabajo! ¡Creado!",
        });
        setDriver({
          forename: "",
          surname: "",
          description: "",
          image: "",
          nationality: "",
          dob: "",
          teamID: [],
        });
  
        setSelectedteamIDs(""); // Limpiar los países seleccionados después de enviar el formulario
        // Mostrar alerta y recargar la página
        alert("¡Conductor creado exitosamente!");
        console.log("aquivienes:", driver.teamID);
        window.location.reload();
      } else {
        console.error("Error creating driver");
        alert("Error al crear");
      }
    } catch (error) {
      console.error("Error creating driver2:", error);
      alert("Error al crear: " + error.message);
    }
  };
  const [teamIDOptions, setTeamsOptions] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const options = await teamIDs();
      setTeamsOptions(options);
    };

    fetchTeams();
  }, []);

  const showEmptyFieldsAlert = () => {
    const emptyFields = Object.keys(driver).filter((field) => {
      return (
        !driver[field] ||
        (Array.isArray(driver[field]) && driver[field].length === 0)
      );
    });

    if (emptyFields.length > 0) {
      alert(
        "Todos los campos son obligatorios. Por favor, completa todos los campos."
      );
      return true; // Indica que se mostró la alerta
    }

    return false; // Indica que no se mostró la alerta
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <h2 className="tracking-in-expand">CREATE YOUR DRIVER</h2>
        <div className="item">
          <label htmlFor="forename">Name </label>
          <input
            type="text"
            name="forename"
            value={driver.forename}
            onChange={handleChange}
          />
          <div>
            <span className="required">{error.forename}</span>
          </div>
        </div>
        <div className="item">
          <label htmlFor="surname">Last Name </label>
          <input
            type="text"
            name="surname"
            value={driver.surname}
            onChange={handleChange}
          />
          <div>
            <span className="required">{error.surname}</span>
          </div>
        </div>
        <div className="item">
          <label htmlFor="description">Description </label>
          <input
            type="text"
            name="description"
            value={driver.description}
            onChange={handleChange}
          />
          <div>
            <span className="required">{error.description}</span>
          </div>
        </div>
        <div className="item">
          <label htmlFor="image">URL image </label>
          <input
            type="text"
            name="image"
            value={driver.image}
            onChange={handleChange}
          />
          <div>
            <span className="required">{error.image}</span>
          </div>
        </div>
        <div className="item">
          <label htmlFor="nationality">Nationality </label>
          <input
            type="text"
            name="nationality"
            value={driver.nationality}
            onChange={handleChange}
          />
          <div>
            <span className="required">{error.nationality}</span>
          </div>
        </div>
        <div className="item">
          <label htmlFor="dob">Birth </label>
          <input
            type="date"
            name="dob"
            value={driver.dob}
            onChange={handleChange}
          />
          <div>
            <span className="required">{error.dob} </span>
          </div>
        </div>

   {/* Otros campos del formulario */}
   <div className="teams">
          <p>("*") Required fields</p>
          <p>Select countries using just one click</p>
          <label htmlFor="teamID">Teams</label>
          <select
            id="teamID"
            onChange={handleTeamSelection}
            value={selectedteamIDs.trim()} // Convertir la cadena de IDs de equipos seleccionados en un array y mostrar solo los IDs
            multiple
            style={{ height: "200px" }}
          >
            {teamIDOptions.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>

          <input className="inputForm"
            type="text"
            value={getSelectedTeamNames()} // Mostrar los nombres de equipos seleccionados en lugar de los IDs
            readOnly            
          />
        </div>

        <div>
          <span className="span-general"> {error.message}</span>
        </div>
        <div className="but">
          <button type="submit" className="button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormDriver;
