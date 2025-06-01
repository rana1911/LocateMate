const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Lost", "Found"],
        required: true
    },
    // user_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // }
    userContact: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Item', itemSchema);