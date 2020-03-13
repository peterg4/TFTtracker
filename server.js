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
var riotRequest = new RiotRequest('RGAPI-386e0db4-3fd2-495f-8a91-7804274bc0af');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile('/index.html');
});

http.listen(3000, function(){
    console.log('Server up on *:3000');
  });
