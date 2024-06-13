const mongoose = require("mongoose");
const User = require("./user");
const nodemailer = require('nodemailer');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Tweet cannot be more than 250 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    image: {
        type: String
    }
}, {timestamps: true});

tweetSchema.post('save', async function(doc){

    try{

            // This doc is the new document that entered in your database collection
            // console.log("DOC: ",doc);
            // console.log(doc.user);

            const response = await User.findById(doc.user);

            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user:process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            });

            let info = await transporter.sendMail({
                from:`Himanshu`,
                to:response.email,
                subject:"Message from Twitify",
                html:`<h2>Hello! ${response.name}</h2> <p>Your Tweet Post image is Uploaded on Cloudinary , View Here <a href="${doc.image}">${doc.image}</a> </p> <br> <br> <h4>Your Content :</h4> <p>${doc.content}</p>`
            })

            // console.log("INFO : ", info);

    }
    catch(err){
        console.log(err);
    }
})

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;