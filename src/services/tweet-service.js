const {TweetRepository, HashtagRepository} = require("../repository/index");
const cloudinary = require('cloudinary').v2;

class TweetService {

    constructor(){

        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){

        try{

            const content = data.content;

            // data added in the tweet table
            const tweet = await this.tweetRepository.create(data);

            // this regex extracts hashtags from content
            let tags = content.match(/#[a-zA-Z0-9_]+/g);

            // if tags is empty, dont do anything
            if(tags){
                // removing the first character # from each extracted word
                tags = tags.map((tag) => tag.substring(1).toLowerCase())

                console.log("extracted Hashtag", tags);

                let alreadyPresentTags = await this.hashtagRepository.findByName(tags);

                let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);

                let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));

                newTags = newTags.map(tag => {
                    return {title: tag, tweets: [tweet.id]}
                });

                await this.hashtagRepository.bulkCreate(newTags);

                // in the already present ones, adding the twitter id in their tweet_id array
                alreadyPresentTags.forEach((tag) => {
                    tag.tweets.push(tweet.id);
                    tag.save();
                });
            }

            return tweet;

        }
        catch(err){
            console.log("Something went wrong in the service layer")
            throw error;
        }


    }

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }


}

module.exports = TweetService;