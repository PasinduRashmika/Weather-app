const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});


app.post("/", function(req, res){
    var city= req.body.cityName;
    var appid="99e75fc860bfca409438c4f8ce3cb080&units=metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid;

    https.get(url, function(response){
        console.log(response.statusCode)
                response.on("data", function(data){
                    const weatherData= JSON.parse(data);
                    const temp= weatherData.main.temp;
                    const icon=weatherData.weather[0].icon
                    const imageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
                    res.write("<h1>The temperature is "+city+" is "+temp+" degree Celcius.</h1>");
                    res.write("<img src="+imageURL+">");
                 });
         });

});

  

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
