const validateCreds = (req, res, next) => {
  const creds = req.body; 
  if (creds.username && creds.password && creds.department) {
    next();
  } else { 
    res.status(400).json({ message: 'Provide a valid Username, Password and Department'}); 
  }
}; 

module.exports = {
  validateCreds
}