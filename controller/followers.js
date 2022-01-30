/** @format */

const user = require("../models/user");
const posts = require("../models/posts");

module.exports = {
  // add postUserId into current user following array and postUser followers array

  follow: (req, res) => {
    const userId = req.body.userId;
    const postUserId = req.body.postUserId;

    user.findByIdAndUpdate(
      { _id: userId },
      { $push: { following: [postUserId] } },
      { new: true },
      (e, follwing) => {
        user.findByIdAndUpdate(
          { _id: postUserId },
          { $push: { followers: [userId] } },
          { new: true },
          (e, followers) => {
            const newData = {
              follwing,
              followers,
            };

            res.status(200).json("Following");
          }
        );
      }
    );
  },

  // remove postUserId from current user following array and remove userId from followers array of postUser
  unFollow: (req, res) => {
    const userId = req.query.userId;
    const postUserId = req.query.postUserId;

    try {
      user.findOneAndUpdate(
        { _id: userId },
        { $pull: { following: postUserId } },
        (e, unFollowing) => {
          user.findOneAndUpdate(
            { _id: postUserId },
            { $pull: { followers: userId } },
            (e, unFollowers) => {
              const unFollowData = {
                unFollowing,
                unFollowers,
              };
              console.log(unFollowing, unFollowers);
              res.status(200).json("Follow");
            }
          );
        }
      );
    } catch (e) {
      res.status(500).json(e);
      console.log(e);
    }
  },

  // bring following user from current userId for singlePost component
  getFollowingUser: (req, res) => {
    const userId = req.query.userid;

    try {
      user.findOne({ _id: userId }, (e, done) => {
        res.status(200).json(done.following);
      });
    } catch (e) {
      res.status(500).json(e);
    }
  },
  // bring all following user of current user's for following components

  getFollowing: (req, res) => {
    const userId = req.query.userid;
    let followingUserDetails = [];
    let arrayLength;
    try {
      user.find({ _id: userId }, (e, done) => {
        arrayLength = done[0].following.length;
        if (done[0].following.length !== 0) {
          for (var i = 0; i < done[0].following.length; i++) {
            user.find({ _id: done[0].following[i] }, (e, response) => {
              followingUserDetails.push(response[0]);
            });
          }
          const interval = setInterval(() => {
            if (followingUserDetails.length === arrayLength) {
              clearInterval(interval);

              res.status(200).json(followingUserDetails);
            }
          }, 500);
        } else {
          res.status(500).json("You did not have any following yet !!!");
        }
      });
    } catch (e) {
      res.status(500).json(e + "pls try again");
    }
  },

  // bring all followers of current user's
  getAllFollowersOfCrrentUser: (req, res) => {
    const userId = req.query.userId;
    let arrayLength;
    let followersUserDetails = [];
    try {
      user.find({ _id: userId }, (e, done) => {
        arrayLength = done[0].followers.length;

        if (done[0].followers.length !== 0) {
          for (var i = 0; i < done[0].followers.length; i++) {
            user.find({ _id: done[0].followers[i] }, (e, response) => {
              followersUserDetails.push(response[0]);
            });
          }
          const interval = setInterval(() => {
            if (followersUserDetails.length === arrayLength) {
              clearInterval(interval);

              res.status(200).json(followersUserDetails);
            }
          }, 500);
        } else {
          res.status(500).json("You have no followers yet !!!");
        }
      });
    } catch (e) {
      res.status(500).json(e + "pls try again");
    }
  },

// remove follower of current user
 removeFollower:(req,res)=>{
 const userId = req.query.userId;
 const followerId = req.query.followerId;   
 user.findOneAndUpdate({_id:userId},{$pull:{followers:followerId}},(e,done)=>{
 if (!e) res.status(200).json(done)
 else res.status(500).json(e)
 })
  }

};
