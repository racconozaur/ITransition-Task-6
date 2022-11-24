const {Schema, model, ObjectId} = require("mongoose")

const Message = new Schema({
    sender: {type: String, required: true },
    rciever: {type: String, required: true},
    title: {type: String},
    content: {type: String}
})

module.exports = model('Message', Message)