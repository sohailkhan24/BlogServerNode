module.exports =function(app,db){
    app.get("/dashboard/overview",function(req,res){
        db.getDashboardArticles(articles => res.send(articles));
    });

    app.post("/dashboard/article/publish",function(req,res){
        const id= req.body.id;
        const published =req.body.published;
        db.updateArticlePublishedState({id:id,published:published},function(article){
            res.send(article);
        });
    });

    app.get("/dashboard/article/:key",function(req,res){
        db.getDashboardArticleByKey(req.params.key,article => res.send(article));
    });

    app.put("/dashboard/article", function(req, res) {
        sql.updateArticle(req.body, function(result) {
          res.send(result);
        });
    });


    app.delete("/dashboard/article/:id",  function(req,res) {
        db.deleteArticle(req.params.id, result => {
          if (result != null) {
            res.send(result);
          } else {
            res.status(400).send({ message: "Article could not be deleted!" });
          }
        });
    });
    
    app.post("/dashboard/article", function(req, res) {
        sql.createArticle(req.body, function(result) {
          res.send(result);
        });
      });
}