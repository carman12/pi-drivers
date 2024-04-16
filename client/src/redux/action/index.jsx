import axios from "axios";
import {
  GET_DRIVER_DETAIL,
  GET_ALL_DRIVERS,
  FILTER,
  ORDER,
  SEARCH_DRIVER,
  GET_TEAMS,
  RESET,
  CLEAN_DETAIL,
  FILTER_BY_TEAM
} from './types'

export const getDrivers = () => {
  return async (dispatch) => {
    let drivers = [];

    try {
      let response = (await axios.get("http://localhost:3001/drivers")).data;

      drivers.push(response);

      const finalResult = [].concat.apply([], drivers);

      return dispatch({ type: GET_ALL_DRIVERS, payload: finalResult });
    } catch (error) {
      console.error(error);    }
  };
};

export const getDriverDetail = (id) => {
  return async (dispatch) => {
    try {
      let response = (await axios.get(`http://localhost:3001/drivers/id/${id}`))
        .data;

      return dispatch({ type: GET_DRIVER_DETAIL, payload: response });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const filterCards = (team) => {
  return { type: FILTER, payload: team };
};

export const orderCards = (order) => {
  return { type: ORDER, payload: order };
};

export const searchDriver = (driver) => {
  return async (dispatch) => {
    try {
      let response;

      // Verifica si el campo de búsqueda está vacío o es una cadena vacía
      if (driver.trim() === "") {
        // Si está vacío, realiza una solicitud para obtener todas las tarjetas
        response = await axios.get("http://localhost:3001/drivers");
      } else {
        // Si hay un valor en el campo de búsqueda, realiza la solicitud normalmente
        response = await axios.get(`http://localhost:3001/drivers/name/name?name=${driver}`);
        console.log("aqui",response.data);
      }

      if (response.data.length === 0) {
        // No se encontraron coincidencias, no hace nada
        alert("No se encontraron coincidencias");
      } else {
        // Si hay coincidencias, actualiza el estado con los resultados
        dispatch({
          type: SEARCH_DRIVER,
          payload: response.data,
        });
      }
    } catch (error) {
      alert(error.response.error);
    }
  };
};


export const getTeams = () => {
  return async (dispatch) => {
    let response = (await axios.get("http://localhost:3001/teams")).data;
    dispatch({ type: GET_TEAMS, payload: response });
  };
};

export const filterTeam = (team) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FILTER_BY_TEAM, payload: team });
    } catch (error) {
      console.error(error);
    }
  };
};

export const restart = () => {
  return async (dispatch) => {
    dispatch({ type: RESET });
  };
};