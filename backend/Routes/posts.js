const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {User, Story, ConnectToDb} = require("../db.js");
require('dotenv').config();

const router = express.Router();


//Posting Routes

//Create a post

router.post('/', async (req,res)=>{
    const newStory = new Story(req.body);
    try {
        const savedStory = await newStory.save();
        res.status(200).json(savedStory);
    }catch(err){
        res.status(500).json(err);
    }
});

//Update a post

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

module.exports = router;