// Instantiate the myApp Angular application that we attached to out html tag
var app = angular.module("stonks", []);
// Here is the Javascript for our controller which we linked (scoped) to the body tag
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}
app.controller("stonk-controller", ['$scope','$http',function($scope, $http) {
    $scope.list = [];
    $scope.tier = "";
    $scope.getItems = function() {
        $http.get("/challenger").then(function(data) {
            // do something with the tracks
           
            console.log(data);
            $scope.tier = data.data.entries.tier;
            var unsorted_list = [];
            for(var i = 0; i < data.data.entries.entries.length; i++) {
                var entry = [];
                entry.push(data.data.entries.entries[i].leaguePoints);
                entry.push(data.data.entries.entries[i].summonerName);
                entry.push(data.data.entries.entries[i].leaguePoints + ' LP');
                entry.push(data.data.entries.tier);
                var x = data.data.entries.entries[i].wins;
                var y= data.data.entries.entries[i].losses;
                entry.push( parseInt(x/y*100) + '%');
                entry.push(x+y);
               // $scope.list.push(data.data.entries.entries[i].summonerName);
               unsorted_list.push(entry);
            }
            unsorted_list.sort(sortFunction);
            for(var i = 0; i < data.data.entries.entries.length; i++) {
                var entry = [];
                entry.push(i+1);
                entry.push(unsorted_list[i][1]);
                entry.push(unsorted_list[i][2]);
                entry.push(unsorted_list[i][3]);
                entry.push(unsorted_list[i][4]);
                entry.push(unsorted_list[i][5]);
                $scope.list.push(entry);
            }
            console.log($scope.list)

        })
    }
}]);

