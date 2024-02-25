const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    if (!(name && email && password && picturePath && location && occupation)) {
      return res.status(400).json("All Inputs are Required");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json("User is already exist. Please Login");
    }

    const salt = await bcrypt.genSalt();
    const encryptPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: encryptPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY);
      // delete user.password;
      return res.status(200).json({ user, token });
    } else {
      res.status(400).json("User is not exist. Please Register");
    }
  } catch (err) {
    next(err);
  }
};

// GET USER
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      const err = new Error("Not Found");
      err.status = 404;
      next(err);
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getUserFriends = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, name, occupation, location, picturePath }) => {
        return { _id, name, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    next(err);
  }
};

// UPDATE ADD-REMONVE FRIENDS
const addRemoveFriends = async (req, res, next) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, name, occupation, location, picturePath }) => {
        return { _id, name, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getUser, getUserFriends, addRemoveFriends };
