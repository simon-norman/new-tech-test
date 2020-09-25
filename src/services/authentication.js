function authenticateRequest(req, res, next) {
  if (req.headers.auth !== `Bearer Money4MeNot4u`) {
    return res.status(401).json({ message: 'BOJIM AM WARNING YOU!' });
  }

  next();
}

module.exports = authenticateRequest;