const user = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let userData;
// Register
const register = async (req,res)=>{
console.log(req.body)
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = user({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    })
    const userDetails = await newUser.save()
    res.status(200).json(userDetails)
  } catch (err) {
    if(err.keyValue.username){
      res.status(500).json(err.keyValue.username+' allready exist')

    }else if(err.keyValue.email){
      res.status(500).json(err.keyValue.email+' allready exist')
    }
    console.log(err)
  }
}

// meddileware of authentication

const verifyJWT = (req,res,next)=>{
  const token = req.query.token
  if(!token){
   return res.status(400).json('yo, we need  a token , please give it to us next time')
  }else{
    jwt.verify(token,'mysecret',(err,done)=>{
      if(!err){
        userData = done
        next()
      }else{
       return res.status(500).json({auth:false,message:'you are failed...'})
      next()
      }
    })
  }
   
}

// // callback function of authentication 
const isUserAuth = (req,res)=>{
  
  res.status(200).json(userData)
}

//Login

  const login = async(req,res)=>{
    try {
      const userD = await user.findOne({ email: req.body.email })
      !userD && res.status(400).json('email not found')
      const userPassword = await bcrypt.compare(req.body.password, userD.password)
      !userPassword && res.status(400).json('password not found')
      const token = jwt.sign({ userD }, 'mysecret',{expiresIn:'1d'});
      res.status(200).json({auth:true,token:token,userD}) 
    }catch (error) {
      res.status(500).json(error)
    }
  }


  

module.exports = {register,login,verifyJWT,isUserAuth};