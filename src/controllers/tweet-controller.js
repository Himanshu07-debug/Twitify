const TweetService = require("../services/tweet-service");
const cloudinary = require('cloudinary').v2;
const tweetService = new TweetService();

async function uploadFileToCloudinary(file,folder){
    const options = {folder};
    console.log("Temp path: ", file.tempFilePath);
 
    options.resource_type = "auto";   
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}


function isFileSupported(fileTypes,supportedTypes) {
    return supportedTypes.includes(fileTypes);
}

function isSmaller(file){
    return file.size < 5242880;   
}

const createTweet = async(req, res) => {

    try{

        const file = req.files.image;

        const supportedTypes = ["jpeg","png","jpg"];
        const fileTypes = file.name.split(".")[1].toLowerCase();
        // console.log("File type -> ",fileTypes);


        if( !isSmaller(file) ||  !isFileSupported(fileTypes,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        const uploadresponse = await uploadFileToCloudinary(file,"Twitter-dev");   

        // console.log(uploadresponse);

        const payload = {...req.body};
        payload.user = req.user.id;
        payload.image = uploadresponse.secure_url;

        const response = await tweetService.create(payload);
        return res.status(201).json({
            success : true,
            message: 'Successfully created the tweet',
            data: response,
            err : {}
        })
    }
    catch(err){

        return res.status(500).json({
            success : false,
            message: 'something went wrong',
            data: {},
            err : err
        })

    }

}

const getTweet = async (req, res) => {
    try {
        const response = await tweetService.get(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched a tweet from service',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}

module.exports = {
    createTweet,
    getTweet
}