app.controller('UserController', ['$scope', 'BoardFactory', function($scope, BoardFactory){
    $scope.login = function(user){
        console.log(user);
        BoardFactory.login(user)
    }
    $scope.register = function(user){
        console.log(user);
        BoardFactory.register(user);
    }
}]);
