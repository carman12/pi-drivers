const {
  findAllDrivers,
  findDriverbyID,
  findDriverbyName,
} = require("../../controllers/findAll");
const { createDriverDB } = require("../../controllers/DriverControllers");
const { Driver } = require("../db");

const getDriversHandler = async (req, res) => {
  const { filter } = req.params;
  console.log(filter);
  if (filter !== "" && filter != null && filter != undefined) {
    console.log("holis");
    const source = isNaN(filter) ? "bdd" : "api"; // Si idDriver no es un número, source es "bdd", de lo contrario es "api"
    try {
      const drivers = await findAllDrivers(source);
      res.status(200).json(drivers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    try {
      console.log("holis2");
      const drivers = await findAllDrivers();
      res.status(201).json(drivers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting all Drivers" });
    }
  }
};

const getDriverDetail = async (req, res) => {
  const { idDriver } = req.params;
  const source = isNaN(idDriver) ? "bdd" : "api"; // Si idDriver no es un número, source es "bdd", de lo contrario es "api"

  try {
    const driver = await findDriverbyID(source, idDriver);
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDriverDetailName = async (req, res) => {
  const { name } = req.query;
  console.log("kik" + name);

  try {
    const driver = await findDriverbyName(name);
    res.status(200).json(driver);
  } catch (error) {
    console.log("fail");
    res.status(500).json({ error: error.message });
  }
};
const postDriver = async (req, res) => {
  console.log("creador");
  const { forename, surname, description, image, nationality, dob, teamID } =
    req.body;
  console.log(
    forename,
    surname,
    description,
    image,
    nationality,
    dob,
    teamID
  );

  try {
    const allDrivers = await Driver.findAll();
    const response = await createDriverDB(
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
      teamID
    );

    res
      .status(200)
      .json({
        message: "Conductor Creado",
        data: response,
        allDrivers: allDrivers,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getDriversHandler,
  getDriverDetail,
  getDriverDetailName,
  postDriver,
};
