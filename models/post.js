// JavaScript source code
var mongoose = require("mongoose");
var PostSchema = new mongoose.Schema({
    content: String,
    created: { type: Date, default: Date.now() },
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    upvotes: [{type:String}]
})


module.exports = mongoose.model("Post",PostSchema)