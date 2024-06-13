const express = require('express');

const TweetController = require("../../controllers/tweet-controller");

const router = express.Router();

router.post("/tweets", TweetController.createTweet);

module.exports = router;