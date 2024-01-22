
const express = require('express');
const verifyToken = require('../middleware/auth');
const { getUser, login, getUserFriends, addRemoveFriends } = require('../controllers/user');

const router = express.Router();

//AUTH
router.post("/login", login);

// READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

module.exports = router;
