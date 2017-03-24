var app = angular.module('app', ['ngRoute', 'ngMessages']);
app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/login.html',
            controller: 'UserController'
        })
        .when('/dashboard', {
            templateUrl: 'partials/dash.html',
            controller: 'DashController'
        })
        .when('/topic/:id', {
            templateUrl: 'partials/topic.html',
            controller: 'TopicController'
        })
        .when('/user/:id', {
            templateUrl: 'partials/user.html',
            controller: 'UserPageController'
        })
        .otherwise({
            redirectTo: '/'
        })
})
