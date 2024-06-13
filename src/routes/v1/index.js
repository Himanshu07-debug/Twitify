const express = require('express');

const TweetController = require("../../controllers/tweet-controller");
const LikeController = require("../../controllers/like-controller");
const CommentController = require("../../controllers/comment-controller");
const UserController = require("../../controllers/user-controller");

const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/tweets", authenticate,  TweetController.createTweet);
router.get("/tweets/:id", TweetController.getTweet);

router.post("/likes/toggle", LikeController.toggleLike);

router.post("/comments", authenticate, CommentController.createComment);

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

module.exports = router;