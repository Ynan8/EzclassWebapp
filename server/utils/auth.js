const bcrypt = require('bcrypt');

exports.hashPassword = (password) => {
    if (typeof password !== 'string' || password.length === 0) {
        return Promise.reject(new Error('Invalid password'));
    }

    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            } else {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            }
        });
    });
};

exports.comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}
