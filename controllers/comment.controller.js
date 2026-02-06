const Comment = require("../models/comment.model");
const Post = require("../models/Post.model");
const User = require("../models/User.model");
const Profile = require("../models/Profile.model");

const CreateComment = async (req, res) => {
    try {
        const { textComment, userId, postId } = req.body;

        const newComment = new Comment({
            textComment,
            userId,
            postId
        });

        await newComment.save();
        return res.status(201).json({ message: "Comment created successfully", comment: newComment });
    } catch (error) {
        console.log("err", error);
        return res.status(500).json({ message: "Error creating comment", error: error.message });
    }
}

module.exports = { CreateComment }
   

    