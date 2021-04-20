const express = require('express');
const cors =require('cors');
const bodyParser =require('body-parser');
const app =express();

const db =require("./db");
var corsOptions = {
    orgin: ["http://localhost:4200", "http://localhost:8000"]
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(8000, () => {
    console.log("Server is started and  listening to you");
});


app.get("/",function(req,res){
    res.send("Api running :)");
});

require("./article.js")(app, db);
require("./dashboard.js")(app,db);
require("./auth.js")(app,db);



