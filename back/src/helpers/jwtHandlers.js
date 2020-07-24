const jwt = require('jsonwebtoken');
const statuses = require('./statuses');
const { errorMessage } = require('./statuses');

module.exports = {
    generateUserToken(email, id, name) {
        const token = jwt.sign({email, user_id: id, name}, process.env.SECRET_KEY, {expiresIn: '3d'});
        return token;
    },

    async verifyToken(req, res, next) {
        const { token } = req.headers;

        if (!token) {
            statuses.errorMessage.error = 'Token not provided';
            return res.status(statuses.status.bad).send(errorMessage);
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = {
                email: decoded.email,
                user_id: decoded.user_id,
                name: decoded.name,
            };

            next();

        } catch (err) {
            statuses.errorMessage.error = 'Authentication Failed';
            return res.status(statuses.status.unauthorized).send(statuses.errorMessage);
        }
    },
}