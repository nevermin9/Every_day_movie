const moment = require('moment');
const validation = require('../helpers/validation');
const statuses = require('../helpers/statuses');
const User = require('../models/User');
const jwtHandlers = require('../helpers/jwtHandlers');

module.exports = {
    createUser(req, res) {
        const { email, password, name } = req.body;
        
        if ([email, password, name].some(validation.isEmpty)) {
            statuses.errorMessage.error = 'Email, password, first name and last name field cannot be empty';
            res.statusCode = statuses.status.bad;
            res.end(JSON.stringify(statuses.errorMessage));
        }

        if (!validation.isValidEmail(email)) {
            statuses.errorMessage.error = 'Email is not valid';
            res.statusCode = statuses.status.bad;
            res.end(JSON.stringify(statuses.errorMessage));
        }

        if (!validation.isValidPassword(password)) {
            statuses.errorMessage.error = 'Password must be more then 5 char';
            res.statusCode = statuses.status.bad;
            res.end(JSON.stringify(statuses.errorMessage));
        }

        const user = new User(name, email, password);

        return user.addUserToDatabase().then(result => {
            const user = result.rows[0];
            delete user.password;

            const token = jwtHandlers.generateUserToken(user.email, user.id, user.name);
            statuses.successMessage.data = user;
            statuses.successMessage.data.token = token;
            res.statusCode = statuses.status.created;
            res.end(JSON.stringify(statuses.successMessage));
        }).catch(error => {
            if (error.routine === '_bt_check_unique') {
                statuses.errorMessage.error = 'User with that EMAIL already exist';
                res.statusCode = statuses.status.conflict;
                res.end(JSON.stringify(statuses.errorMessage))
            }

            statuses.errorMessage.error = 'Operation was not successful';
            res.statusCode = statuses.status.error;
            res.end(JSON.stringify(statuses.errorMessage));
        });
    },

    async signInUser(req, res) {
        const { email, password } = req.body;

        if ([email, password].some(validation.isEmpty)) {
            statuses.errorMessage.error = 'Email or Password detail is missing';
            res.statusCode = statuses.status.bad;
            res.end(JSON.stringify(statuses.errorMessage))
        }

        if (!validation.isValidEmail(email) || !validation.isValidPassword(password)) {
            statuses.errorMessage.error = 'Please enter a valid Email or Password';
            res.statusCode = statuses.status.bad;
            res.end(JSON.stringify(statuses.errorMessage))
        }

        const user = await User.getUserByEmail(email);

        if (!user) {
            statuses.errorMessage.error = 'User with this email does not exist';
            res.statusCode = statuses.status.notfound;
            res.end(JSON.stringify(statuses.errorMessage))
        }

        return User.checkPassword(password, user.password_hash).then(result => {
            if (!result) {
                throw new Error('Incorrect password');
            }

            const token = jwtHandlers.generateUserToken(user.email, user.id, user.name);
            delete user.password;
            statuses.successMessage.data = user;
            statuses.successMessage.data.token = token;
            res.statusCode = statuses.status.success;
            res.end(JSON.stringify(statuses.successMessage))
        }).catch(err => {
            statuses.errorMessage.error = 'The password you provided is incorrect';
            res.statusCode = statuses.status.bad;
            res.end(JSON.stringify(statuses.errorMessage))
        });
    },
};