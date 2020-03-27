// jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req,res) => {
var city = req.body.cityName;
  console.log(city);

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c3f53dee4a3db3b3e19c1addfba0f1a4&units=metric#';

  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
    // console.log(weatherData.main.temp);
    // console.log(weatherData.weather[0].description);
    // console.log(data);

      res.write('<h1>The temperature in ' + city + ' now is: ' + temp + ' degrees</h1>');
      res.write('<p>And it has ' + desc + '.</p>');
      res.write('<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png">');
      res.send();

      });
    });
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
