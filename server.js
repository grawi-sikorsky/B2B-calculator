const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/b2b-calculator'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/b2b-calculator/index.html'));});
app.listen(process.env.PORT || 8080);