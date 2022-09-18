const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 5;

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username: username,
      password: hashPassword,
    });
    const sess = req.session;
    sess.username = username;
    sess.password = password;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({
        status: "undefined user",
      });
      return;
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      const sess = req.session;
      sess.username = username;
      sess.password = password;
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "Incorrect username or password",
      });
    }
    res.end("success");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
    });
  }
};
