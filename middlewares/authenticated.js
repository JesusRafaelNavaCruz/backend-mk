const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'marketplace';

exports.decodeToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({message: 'NoHeadersError'});
  }
  
  const token = req.headers.authorization;

  const segment = token.split('.');

  if (segment.length !== 3) {
    return res.status(403).send({message: 'InvalidToken'});
  } else {
    try {
      const payload = jwt.decode(token, secret);
      req.user = payload;
    } catch (err) {
      return res.status(403).send({message: 'ErrorToken'});
    }
  }

  next();

}
