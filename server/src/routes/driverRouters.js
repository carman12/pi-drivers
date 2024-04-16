const { Router } = require("express");
const express = require("express");
const {getDriversHandler,getDriverDetail,getDriverDetailName,postDriver} = require("../Handlers/DriverHandler");
const driverRouters = Router();
driverRouters.use(express.json());


driverRouters.get('',getDriversHandler);
// Ruta para obtener el detalle de un país por su ID
driverRouters.get('/id/:idDriver', getDriverDetail);

// Ruta para obtener el detalle de un país por su nombre
driverRouters.get('/name/:name', getDriverDetailName);
// Ruta para mandar a crear la relacion driver-team
driverRouters.post('/postDriver', postDriver);


 module.exports = driverRouters;