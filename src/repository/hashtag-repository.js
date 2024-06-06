const Hashtag = require('../models/hashtags');

class HashtagRepository {
    
    async create(data) {
        try {
            const tag = await Hashtag.create(data);
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    async bulkCreate(data){

        try{
            const tags = await Hashtag.insertMany(data);
            return tags;
        }
        catch(err){
            console.log(error);
        }

    }

    async get(id) {
        try {
            const tag = await Hashtag.findById(id);
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    // async update(tweetId, data) {
    //     try {
    //         const tweet = await Hashtags.findByIdAndUpdate(tweetId, data, {new: true});
    //         return tweet;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async destroy(id) {
        try {
            const tag = await Hashtag.findByIdAndRemove(id);
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    
    async findByName(titleList){

        try{ 
            // all hashtag documents having title same with any of the title elements present in the array

            // const tags = await Hashtag.find({title : titleList}).select('title - _id'); 
            const tags = await Hashtag.find({title : titleList});  
 
            return tags;
            
        }
        catch(err){
            console.log(err);
        }

    }


}

module.exports = HashtagRepository;