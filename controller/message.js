const message = require('../models/messages')
const user = require('../models/user')
// 1 : addMessage
// 2 : getMessage

module.exports = {

    addMessage: async (req, res) => {

        const data = await message(req.body)


        try {
            const newData = await data.save()
            res.status(200).json(newData)
        } catch (e) {
            res.status(500).json(e)
        }

    },


    getMessage: async (req, res) => {

        try {
            const data = await message.find({ conversationId: req.params.id })
            res.status(200).json(data)
        } catch (e) {
            res.status(500).json(e)
        }
    },

    getUser: async (req, res) => {
       
        
        if(req.params.userId!==undefined){
            console.log(req.params.userId)
            const data = await user.find({ _id: req.params.userId })
            try {
                res.status(200).json(data)
            } catch (e) {
                res.status(500).json(e)
            }

        }
        

    },


}