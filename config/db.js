const mongoose = require('mongoose')


const params = {
    useUnifiedTopology:true,
    useNewUrlParser:true,
}

const connectDb = ()=>{

    mongoose.connect(process.env.MONGODB_URL,params)
    .then(res=> console.log('database connected'))
    .catch(err=> console.log('databse not connected!!!',err))
    
}

module.exports = connectDb