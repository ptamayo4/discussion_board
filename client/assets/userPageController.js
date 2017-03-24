app.controller('UserPageController', ['$scope', '$routeParams', 'BoardFactory', function($scope, $routeParams, BoardFactory){
    function currentUser(){
        BoardFactory.currentUser(function(data){
            $scope.user = data;
            console.log($scope.user);
        });
    }
    currentUser();
    function getUser(userId){
        BoardFactory.getUser(userId, function(data){
            $scope.user = data;
        })
    }
    getUser($routeParams.id);
}])
