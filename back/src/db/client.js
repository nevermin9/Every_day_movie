const Client = require('pg').Client;

const databaseConfig = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
}; 

const client = new Client({ databaseConfig })

client.on('connect', () => {
    console.log('connected!');
});

client.connect();

module.exports = client;