app.controller('DashController', ['$scope', 'BoardFactory', function($scope, BoardFactory){
    function currentUser(){
        BoardFactory.currentUser(function(data){
            $scope.user = data;
            console.log($scope.user);
        });
    }
    currentUser();
    function getPosts(){
        BoardFactory.getPosts(function(data){
            $scope.posts = data
        })
    }
    getPosts();
    $scope.addPost = function(post){
        BoardFactory.addPost(post, getPosts)
        $scope.newPost = {}
    }
}])
