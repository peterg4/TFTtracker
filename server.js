// server init + mods
var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
require('dotenv').config();
var RiotRequest = require('riot-lol-api');
var riotRequest = new RiotRequest('RGAPI-5a92594e-1b67-4a09-ad50-b1aa55615f1f');

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


http.listen(3000, function(){
    console.log('Server up on *:3000');
 });
