


// Instantiate the myApp Angular application that we attached to out html tag
var app = angular.module("stonks", []);

// Here is the Javascript for our controller which we linked (scoped) to the body tag
app.controller("stonk-controller", ['$scope','$http',function($scope, $http) {

    $scope.getItems = function() {
    }
}]);

