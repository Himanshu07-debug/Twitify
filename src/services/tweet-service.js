const {TweetRepository, HashtagRepository} = require("../repository/index");

class TweetService {

    constructor(){

        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){

        const content = data.content;

        // this regex extracts hashtags from content
        let tags = content.match(/#[a-zA-Z0-9_]+/g);

        // removing the first character # from each extracted word
        tags = tags.map((tag) => tag.substring(1).toLowerCase())

        console.log("extracted Hashtag", tags);

        // data added in the tweet table
        const tweet = await this.tweetRepository.create(data);

        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);

        let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);

        let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));

        newTags = newTags.map(tag => {
            return {title: tag, tweets: [tweet.id]}
        });

        await this.hashtagRepository.bulkCreate(newTags);

        // in the already present ones, adding the twitter id
        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        });

        return tweet;

    }

}

module.exports = TweetService;