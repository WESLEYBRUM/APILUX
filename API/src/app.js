const express = require('express');
const router = require('./MainRouter');


const app = express();

app.use(router); // usa o rotas do router

module.exports = app;

