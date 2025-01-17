const { default: mongoose } = require("mongoose");
require('dotenv').config();



// User Schema and Model
const userSchema = new mongoose.Schema({
    username:{type:String, required:true,unique: true},
    name: {type:String, required:true},
    lastname: {type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type:String, required:true },
});


const proposalsSchema = new mongoose.Schema({
    story_id:{type:Number},
    user_id:{type:Number},
    body:{type:String},
    stats:{type:Boolean}
})

const storiesSchema = new mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    accepted_proposals:[{type:proposalsSchema}],
    user_id:{type:Number}
})

const User = mongoose.model('User', userSchema);
const Story = mongoose.model('Story', storiesSchema);
const Proposal = mongoose.model('Proposal', proposalsSchema);

module.exports = {
    User,
    Story,
    Proposal
};