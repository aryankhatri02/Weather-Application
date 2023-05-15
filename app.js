const express=require("express");
const bodyparser=require("body-parser");

const https=require("https");
const app= express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.get('/', function(req,res){
    res.sendFile(__dirname+"/index.html");
    

   
    
})
app.post("/", function(req,res){
    console.log(req.body.cityname);
    const query=req.body.cityname;
const apikey="fb47bd1f03bd712187526b2807996685";
const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apikey+'&units=metric'
https.get(url, function(response){
    console.log(response.statusCode);

    response.on('data', function(data) {
        
       const weatherdata= JSON.parse(data);
          const temperature=weatherdata.main.temp
          const weatherdescription=weatherdata.weather[0].description
         const icon=weatherdata.weather[0].icon
         const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
         res.write("<p>the weather is currently "+weatherdescription)
         res.write("<h1>the temperature in "+query+" is "+temperature+" degrees celsius</h1> ");
        res.write("<img src="+imageurl+">");
       res.send();


})


    })
});




app.listen(3000, function(){
    console.log("server is running on port 3000")
});
