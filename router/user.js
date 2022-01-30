const router = require("express").Router();
const auth = require('../controller/auth')
const posts = require('../controller/posts')
const followers = require('../controller/followers')
const user = require('../controller/user')
const message = require('../controller/message')
const conversation = require('../controller/conversation')


router.post('/register',auth.register)
router.post('/login',auth.login)
router.get('/isUserAuth',auth.verifyJWT,auth.isUserAuth)
router.post('/posts',posts.post)
router.get('/posts/:id',posts.getPost)
router.put('/posts/:id',posts.updatePost)
router.delete('/posts/delete/:id',posts.deletePost)
router.get('/posts',posts.getAllPost)
router.put('/follow',followers.follow)
router.delete('/unFollow',followers.unFollow)
router.get('/getFollowingUser',followers.getFollowingUser)
router.get('/geFollowing',followers.getFollowing)
router.get('/getFollowers', followers.getAllFollowersOfCrrentUser);
router.delete('/removeFollower', followers.removeFollower);
router.put('/:id',user.updateUser)
router.delete('/:id',user.deleteUser)
router.get('/:id',user.getOneUser)

router.post('/addConversation',conversation.addConversation)
router.get('/getConversation/:userId',conversation.getConversation)

router.post('/addMessage',message.addMessage)
router.get('/getMessage/:id',message.getMessage)
router.get('/getUser/:userId',message.getUser)
router.get("/getAllUsers/:id",user.getAllUsers);


module.exports = router;