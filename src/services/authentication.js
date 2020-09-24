function authenticateRequest(req, res, next) {
  if (req.headers.auth !== `Bearer Money4MeNot4u`) {
    res.status(401).send('BOJIM AM WARNING YOU!');
  }

  next();
}

module.exports = authenticateRequest;