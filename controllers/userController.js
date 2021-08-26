import expressAsyncHandler from "express-async-handler";
import { generateVoterId } from "../helpers/generateVoterId.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// @desc get Users
// @route GET /api/auth/user
// @access public for now

export const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password -__v");
  if (users) {
    res.status(200).json({
      message: "Users Found in DB",
      users,
    });
  } else {
    res.status(404);
    throw new Error("No user found in the database");
  }
});

// @desc Sign Up
// @route POST /api/Users
// @access Public

export const createUser = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password, phonenumber, dob } = req.body;

  if (!name || !email || !password || !phonenumber || !dob) {
    res.status(400).json({
      message: "Make sure that you have all the credentials",
    });
    return;
  }
  const phoneNum = await User.findOne({
    phonenumber,
  });

  const emailExists = await User.find({
    email,
  });

  if (phoneNum && emailExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const user = await User.create({
    name,
    email,
    password,
    phonenumber,
    dob,
    voterId: generateVoterId(),
  });

  user &&
    res.status(201).json({
      message: "User created Successfully",
    });

  !user && res.status(500).json({ message: "Something Occurred try again" });
});

// @desc LOGIN User
// @route POST /api/users/login
// @access Public

export const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    res.status(400).json({
      message: "Please Input the right input",
    });
    return;
  }
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      token: generateToken(user._id, user.voterId),
    });
    return;
  } else {
    return res.status(401).json({
      message: "Invalid Email or Password",
    });
  }
});

// @desc Get user Profile
// @route GET /api/user/profile
// @access Private

export const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -__v");

  if (user) {
    res.status(200).json({
      user,
    });
    return;
  } else {
    res.status(404).json({
      message: "User not Found",
    });
    return;
  }
});
