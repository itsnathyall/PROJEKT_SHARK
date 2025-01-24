const { default: mongoose } = require("mongoose");
require('dotenv').config();



// User Schema and Model
const userSchema = new mongoose.Schema({
    username:{type:String, required:true,unique: true},
    name: {type:String, required:true},
    lastname: {type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type:String, required:true },
    createdAt: {type: Date, default: Date.now},
    profilePicture: {type: String, default: ""},
    followers: {type: Array, default: []},
    following: {type: Array, default: []}
});


const proposalsSchema = new mongoose.Schema({
    story_id:{type:Number},
    user_id:{type:Number},
    body:{type:String},
    status:{type:Boolean}
})

const storiesSchema = new mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    accepted_proposals:[{type:proposalsSchema}],
    user_id:{type:String},
    createdAt: {type: Date, defautl: Date.now},
    description: {type:String, required:true}
})

const User = mongoose.model('User', userSchema);
const Story = mongoose.model('Story', storiesSchema);
const Proposal = mongoose.model('Proposal', proposalsSchema);

module.exports = {
    connectToDb: async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    },
    User,
    Story,
    Proposal
};