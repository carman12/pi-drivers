const { Driver, Team } = require("../src/db");
const axios = require("axios");
const { Op } = require('sequelize');
const path = require("path");

const findAllDrivers = async (filter) => {
  try {

    let drivers = (await axios.get(`http://localhost:5000/drivers`)).data;
    let driversbd = await getBddDrivers();
  
     if(filter === "api"){
      return drivers;
    }else if(filter === "bdd"){
      return driversbd;
    }else{
    const todo = [...drivers, ...driversbd];
   // driverlist = drivers.map(driver => driver.forename);
    return todo;
  }
  } catch (error) {
    throw new Error(`Error al buscar los países: ${error.message}`);
  }
};
// funcion para traer de la bd

const getBddDrivers = async () => {
  const bddDrivers = await Driver.findAll({
    include: Team, // Incluye la relación con el modelo Team
  });

  const defaultImage = path.join(__dirname, 'assets', 'DriverNotFound.png')

  const driversMap = bddDrivers.map((driver) => {
    const teams = driver.Teams.map((team) => team.name); // Así obtienes los nombres de los equipos

    return {
      id: driver.id,
      forename: driver.forename,
      surname: driver.surname,
      description: driver.description,
      image: driver.image ? driver.image : defaultImage,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: teams, 
      created: true,
    };
  });

  return driversMap;
};


const findAllTeams = async () => {
  try {
    const teams = await Team.findAll({
      include: [
        {    
          model: Driver,
          as: "Drivers",
        },
      ],
    });
    return teams;
  } catch (error) {
    throw new Error(`Error al buscar los equipos: ${error.message}`);
  }
};


const findDriverbyID = async (source, id) => {
  console.log("lol");
  try {
    let driver;
    if (source === "bdd") {   
      console.log("bdd");   
      driver = await getBddDriverById(id);
    } else {
      console.log("api");
      // Realiza la solicitud a la API externa
      const response = await axios.get(`http://localhost:5000/drivers/${id}`);
      driver = response.data;
    }

    if (!driver) {
      throw new Error("El conductor no existe");
    }

    return driver;
  } catch (error) {
    throw new Error(`Error al buscar el conductor: ${error.message}`);
  }
};

const findDriverbyName = async (forename) => {  
  console.log("res "+ forename);
  try {
    // Buscar conductores en la base de datos
    const bddDrivers = await Driver.findAll({
      where: {
        [Op.or]: [
          {
            forename: {
              [Op.iLike]: `%${forename}%`,
            },
          },
          {
            surname: {
              [Op.iLike]: `%${forename}%`,
            },
          },
        ],
      },
      limit: 15,
    });



    // Obtener conductores de la API externa
    const apiDrivers = await getApiDriversByName(forename, 15);

    // Filtrar conductores de la API por nombre
    const filteredApi = apiDrivers.filter((driver) =>
      driver.name.forename.toLowerCase().includes(forename.toLowerCase()) ||
      driver.name.surname.toLowerCase().includes(forename.toLowerCase())
    );

    // Calcular cuántos conductores adicionales se pueden agregar desde la API
    const remainingSlots = Math.max(0, 15 - bddDrivers.length);

    // Seleccionar los conductores adicionales de la API según los espacios restantes
    const selectedApiDrivers = filteredApi.slice(0, remainingSlots);

    // Combinar los conductores de la base de datos y los seleccionados de la API
    return [...bddDrivers, ...selectedApiDrivers];
  } catch (error) {
    // Manejar errores
    console.log("pepe"+forename);
    throw new Error(`Error al buscar conductores por nombre: ${error.message}`);
  }
  };


//FUNCION PARA ENCONTRAR POR ID EN LA BD
const getBddDriverById = async (id) => {
  const bddDriver = await Driver.findByPk(id, {
    include: [
      {
        model: Team,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });
  const defaultImage = path.join(__dirname, 'assets', 'DriverNotFound.png')

  return {
    id: bddDriver.id,
    forename: bddDriver.forename,
    surname: bddDriver.surname,
    description: bddDriver.description,
    image: bddDriver.image ? bddDriver.image : defaultImage,
    nationality: bddDriver.nationality,
    dob: bddDriver.dob,
    teams: bddDriver.Teams.map((team) => team.name).join(", "),
    created: true,
  };
};

const getApiDriversByName = async (forname,limit) => {
  try {
    // Realizar la solicitud a la API externa para obtener todos los conductores
    const response = await axios.get("http://localhost:5000/drivers");
    const allDrivers = response.data;
    console.log("alias:"+forname);
    // Filtrar los conductores por nombre
    const filteredDrivers = allDrivers.filter(driver =>     
          driver.name.forename.toLowerCase().includes(forname.toLowerCase()) ||
    driver.name.surname.toLowerCase().includes(forname.toLowerCase())
    );

    // Limitar la cantidad de conductores a los primeros 'limit'
    const limitedDrivers = filteredDrivers.slice(0, limit);
console.log(limitedDrivers);
    return limitedDrivers;
  } catch (error) {
    // Manejar errores
    throw new Error(`Error al obtener conductores de la API: ${error.message}`);
  }
};

module.exports = {
    findAllDrivers,
    findAllTeams,
    findDriverbyID,
    findDriverbyName,
};