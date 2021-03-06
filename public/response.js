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
function sortMatches(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
app.controller("stonk-controller", ['$scope','$http','$sce',function($scope, $http, $sce) {
    $scope.list = [];
    $scope.tier = "";
    $scope.league = "/challenger"
    $scope.currid = 'chal';
    $scope.matches = [];
    $scope.view = 0;
    $scope.pageLimit = 100;
    $scope.search = ['Loading...','favico.png'];
    $scope.traitName =''
    $scope.getItems = function(league) {
        $scope.league = league
        $scope.list = [];
        if($scope.league == '/challenger' || $scope.league == '/grandmaster' || $scope.league == '/master') {
            $http.get($scope.league).then(function(data) {
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
                    entry.push('');
                    entry.push('/ranked-emblems/'+$scope.tier.toLowerCase()+'.png');
                    if(unsorted_list[i][6])
                        entry.push($sce.trustAsHtml('<img class="streak" src="favico.png">'));
                    else
                        entry.push("");
                    $scope.list.push(entry);
                }
            })
        } else {
            $http.get($scope.league).then(function(data) {
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
                        entry.push($sce.trustAsHtml(' '));
                    $scope.list.push(entry);
                }
            })
        }
    }
    $scope.findTrait = function(key) {
        
    }
    $scope.search_ = function(name) {
        $scope.view = 1;
        $scope.search = ['Loading...','giphy.gif','...','...','...','...','...','...'];
        $scope.matches = [];
        $http.get("/search?name="+name).then(function(data) {
            $scope.matches = [];
            $scope.search = [];
            console.log(data);
            $scope.search.push(data.data.entries.name)
            $scope.search.push('http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/'+data.data.entries.profileIconId+'.png');
            $scope.search.push(data.data.entries.tier);
            $scope.search.push(data.data.entries.rank);
            $scope.search.push(data.data.entries.wins);
            $scope.search.push(data.data.entries.wins+data.data.entries.losses);
            $scope.search.push(data.data.entries.summonerLevel);
            $scope.search.push(data.data.entries.leaguePoints);
            $http.get('/traits.json').then(function(res){
                $http.get('/champions.json').then(function(chars){
                    console.log(chars);
                    for(var i = 0; i < 10; i++) {
                        for(var j = 0; j < 8; j++) {
                            if(data.data.entries[i].metadata.participants[j] == data.data.entries.puuid) {
                                var entry = [];
                                entry.push((Date.now()-data.data.entries[i].info.game_datetime)/3600000);
                                entry.push("#" + data.data.entries[i].info.participants[j].placement);
                                entry.push(data.data.entries[i].info.game_length/60);
                                entry.push(data.data.entries[i].info.participants[j].level);
                                entry.push(data.data.entries[i].info.participants[j].gold_left)
                                entry.push(parseInt(data.data.entries[i].info.game_length%60));
                                if(entry[5] < 10) {
                                    entry[5] = '0'+parseInt(entry[5]);
                                }
                                if(data.data.entries[i].info.queue_id == 1100) {
                                    entry.push('Ranked');
                                } else {
                                    entry.push('Normal');
                                }
                                var sub_entry = [];
                                for(var k = 0; k < data.data.entries[i].info.participants[j].units.length; k++) {
                                    var subsub = [];
                                    subsub.push(data.data.entries[i].info.participants[j].units[k].character_id.substring(5).toLowerCase());
                                    subsub.push('border-rare'+data.data.entries[i].info.participants[j].units[k].rarity);
                                    subsub.push(data.data.entries[i].info.participants[j].units[k].character_id.substring(5));
                                    for(var l = 0; l < chars.data.length; l++) {
                                        if(chars.data[l].championId == data.data.entries[i].info.participants[j].units[k].character_id) {
                                            subsub.push(chars.data[l].name);
                                        }
                                    }
                                    sub_entry.push(subsub);
                                }
                                entry.push(sub_entry);
                                var trait_list = [];
                                for(var k = 0; k < data.data.entries[i].info.participants[j].traits.length; k++) {
                                    if(data.data.entries[i].info.participants[j].traits[k].tier_current > 0) {
                                        sub_entry = [];
                                        sub_entry.push(data.data.entries[i].info.participants[j].traits[k].num_units);
                                        sub_entry.push(data.data.entries[i].info.participants[j].traits[k].name);
                                        sub_entry.push(data.data.entries[i].info.participants[j].traits[k].style);
                                        sub_entry.push(sub_entry[1].toLowerCase());
                                            for(var l = 0; l < res.data.length; l++) {
                                                if(res.data[l].key == sub_entry[1]) {
                                                    sub_entry.push(res.data[l].name);
                                                }
                                            }
                                        trait_list.push(sub_entry);
                                    }
                                }
                                trait_list.sort(sortFunction);
                                entry.push(trait_list);
                                $scope.matches.push(entry);
                            }
                        }
                    }
                    $scope.matches.sort(sortMatches);
                })
            })
        })
    }
    $scope.changeActive = function(id) {
        document.getElementById($scope.currid).className = 'col-sm'; 
        document.getElementById(id).className = 'col-sm active';
        $scope.currid = id;
    }
}]);

