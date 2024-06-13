const TweetService = require("../services/tweet-service");

const tweetService = new TweetService();

const createTweet = async(req, res) => {

    try{
        const response = await tweetService.create(req.body);
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

module.exports = {
    createTweet
}