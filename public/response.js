


// Instantiate the myApp Angular application that we attached to out html tag
var app = angular.module("stonks", []);
var call = 'https://na1.api.riotgames.com/tft/league/v1/grandmaster?api_key=RGAPI-386e0db4-3fd2-495f-8a91-7804274bc0af';
// Here is the Javascript for our controller which we linked (scoped) to the body tag
app.controller("stonk-controller", ['$scope','$http',function($scope, $http) {
    $scope.list = [];
    $scope.getItems = function() {
        var call = 'https://na1.api.riotgames.com/tft/league/v1/grandmaster?api_key=RGAPI-386e0db4-3fd2-495f-8a91-7804274bc0af';
        $http({method : 'GET',url : call})
            .success(function(data, status) {
                for(var i = 0; i < data.entries.length; i++) {
                    list.push(data.entries[i].summonerName);
                }
            })
            .error(function(data, status) {
                $scope.list = [];
                $scope.list.push("Bad API Call");
            });       
    }
}]);

