const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        userId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
          type: Map,
          of: Boolean,
        },
        comments: {
          type: Array,
          default: [],
        },
      },
      { timestamps: true }
)