const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'marketplace';

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        name: user.name,
        firstLastName: user.firstLastName,
        secondLastName: user.secondLastName,
        email: user.email,
        role: user.role,
        int: moment().unix,
        exp: moment().add(1, 'day').unix(),
    };

    return jwt.encode(payload, secret);
}
