var sC = require('../controllers/serverController.js')
module.exports = function(app){
    app.post('/register', sC.register);
    app.post('/login', sC.login);
    app.get('/current', sC.current);
    app.get('/logout', sC.logout);
    app.get('/posts', sC.getPosts);
    app.post('/posts', sC.addPost);
    app.get('/single/:id', sC.getSingle);
    app.post('/response/:postId', sC.addResponse);
    app.post('/comments/:responseId', sC.addComment);
    app.get('/upvote/:responseId', sC.upVote);
    app.get('/downvote/:responseId', sC.downVote);
    app.get('/user/:userId', sC.getUser);
}
