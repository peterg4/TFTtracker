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
app.controller("stonk-controller", ['$scope','$http','$sce',function($scope, $http, $sce) {
    $scope.list = [];
    $scope.tier = "";
    $scope.league = "/challenger"
    $scope.currid = 'chal';
    $scope.view = 0;
    $scope.getItems = function(league) {
        $scope.league = league
        $scope.list = [];
        if($scope.league == '/challenger' || $scope.league == '/grandmaster' || $scope.league == '/master') {
            $http.get($scope.league).then(function(data) {
                // do something with the tracks
                console.log(data);
                $scope.tier = data.data.entries.tier;
                var unsorted_list = [];
                for(var i = 0; i < data.data.entries.entries.length; i++) {
                    var entry = [];
                    entry.push(data.data.entries.entries[i].leaguePoints);
                    entry.push(data.data.entries.entries[i].summonerName);
                    entry.push(data.data.entries.entries[i].leaguePoints + ' LP');
                    entry.push(data.data.entries.tier +' '+ data.data.entries.entries[i].rank);
                    var x = data.data.entries.entries[i].wins;
                    var y= data.data.entries.entries[i].losses;
                    entry.push( parseInt(x/y*100) + '%');
                    entry.push(x+y);
                    entry.push(data.data.entries.entries[i].hotStreak);
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
                    entry.push('http://avatar.leagueoflegends.com/na/'+unsorted_list[i][1].toLowerCase()+'.png');
                    entry.push('/ranked-emblems/'+$scope.tier.toLowerCase()+'.png');
                    if(unsorted_list[i][6])
                        entry.push($sce.trustAsHtml('<img class="streak" src="favico.png">'));
                    else
                        entry.push("");
                    $scope.list.push(entry);
                    //http://avatar.leagueoflegends.com/na/sneakyfiwa.png
                    //http://ddragon.leagueoflegends.com/cdn/10.5.1/img/profileicon/685.png
                }
            })
        } else {
            $http.get($scope.league).then(function(data) {
                // do something with the tracks
                console.log(data);
                $scope.tier = data.data.entries[0].tier;
                var unsorted_list = [];
                for(var i = 0; i < data.data.entries.length; i++) {
                    var entry = [];
                    entry.push(data.data.entries[i].leaguePoints);
                    entry.push(data.data.entries[i].summonerName);
                    entry.push(data.data.entries[i].leaguePoints + ' LP');
                    entry.push(data.data.entries[i].tier +' '+ data.data.entries[i].rank);
                    var x = data.data.entries[i].wins;
                    var y= data.data.entries[i].losses;
                    entry.push( parseInt(x/y*100) + '%');
                    entry.push(x+y);
                    entry.push(data.data.entries[i].hotStreak);
                // $scope.list.push(data.data.entries.entries[i].summonerName);
                unsorted_list.push(entry);
                }
                unsorted_list.sort(sortFunction);
                for(var i = 0; i < data.data.entries.length; i++) {
                    var entry = [];
                    entry.push(i+1);
                    entry.push(unsorted_list[i][1]);
                    entry.push(unsorted_list[i][2]);
                    entry.push(unsorted_list[i][3]);
                    entry.push(unsorted_list[i][4]);
                    entry.push(unsorted_list[i][5]);
                    entry.push('http://avatar.leagueoflegends.com/na/'+unsorted_list[i][1].toLowerCase()+'.png');
                    entry.push('/ranked-emblems/'+$scope.tier.toLowerCase()+'.png');
                    if(unsorted_list[i][6])
                        entry.push($sce.trustAsHtml('<img class="streak" src="favico.png">'));
                    else
                        entry.push("");
                    $scope.list.push(entry);
                }
            })
        }
    }
    $scope.search = function(name) {
        $http.get("/search?name="+name).then(function(data) {
            // do something with the tracks
            $scope.view = 1;
            $scope.list = [];
            $scope.list.push(data);
            console.log(data);
        })
    }
    $scope.changeActive = function(id) {
        document.getElementById($scope.currid).className = 'col-sm'; 
        document.getElementById(id).className = 'col-sm active';
        $scope.currid = id;
    }
}]);

