const { Pool } = require('pg');

const databaseConfig = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
}; 

const pool = new Pool({ databaseConfig })

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

pool.on('connect', () => {
    console.log('connected!');
});

pool.connect().then(client => {
    return client.query('SELECT * FROM users WHERE id = $1', [1]).then(res => {
        client.release()
        console.log(res.rows[0])
    }).catch(err => {
        client.release();
        console.log(err.stack);
    });
});

module.exports = pool;