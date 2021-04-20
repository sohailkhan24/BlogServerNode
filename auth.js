const { response } = require('express');
const jwtUtil = require('./jwtUtil');

module.exports =function(app,db){
    const crypto =require('crypto');
  

    app.post("/user/register",function(req,res){
        req.body.salt =crypto.randomBytes(20).toString("hex"); 
        var passwordHash =crypto.pbkdf2Sync(req.body.password,req.body.salt,1000,64,"sha512").toString("hex");
        req.body.password=passwordHash;
        db.addUser(req.body,function(user){
            res.send(user);
        })
    });

    app.post("/user/login",function(req,res){
        const name= req.body.name;
        const password= req.body.password;

        db.login({name,password},userdetail => {
            if(!userdetail){
                response.send(401)
            }else{
                var token =jwtUtil.signJwt(name);
                res.send(token);

            }
        })
    });

    app.post("/user/auth", function(request, response) {
        var valid = jwtUtil.verifyJwt(request.body.token);
        response.send(valid != false);
    });

}