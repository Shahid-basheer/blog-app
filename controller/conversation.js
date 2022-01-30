const conversation = require('../models/Conversation')
// 1 : addConversation
// 2 : getConversation



module.exports={
addConversation:async(req,res)=>{
// let findValue = await conversation.find()
// if(findValue){
//     findValue.find((id)=>{
    
//     })
// }
const data = await conversation({members:[req.body.senderId,req.body.receiverId]})


try{
const newData = await data.save()
res.status(200).json(newData)
}catch(e){
    res.status(500).json(e)
    console.log(e,'err bro')
}

},


getConversation:async(req,res)=>{
    let mem = [];
    try{
        const data = await conversation.find({members:{$in:[req.params.userId]}})
        
             console.log(data);
        data.map((v)=>{
            mem.push({_id:v._id,members_1:v.members[0],members_2:v.members[1]});
        })
        console.log(mem);
     res.status(200).json(mem)
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
    
}

}