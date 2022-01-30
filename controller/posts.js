const posts = require('../models/posts')
const router = require('express').Router()

// create posts

const post = async (req,res)=>{
   
    console.log(req.body)
    try {
        const newPost = posts(req.body)
        const post = await newPost.save()
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
}


// update posts 

const updatePost = async (req,res)=>{

    console.log(req.params.id)
    try {
        const post = await posts.findById(req.params.id)
        if (post.username === req.body.username) {
            const updatePost = await posts.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            )
            res.status(200).json(updatePost)
        } else {
            res.status(401).json('you can update only your post')
        }
    } catch (err) {
        res.status(500).json(err + '  bro')
    }
    
}

// delete post

const deletePost = async (req,res)=>{

    try {

        const post = await posts.findById(req.params.id)

        if (post.username === req.body.username) {

            await post.delete()

            res.status(200).json('post deleted successful..')

        } else {

            res.status(401).json('you can delete only your post')
        }
    } catch (err) {
        res.status(500).json(err + ' err bro')
    }
}


// get one post

const getPost = async (req,res)=>{

    try {
        const post = await posts.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
}


// get all post


const getAllPost =  (req,res)=>{


        
       posts.find().then((data)=>{
           res.status(200).json(data)
           
       })
       .catch((err)=>{
           console.log(err)
        res.status(500).json(err)
       })
    


}


module.exports = {post,getPost,updatePost,deletePost,getAllPost}