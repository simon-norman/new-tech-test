// Import express
const express = require('express');
const createApp = require('./create_app');
const Database = require('./data/database');

const customerDbService = new Database('./deli_customers.json');
const app = createApp(customerDbService);

// Setup server port
const port = process.env.PORT || 8080;

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running API test bed on port " + port);
});