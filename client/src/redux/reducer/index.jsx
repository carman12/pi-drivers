// Importa las acciones necesarias
import {
  FILTER,
  GET_ALL_DRIVERS,
  GET_DRIVER_DETAIL,
  GET_TEAMS,
  SEARCH_DRIVER,
  RESET,
  CLEAN_DETAIL,
  ORDER,
} from '../action/types';

// Estado inicial
let initialState = {
  drivers: [],
  driver: {},
  allTeams: [],
  driversFiltered: [],
  driversOrdered: [],
  filterType: "allDrivers", // Añade filterType al estado inicial
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DRIVERS:
      return {
        ...state,
        drivers: action.payload,
        driversFiltered: action.payload,
        driversOrdered: action.payload,
      };
    case SEARCH_DRIVER:
      return {
        ...state,
        drivers: [...action.payload],
      };
    case GET_TEAMS:
      return {
        ...state,
        allTeams: action.payload,
      };
      case ORDER:
        const orderedDrivers = applyOrder(state.driversFiltered, action.payload);
        const filteredOrderedDrivers = applyFilter(orderedDrivers, state.filterType);  // Cambiado el nombre aquí
        return {
          ...state,
          drivers: filteredOrderedDrivers,
          driversOrdered: orderedDrivers,
        };
  
      case FILTER:
        const updatedFilterType = action.payload;
        const filteredDrivers = applyFilter(state.driversOrdered, updatedFilterType);
        return {
          ...state,
          drivers: filteredDrivers,
          filterType: updatedFilterType,
        };
    case RESET:
      return {
        ...state,
        drivers: state.allDriversBackup,
      };
    case GET_DRIVER_DETAIL:
      return {
        ...state,
        driver: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        driver: {},
      };
    default:
      return { ...state };
  }
};

// Función para aplicar el ordenamiento
const applyOrder = (drivers, orderType) => {
  switch (orderType) {
    case "none":
      return drivers.slice().sort((a, b) => a.id - b.id);
    case "ascendant":
      console.log(drivers);
      return drivers.slice().sort((a, b) => {
        const nameA = `${ a.forename ?  a.forename : a.name.forename} ${a.surname ?  a.surname : a.name.surname}`;
        const nameB = `${b.forename ? b.forename : b.name.forename} ${b.surname ?  b.surname : b.name.surname }`;
        return nameA.localeCompare(nameB);
      });
    case "decendent":
      return drivers.slice().sort((a, b) => {
        const nameA = `${ a.forename ?  a.forename : a.name.forename} ${a.surname ?  a.surname : a.name.surname}`;
        const nameB = `${b.forename ? b.forename : b.name.forename} ${b.surname ?  b.surname : b.name.surname }`;
        return nameB.localeCompare(nameA);
      });
    case "younger":
      return drivers.slice().sort((a, b) => new Date(b.dob) - new Date(a.dob));
    case "older":
      return drivers.slice().sort((a, b) => new Date(a.dob) - new Date(b.dob));
    default:
      return drivers;
  }
};


// Función para aplicar el filtro
const applyFilter = (drivers, filterType) => {
  switch (filterType) {
    case "allDrivers":
      return drivers.slice();
    case "bdd":
      return drivers.filter((driver) => driver.created);
    case "api":
      return drivers.filter((driver) => !driver.created);
    default:
      return drivers.filter((driver) => {
        const driverTeams = driver.teams ? driver.teams.split(",").map((team) => team.trim()) : [];
        return driverTeams.includes(filterType);
      });
  }
};

// Exporta el reducer
export default reducer;
