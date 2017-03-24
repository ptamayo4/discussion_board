var mongoose = require('mongoose')
var User = mongoose.model('User')
var Post = mongoose.model('Post')
var Response = mongoose.model('Response')
var Comment = mongoose.model('Comment')

module.exports = {
    register: function(req,res){
        var user = new User(req.body);
        user.save(function(err,data){
            if(err){
                console.log(err);
            } else {
                req.session.user = data;
                res.sendStatus(200)
            }
        })
    },
    login: function(req,res){
        console.log(req.body);
        User.findOne({name: req.body.name}, function(err,data){
            if(data == null){
                res.status(400).send("User Not Found");
            } else {
                req.session.user = data;
                res.sendStatus(200)
            }
        })
    },
    current: function(req,res){
        if(req.session.user){
            res.json(req.session.user);
        } else {
            res.status(401).send("No User in Session")
        }
    },
    logout: function(req,res){
        console.log("Logging user out");
        req.session.destroy();
        res.redirect('/');
    },
    getPosts: function(req,res){
        Post.find({}).populate('_user').exec(function(err,posts){
            if(err){
                console.log(err);
            } else {
                res.json(posts)
            }
        })
    },
    getSingle: function(req,res){
        Post.findOne({_id: req.params.id}).populate('_user').populate({path: 'responses', populate: {path: '_user'}}).populate({path: 'responses', populate: {path: 'comments', populate: {path: '_user'}}}).exec(function(err,data){
            if(err){
                console.log(err);
            } else {
                res.json(data)
            }
        })
    },
    addPost: function(req,res){
        var post = new Post(req.body)
        post._user = req.session.user
        post.save(function(err,post){
            if(err){
                console.log(err);
            } else {
                User.findOne({_id: req.session.user._id}, function(err,user){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("NAH");
                        user.topics.push(post)
                        user.save(function(err,data){
                            if(err){
                                console.log(err);
                            } else {
                                res.sendStatus(200);
                            }
                        })
                    }
                })
            }
        })
    },
    addResponse: function(req,res){
        Post.findOne({_id: req.params.postId}, function(err, post){
            if(err){
                res.status(400).send("Couldn't find the post")
            } else {
                var newRes = new Response(req.body)
                newRes._user = req.session.user._id;
                newRes.save(function(err,finalRes){
                    if(err){
                        console.log("ERROR");
                    } else {
                        post.responses.push(finalRes);
                        post.save(function(err, updatedPost){
                            if(err){
                                res.status(400).send("Didn't save post right")
                            } else {
                                User.findOne({_id: req.session.user._id}, function(err,user){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        console.log("NAH");
                                        user.responses.push(finalRes)
                                        user.save(function(err,data){
                                            if(err){
                                                console.log(err);
                                            } else {
                                                res.sendStatus(200);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    addComment: function(req,res){
        Response.findOne({_id:req.params.responseId}, function(err,response){
            if(err){
                res.status(400).send('We aint found shit')
            } else {
                var newComment = new Comment(req.body)
                newComment._user = req.session.user._id;
                newComment._response = response;
                newComment.save(function(err,finalComment){
                    if(err){
                        res.status(400).send('Fucked up when saving')
                    } else {
                        response.comments.push(finalComment);
                        response.save(function(err,updatedResponse){
                            if(err){
                                res.status(400).send("Fucked up when saving response")
                            } else {
                                User.findOne({_id: req.session.user._id}, function(err,user){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        console.log("NAH");
                                        user.comments.push(finalComment)
                                        user.save(function(err,data){
                                            if(err){
                                                console.log(err);
                                            } else {
                                                res.sendStatus(200);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    upVote: function(req,res){
        Response.findOne({_id: req.params.responseId}, function(err, response){
            if(err){
                console.log(err);
            } else {
                response.upvotes = response.upvotes + 1;
                response.save(function(err, updatedResponse){
                    if(err){
                        console.log(err);
                    } else {
                        res.sendStatus(200);
                    }
                })
            }
        })
    },
    downVote: function(req,res){
        Response.findOne({_id: req.params.responseId}, function(err, response){
            if(err){
                console.log(err);
            } else {
                response.downvotes = response.downvotes + 1;
                response.save(function(err, updatedResponse){
                    if(err){
                        console.log(err);
                    } else {
                        res.sendStatus(200);
                    }
                })
            }
        })
    },
    getUser: function(req,res){
        User.findOne({_id: req.params.userId}, function(err, user){
            if(err){
                console.log(err);
            } else {
                res.json(user)
            }
        })
    }
}
