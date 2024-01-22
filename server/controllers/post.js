
const Post = require('../models/postModel');
const User = require('../models/userModel');

// CREATE
const createPost = async(req, res, next) => {
    try {
        const { userId, description, picturePath } = req.body;
        if (!(userId && description && picturePath)) {
            return res.status(403).json("all input is required")
        }
        const user = await User.findById(userId);
        const newPost = await Post.create({
            userId,
            name: user.name,
            username: user.username,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });

        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (err) {
        next(err);
    }
}

// READ
const getFeedPosts = async(req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}

const getUserPosts = async(req, res, next) => {
    try {
        const {userId} = req.params;
        const posts = await Post.find({ userId });
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}

// UPDATE
const likePost = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);

        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        next(err);
    }
}

module.exports = { createPost, getFeedPosts, getUserPosts, likePost };
