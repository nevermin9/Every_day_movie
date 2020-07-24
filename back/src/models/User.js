const bcrypt = require('bcrypt');
const client = require('../db/client');

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.passwordHash = '', 
        this.createdOn = Date.now() / 1000;
    }

    addUserToDatabase() { 
        return this.setPasswordHash(this.password).then(() => {
            const text = 'INSERT INTO users(name, email, password_hash, created_on) VALUES($1, $2, $3, to_timestamp($4)) RETURNING *';
            const values = [this.name, this.email, this.passwordHash, this.createdOn];

            return client.query(text, values).catch(err => Promise.reject(new Error(err))).finally(() => client.end());
        });
    }

    setPasswordHash(password) {
        const saltRounds = 10;

        return bcrypt.hash(password, saltRounds).then(hash => {
            this.passwordHash = hash;
        });
    }

    static checkPassword(password, passwordHash) {
        return bcrypt.compare(password, passwordHash);
    }

    static getUserByEmail(email) {
        const text = 'SELECT * FROM users WHERE email=$1';
        const value = [email];

        return client.query(text, value).then(result => {
            return result.rows[0];
        }).catch(err => Promise.reject(new Error(err))).finally(() => client.end());
    }

    static updateData(column, value, email) {
        const text = `UPDATE users SET ${column}=$1 WHERE email=$2 RETURNING *`;
        const value = [value, email];

        return client.query(text, value).then(result => {
            return result.rows[0];
        }).catch(err => Promise.reject(new Error(err))).finally(() => client.end());
    }

    static deleteUser(email) {
        const text = 'DELETE FROM users WHERE email=$1 RETURNING *';
        const value = [email];

        return client.query(text, value).then((result) => {
            return result.rows[0];
        }).catch(err => Promise.reject(new Error(err))).finally(() => client.end());
    }
}

module.exports = User;