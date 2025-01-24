const express = require('express');
const {User, Story, ConnectToDb} = require("../db.js");
const bcrypt = require('bcryptjs');
require('dotenv').config();

const router = express.Router();


//Update user
router.put('/:id', async (req,res) => {
    if(req.body._id === req.params.id){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err){
                return res.status(500).json({err})
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {$set:req.body});
            res.status(200).json({message:"Successfully updated!"})
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(500).json({error:"Blablal"})
    }
})


//Delete user

router.delete('/:id', async (req,res) => {
    if(req.body._id === req.params.id){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({message:"Successfully deleted!"})
        }catch(err){
            console.log(err)
            return res.status(500).json({err});
        }   
    }else{
        return res.status(500).json({error: "blabla"})
    }
})

//Get a user

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...other} = user._doc
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
})

//Following
router.put('/:id/follow', async (req,res) => {
    if(req.body._id !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body._id);
            if(!user.followers.includes(req.body._id)){
                await user.updateOne({$push: {followers: req.body._id}});
                await currentUser.updateOne({$push:{following: req.body._id}})
                res.status(200).json('User has been followed');
            }else {
                res.status(403).json('You already follow this user');
            }
        }catch{
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can't follow yourself");
    }
})

//Unfollow

router.put('/:id/unfollow', async (req,res) => {
    if(req.body._id !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body._id);
            if(user.followers.includes(req.body._id)){
                await user.updateOne({$pull: {followers: req.body._id}});
                await currentUser.updateOne({$pull:{following: req.body._id}})
                res.status(200).json('User has been unfollowed');
            }else {
                res.status(403).json("You don't follow this user");
            }
        }catch{
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can't unfollow yourself");
    }
})


module.exports = router;