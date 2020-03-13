


// Instantiate the myApp Angular application that we attached to out html tag
var app = angular.module("stonks", []);
// Here is the Javascript for our controller which we linked (scoped) to the body tag
app.controller("stonk-controller", ['$scope','$http',function($scope, $http) {
    $scope.list = [];
    $scope.tier = "";
    $scope.getItems = function() {
        $http.get("/challenger").then(function(data) {
            // do something with the tracks
            console.log(data);
            $scope.tier = data.data.entries.tier;
            for(var i = 0; i < data.data.entries.entries.length; i++) {
                $scope.list.push(data.data.entries.entries[i].summonerName);
            }
        })
    }
}]);

