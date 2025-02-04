const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {User, Story, ConnectToDb} = require("../db.js");
const {caretTrimReplace} = require("semver/internal/re");
const { authenticateToken } = require("./auth.js");
require('dotenv').config();

const router = express.Router();


//Posting Routes

// Create a post
router.post('/', authenticateToken, async (req, res) => {
    try {
        const newStory = new Story({
            ...req.body,
            user_id: req.user.id,
        });

        const savedStory = await newStory.save();
        res.status(200).json(savedStory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating post', error: err.message });
    }
});

// Comment
router.post('/:id/comments', authenticateToken, async (req, res) => {
    const { commentBody } = req.body;
    const storyId = req.params.id;

    if (!commentBody) {
        return res.status(400).json({ message: 'Comment body is required.' });
    }

    try {
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: 'Story not found.' });
        }

        const newComment = {
            commentOwner: req.user.id,
            commentBody
        };

        story.comments.push(newComment);
        await story.save();

        res.status(201).json({ message: 'Comment added successfully', story });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add comment' });
    }
});

// Show all posts
router.get('/', async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error loading stories' });
    }
});

// Update a post
router.put("/:id", async (req,res)=>{
    try{
        const story = await Story.findById(req.params.id);
        if(story.user_id === req.body.user_id){
            await story.updateOne({$set: req.body});
            res.status(200).json("Successfully updated");
        }else{
            res.status(403).json('You can only update your own posts');
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

// Like a post
router.post('/:id/like', authenticateToken, async (req, res) => {
    const storyId = req.params.id;
    const userId = req.user.id;

    try {
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: 'Story not found.' });
        }

        const hasLiked = story.likedBy.includes(userId);

        if (hasLiked) {
            // like
            story.likedBy.pull(userId);
            story.likes -= 1;
            await story.save();
            return res.status(200).json({ message: 'Like removed.', likes: story.likes });
        } else {
            // unlike
            story.likedBy.push(userId);
            story.likes += 1;
            await story.save();
            return res.status(200).json({ message: 'Like added.', likes: story.likes });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update like status.' });
    }
});



module.exports = router;