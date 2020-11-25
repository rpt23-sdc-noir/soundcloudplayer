const knex = require('knex');

const knexConfig = require('./knexfile');

const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);
// console.log('Connection Config: ', connectionConfig);
// console.log('Connection: ', connection);

module.exports = connection;