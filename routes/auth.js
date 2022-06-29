const router = require('express').Router();
const User = require('../model/user');
const {registerValidation} = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

  const validation = registerValidation(req.body);
  if (validation.error) return res.status(400).send(validation.error);

  // check if user exists
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists');

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;