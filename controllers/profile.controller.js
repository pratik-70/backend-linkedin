const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/comment.model");

//create profile
const CreateProfile = async (req, res) => {
    try {
        const { userId, headline, summary, experience, skills, education } = req.body;

        const profile = new Profile({
            userId,
            headline,
            summary,
            skills,
            
        });

        await profile.save();

        profile.experience.push(experience);
        profile.education.push(education);

        await profile.save();


        return res.status(201).json({ message: "Profile created successfully", profile });
    } catch (error) {
        console.log("err", error);
    }
}

module.exports = { CreateProfile }