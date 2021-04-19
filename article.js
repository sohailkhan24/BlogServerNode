
module.exports = function(app , db) {
    app.get("/articles" , function(req,res){
        db.getArticles(function(Articles){
            res.send(Articles);
        })
    });

    app.get("/articles/:key",function(req,res){
        db.getArticleByKey({key: req.params.key},function(Article){
            res.send(Article);
        })
    })
};