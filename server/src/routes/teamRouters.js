const { Router } = require("express");
const express = require("express");
const {getTeamHandler} = require("../Handlers/TeamHandlers");
const teamRouters = Router();
teamRouters.use(express.json());


teamRouters.get('/',getTeamHandler);
// Ruta para obtener el detalle de todos los teams

 module.exports = teamRouters;