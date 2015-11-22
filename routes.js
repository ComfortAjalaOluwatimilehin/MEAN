// JavaScript source code
var express = require("express");
var router = express.Router();
var User = require("./models/user");
var Post  = require("./models/post")
//=================PARAMS====================

//=================NEW USER===============
router.post("/api/newuser", function (req, res, next) {
    User.findOne({ username: req.body.username }, function (err, used) {
        if (err) return next(err);
        if (used) return res.status(401).json({ message: "Username is already in use" })
        var user = new User();
        user.username = req.body.username;
        user.setPassword(req.body.password);
        user.save(function (err, newuser) {
            if (err) return next(err);
            res.status(200).json({ token: newuser.generateToken() })
        })
    })
   
})

router.post("/api/user", function (req, res, next) {
    User.findOne({username:req.body.username},function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: "User does not exist " })
        if (!user.verifyPassword(req.body.password)) { return res.status(401).json({ message: "User datails do not match" }) }
        return res.status(200).json({token:user.generateToken()})
    })
})

//===========================NEW POST
router.post("/api/newtweet", function (req, res, next) {

    var post = new Post(req.body);
    post.save(function (err, newpost) {
        if (err) return next(err);
        res.status(200).json(newpost);
    })
    
})
//=================GET ALL POSTS 
router.get("/api/posts", function (req, res, next) {
    Post.find().sort("created").populate("author").exec(function(err,posts){if(err){return next(err)} return res.status(200).json(posts)})
})
//=====================EDIT POST
router.post("/api/postid/edit", function (req, res, next) {
    Post.findOne({ _id: req.body.id }, function (err, post) {
        if (err) return next(err)
        if (!post) return res.status(400).json({ message: "Post does not exist" })
        post.content = req.body.content;
        post.save(function (err, newpost) {
            if (err) return next(err);
           return res.status(200).json(newpost)
        })
    })
})
//=======================DELETE POST
router.post("/api/post/delete", function (req, res, next) {
    Post.findOne({_id: req.body.id }, function (err, post) {
        if (err) return next(err);
        if (!post) return res.status(400).json({ message: "Post could not be found" })
        post.remove(function (err) {
            if (err) return next(err);
            return res.status(200).json({message:"Post deleted"})
        })
    })
})
//=======================LIKE POST
router.post("/api/post/like", function (req, res, next) {
    Post.findOne({ _id: req.body.id }, function (err, post) {
        if (err) return next(err)
        if (!post) return res.status(400).json({ message: "Post could not be found" })
        if (post.upvotes.indexOf(req.body.user) < 0) {
            post.upvotes.push(req.body.user); post.save(function (err, edit) {
                if (err) return next(err);
                return res.status(200).json({status:"liked"},edit)
            })
        }
        else {
            var i = post.upvotes.indexOf(req.body.user);
            post.upvotes.splice(i, 1);
            post.save(function (err, edit) {
                if (err) return next(err);
                return res.status(200).json({status:"Unliked"},edit)
            })
        }
    })
})
module.exports = router;