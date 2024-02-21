const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const generalRoutes = require('./routes/index');

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

// Configurar Express para servir archivos estáticos desde la carpeta 'assets'
server.use('/assets', express.static(path.join(__dirname, 'assets')));

server.use(generalRoutes);

module.exports = server;

