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
var api_key = 'RGAPI-aea22fe6-1c23-44dd-90ae-2aafc647316b';
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
        console.log(data);
        let url = ('https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/'+data.puuid+'/ids?count=20&api_key='+api_key);
     //   res.json({entries: data});
        request({
            url: url,
            json: true
        }, function (error, response, body) {
        
            if (!error && response.statusCode === 200) {
                console.log(body); // Print the json response
                let combined = {...data, ...body };
                console.log(combined);
                res.json({entries: combined});
            }
        })
    });
})

http.listen(3000, function(){
    console.log('Server up on *:3000');
 });
