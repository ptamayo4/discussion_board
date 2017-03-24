app.factory('BoardFactory', ['$location', '$http', function($location, $http){
    var factory = {}
    factory.login = function(user){
        console.log(user);
        $http({
            url:'/login',
            method: 'POST',
            data: user
        }).then(function(res){
            console.log(res.data);
            $location.url('/dashboard')
        });
    }
    factory.register = function(user){
        console.log(user);
        $http({
            url: '/register',
            method: 'POST',
            data: user
        }).then(function(res){
            console.log(res);
            $location.url('/dashboard')
        })
    }
    factory.currentUser = function(callback){
        $http({
            url: '/current',
            method: 'GET'
        }).then(function(res){
            callback(res.data)
        }, function(res){
            $location.url('/')
            console.log(res);
        })
    }
    factory.addPost = function(post, callback){
        $http({
            url: '/posts',
            method: 'POST',
            data: post
        }).then(function(res){
            callback();
            console.log(res);
        })
    }
    factory.addResponse = function(newResponse, postId, callback){
        console.log('respones is ', newResponse)
        console.log('ID is ', postId)
        $http({
            url: '/response/' + postId,
            method: 'POST',
            data: newResponse
        }).then(function(res){
            callback(postId);
            console.log(res);
        })
    }
    factory.addComment = function(newComment, responseId, callback, postId){
        $http({
            url: '/comments/' + responseId,
            method: 'POST',
            data: newComment
        }).then(function(res){
            callback(postId)
        })
    }
    factory.getPosts = function(callback){
        $http({
            url: '/posts',
            method: 'GET'
        }).then(function(res){
            callback(res.data)
        })
    }
    factory.getSingle = function(postId, callback){
        $http({
            url: '/single/' + postId,
            method: 'GET',
            data: callback
        }).then(function(res){
            callback(res.data)
        })
    }
    factory.upVote = function(responseId){
        $http({
            url: '/upvote/' + responseId,
            method: 'GET'
        }).then(function(res){

        })
    }
    factory.downVote = function(responseId){
        $http({
            url: '/downvote/' + responseId,
            method: 'GET'
        }).then(function(res){

        })
    }
    factory.getUser = function(userId, callback){
        $http({
            url: '/user/' + userId,
            method: 'GET'
        }).then(function(res){
            callback(res.data)
        })
    }
    return factory;
}]);
