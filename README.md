# Twitify 📱✨

Welcome to **Twitify**, a social media application built on a Monolith architecture! In Twitify, users can post tweets with images, comment on tweets, reply to comments, like tweets or comments, and filter tweets by hashtags.

## Features 🌟
- Post tweets with images 📸
- Comment on tweets 💬
- Reply to comments 🗨️
- Like tweets and comments ❤️
- Filter tweets by hashtags 🔍

## Getting Started 🚀

### Prerequisites 📋
- Node.js
- MongoDB
- Cloudinary account for media storage

### Installation 🔧

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/twitify.git
   cd twitify

2. **Install dependencies:**
   ```sh
   npm install

3. **Environment Variables:**
   - Create a .env file in the root directory and add the following:
    ```plaintext
      DATABASE_URL=mongodb://127.0.0.1:27017/[your database name]
      PORT=3000
      JWT_SECRET=[Your JWT Secret]
      CLOUD_NAME=[Your Cloudinary Cloud Name]
      API_KEY=[Your Cloudinary API Key]
      API_SECRET=[Your Cloudinary API Secret]
      MAIL_HOST=[Your Mail Host]
      MAIL_USER=[Your Mail User]
      MAIL_PASS=[Your Mail Password]  
    ```
4. **Run the Server:**
   ```sh
   npm start

## API Endpoints 📡

### Authentication 🔑

#### Sign Up
- **POST /api/v1/signup**
  - Create a new user account.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword",
      "name": "Your Name"
    }
    ```

#### Login
- **POST /api/v1/login**
  - Log in with existing credentials.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - You will get a Bearer Token in response, whose expiry time is 1 hr
  - Use this token to authenticate yourself to make tweets, comments.

### Tweets 🐦

#### Create Tweet
- **POST /api/v1/tweets**
  - Create a new tweet (requires authentication).
  - Request Body:
    ```json
    {
      "content": "Your tweet",
      "image": "image_url"
    }
    ```

#### Get All Tweets
- **GET /api/v1/tweets**
  - You have to pass tweetID in params
  - Retrieve all tweets.

### Comments 💬

#### Create Comment
- **POST /api/v1/comments**
  - Create a new comment on a tweet (requires authentication).
  - Request Body:
    ```json
    {
      "content": "Your comment",
    }
    ```
  - Pass modelId(tweet_or_comment_id) and modelType(Tweet/Comment) in query params

### Likes ❤️

#### Toggle Like
- **POST /api/v1/likes/toggle**
  - Toggle like on a tweet or comment.
  - Request Body:
    ```json
    {
      "likeableId": "tweet_or_comment_id",
      "onModel": "Tweet/Comment"
    }
    ```

## Models 🗂

### User 🧑‍💻

| Field       | Type              | Description                          |
|-------------|-------------------|--------------------------------------|
| `email`     | String, required, unique | User's email address.         |
| `password`  | String, required  | User's password (hashed).             |
| `name`      | String, required  | User's name.                          |
| `timestamps`| Boolean           | Automatically managed timestamps.     |

### Tweet 🐦

| Field         | Type                        | Description                                   |
|---------------|-----------------------------|-----------------------------------------------|
| `content`     | String, required, max 250   | Content of the tweet.                         |
| `user`        | ObjectId, ref: 'User', required | User who posted the tweet.                |
| `likes`       | Array of ObjectId, ref: 'Like' | Likes received by the tweet.              |
| `comments`    | Array of ObjectId, ref: 'Comment' | Comments posted on the tweet.          |
| `image`       | String                      | URL of the image attached to the tweet.       |
| `timestamps`  | Boolean                     | Automatically managed timestamps.             |

### Comment 💬

| Field         | Type                        | Description                                   |
|---------------|-----------------------------|-----------------------------------------------|
| `content`     | String, required            | Content of the comment.                       |
| `userId`      | ObjectId, ref: 'User', required | User who posted the comment.              |
| `onModel`     | String, enum: ['Tweet', 'Comment'], required | Type of parent entity (tweet or comment). |
| `commentable` | ObjectId, refPath: 'onModel', required | ID of the parent entity (tweet or comment). |
| `comments`    | Array of ObjectId, ref: 'Comment' | Replies to the comment.                 |
| `timestamps`  | Boolean                     | Automatically managed timestamps.             |

### Like ❤️

| Field         | Type                        | Description                                   |
|---------------|-----------------------------|-----------------------------------------------|
| `onModel`     | String, enum: ['Tweet', 'Comment'], required | Type of entity being liked (tweet or comment). |
| `likeable`    | ObjectId, refPath: 'onModel', required | ID of the entity being liked.            |
| `user`        | ObjectId, ref: 'User', required | User who liked the entity.                |
| `timestamps`  | Boolean                     | Automatically managed timestamps.             |



## 📬 Contact

Feel free to reach out to me at [himanshusharma2002.2000@gmail.com](mailto:himanshusharma2002.2000@gmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/himanshu-sharma-dev).


Thank you for checking out Twitify! If you have any feedback or suggestions, feel free to open an issue or make a pull request.

Happy coding! 😊

