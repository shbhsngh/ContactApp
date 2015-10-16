'use strict';
// Declare app level module which depends on filters, and services
var app= angular.module('testApp',['ngRoute']);
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.
        when('/home',{templateUrl:'partials/home.html',controller:'AppCtrl'}).
        otherwise({redirectTo: '/home'});

}]);