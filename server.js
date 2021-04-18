const express = require('express');
const cors =require('cors');

const app =express();

var corsOptions = {
    orgin: ["http://localhost:4200", "http://localhost:8000"]
}

app.use(cors(corsOptions));

app.listen(8000, () => {
    console.log("Server is started and  listening to you");
});


app.get("/",function(req,res){
    res.send("Hello node js :)");
});

require("./article.js")(app);

