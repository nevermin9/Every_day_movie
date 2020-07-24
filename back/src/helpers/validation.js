module.exports = {
    isValidEmail(email) {
        const regExp = /\S+@\S+\.\S+/;
        return regExp.test(email);
    },

    isValidPassword(password) {
        if (password.lenght <= 5 || password === '') {
            return false;
        }

        return true;
    },

    isEmpty(input) {
        return input === '' || input === undefined || input === null;
    }
};
