// JavaScript source code
var mongoose = require("mongoose");
var bc = require("bcryptjs");
var jwt = require("jsonwebtoken");
var UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    created:{type:Date,default:Date.now()}
})

UserSchema.methods.setPassword = function (p) {
    this.salt = bc.genSaltSync(10);
    this.hash = bc.hashSync(p,this.salt)
}

UserSchema.methods.verifyPassword = function (p) {
    var hash = bc.hashSync(p, this.salt);
    return hash === this.hash;
}

UserSchema.methods.generateToken = function () {
    return jwt.sign({
        username: this.username,
        id:this._id
    }, "SECRETCODEFROMHEAVENNOBODYCANCRACK")
}

module.exports = mongoose.model("User",UserSchema)