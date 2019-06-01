const express = require('express');
const helmet = require('helmet');
const knex = require('knex')

const server = express();
server.use(express.json());
server.use(helmet());

//server
const port = 6492;
server.listen(port, function() {
  console.log(`\n=== Webdb API Listening on http://localhost:${port} ===\n`);
});