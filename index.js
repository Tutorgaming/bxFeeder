const https = require('https');
var http = require('http');
var Feed = require('feed');

const express = require('express')
const app = express()

const options = {
    hostname: 'bx.in.th',
    port: 443,
    path: '/api/',
    method: 'GET'
};
var i = 0;
var parseData = '';
var feed;
setInterval(() => {
    https.request(options, (res) => {
        res.on('data', (d) => {
            var json = JSON.parse(d);
            var json_in = json['21'];
            parseData = json_in['primary_currency'] + "->" + json_in['secondary_currency'] + "===" + json_in['last_price'];
            console.log(parseData);

            feed = new Feed({
                title: 'Feed Title',
                description: 'This is my personal feed!',
                id: 'http://example.com/',
                link: 'http://example.com/',
                favicon: 'http://example.com/favicon.ico',
                copyright: 'All rights reserved 2013, John Doe',
                generator: parseData, // optional, default = 'Feed for Node.js' 
                feedLinks: {
                    json: 'https://example.com/json',
                    atom: 'https://example.com/atom',
                },
                author: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    link: 'https://example.com/johndoe'
                }
            });

            feed.addItem({
                title: 1,
                description: json_in['last_price'],
                content: parseData,
                guid : 1,
                id : 1,
                author: [{
                    name: 'TUTORGAMING',
                    email: 'TUTORGAMING@gmail.com',
                    link: 'TUTORGAMING'
                }]
            });
        });
    }).end();
}, 1000 * 10);


app.get('/feed', function (req, res) {
    res.set('Content-Type', 'application/rss+xml');
    res.send(feed.rss2());
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})