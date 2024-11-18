const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Trainer=require('../models/trainer');
const Member=require('../models/member');
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({users: users.map(user => user.toObject({ getters: true }))});
};
//
const signup = async (req, res, next) => {
    const { name, email, password,type } = req.body;
  const UserType=type==="trainer"?Trainer:Member
  const createdUser = new UserType({
    name,
    email,
    profilePic: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
    password,
    type
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err)
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({message: 'Logged in!',type:existingUser.type});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
