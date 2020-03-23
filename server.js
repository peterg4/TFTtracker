// server init + mods
var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require("request");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
require('dotenv').config();
var api_key = 'RGAPI-3de0868b-94ea-4807-a03e-a4710ee491b9';
var RiotRequest = require('riot-lol-api');
var riotRequest = new RiotRequest(api_key);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile('/index.html');
});

app.get('/challenger', function(req, res) {
    riotRequest.request('na1', 'summoner', '/tft/league/v1/challenger', function(err, data) {
        console.log(data);
        res.json({entries: data});
    });
})
app.get('/grandmaster', function(req, res) {
    riotRequest.request('na1', 'summoner', '/tft/league/v1/grandmaster', function(err, data) {
        console.log(data);
        res.json({entries: data});
    });
})
app.get('/master', function(req, res) {
    riotRequest.request('na1', 'summoner', '/tft/league/v1/master', function(err, data) {
        console.log(data);
        res.json({entries: data});
    });
})
app.get('/diamond', function(req, res) {
    riotRequest.request('na1', 'summoner', '/tft/league/v1/entries/DIAMOND/I', function(err, data) {
        console.log(data);
        res.json({entries: data});
    });
})
app.get('/platinum', function(req, res) {
    riotRequest.request('na1', 'summoner', '/tft/league/v1/entries/PLATINUM/I', function(err, data) {
        console.log(data);
        res.json({entries: data});
    });
})
app.get('/gold', function(req, res) {
    riotRequest.request('na1', 'summoner', '/tft/league/v1/entries/GOLD/I', function(err, data) {
        console.log(data);
        res.json({entries: data});
    });
})
app.get('/silver', function(req, res) {
    riotRequest.request('na1', 'summoner', '/tft/league/v1/entries/SILVER/I?page=1', function(err, data) {
        console.log(data);
        res.json({entries: data});
    });
})
app.get('/bronze', function(req, res) {
    riotRequest.request('na1', 'summoner', '/tft/league/v1/entries/BRONZE/I?page=1', function(err, data) {
        console.log(data);
        res.json({entries: data});
    });
})
app.get('/iron', function(req, res) {
    riotRequest.request('na1', 'summoner', '/tft/league/v1/entries/IRON/I?page=1', function(err, data) {
        console.log(data);
        res.json({entries: data});
    });
})
app.get('/search', function(req, res) {
    riotRequest.request('na1', 'summoner', '/tft/summoner/v1/summoners/by-name/'+req.query.name, function(err, data) {
        var combined;
        let url = ('https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/'+data.puuid+'/ids?count=10&api_key='+api_key);
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var temp = {...data, ...body };
                //for each match in response data run api call on thing, change the match id to the data for each match.
                url = ('https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/'+temp.id+'?api_key='+api_key);
                request({
                    url: url,
                    json: true
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        combined = {...temp, ...body };
                        var req_count = 1;
                        for(var i = 1; i < 10; i++) {
                            console.log(combined[i]);
                            url = ('https://americas.api.riotgames.com/tft/match/v1/matches/'+combined[i]+'?api_key='+api_key);
                            request({
                                url: url,
                                json: true
                            }, function (error, response, body) {
                                console.log(body);
                                combined[req_count] = body;
                                req_count++;
                                if(req_count == 10) {
                                    console.log(combined);
                                    res.json({entries: combined});
                                }
                            })
                        }
                    }
                })
            }
        })
    });
})
http.listen(3000, function(){
    console.log('Server up on *:3000');
 });
