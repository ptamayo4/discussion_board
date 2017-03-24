app.controller('TopicController', ['$scope', '$routeParams', 'BoardFactory', function($scope, $routeParams, BoardFactory){
    function currentUser(){
        BoardFactory.currentUser(function(data){
            $scope.user = data;
            console.log($scope.user);
        });
    }
    currentUser();
    function getSingle(postId){
        BoardFactory.getSingle(postId, function(data){
            $scope.post = data;
        })
    }
    getSingle($routeParams.id)
    $scope.addResponse = function(newResponse){
        var postId =  $routeParams.id
        BoardFactory.addResponse(newResponse, postId, getSingle);
        $scope.newResponse = {};
    }
    $scope.addComment = function(newComment, responseId){
        var postId =  $routeParams.id
        BoardFactory.addComment(newComment, responseId, getSingle, postId);
        $scope.newComment = {};
    }
    $scope.upVote = function(responseId){
        BoardFactory.upVote(responseId);
        getSingle($routeParams.id);
    }
    $scope.downVote = function(responseId){
        BoardFactory.downVote(responseId);
        getSingle($routeParams.id)
    }
}])
