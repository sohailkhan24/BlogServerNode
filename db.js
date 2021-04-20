const { text } = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
mongoose.connect(`mongodb://localhost/blogangular`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    password: {
        type:  String,
        required:true,

    },
    salt: {
        type:  String,
        required:true,
    }
    

})
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    key: {
        type:  String,
        required:true,

    },
    date:{
        type: Date,

    },
    content:{
        type: String,
        required:true,

    },
    description:{
        type: String,
        required:true,

    },
    imageUrl:{
        type: String,
        required:true,

    },
    viewCount:{
        type: Number,
    },
    published:{
        type: Boolean,
    }
   

 
// },{
//     unique: true
});

const Article = mongoose.model('Article', articleSchema);
const User = mongoose.model('User', userSchema);




getArticles = function(callback){
 Article.find({published:true}).sort('-date').then(articles => callback(articles));
};

getArticleByKey = function(options,callback){
    Article.findOne({key:options.key,published:true}).then(article => {
        // if(article != null){
        //         article.update({viewCount: ++article.viewCount} )
        //     }
        //     console.log(article.viewCount);
    callback(article)});
};


getDashboardArticles = function(callback){
    Article.find().sort('-date').then(articles => callback(articles));
};

updateArticlePublishedState =function(req,callback){
    Article.findOne({id:req.id}).then(function(article){
        if(article != null){
            article.update({
                published:req.published
            });    
        }
        callback(article);
    });
}

getDashboardArticleByKey =function(key,callback){
    Article.findOne({key:key}).then(article => callback(article));
}

updateArticle = function(req, callback) {
    Article.findOne({ id: req.id } ).then(function(article) {
      article.update({
        title:req.title,
        key: req.key,
        date: req.date,
        imageUrl: req.imageUrl,
        description: req.description,
        content: req.content
      });
      callback(article);
    });
  };

  
deleteArticle = function(id, callback) {
    Article.findOne({ id: id }).then(function(article) {
      if (article != null) {
        article.destroy().then(result => callback(result));
      } else {
        callback(null);
      }
    });
  };
  
  createArticle = function(request, callback) {
    Article.create({
      title: request.title,
      key: request.key,
      date: request.date,
      imageUrl: request.imageUrl,
      description: request.description,
      content: request.content
    }).then(article => callback(article));
  };


  addUser =function(user, callback){
      User.create({
          name:user.name.toLowerCase(),
          password:user.password,
          salt:user.salt,
      }).then(callback(true));
  }

  login = function(req,callback){
      User.findOne({name:req.name}).then(function(user){
          if(user!= null){
            
            var userpassword =crypto.pbkdf2Sync(req.password,user.salt,1000,64,"sha512").toString("hex");
            if(userpassword === user.password){
                callback(true);
                return;
            }
          }
          callback(false);
      });
  };


module.exports = db;
module.exports.getArticles = getArticles;
module.exports.getArticleByKey  = getArticleByKey;
module.exports.getDashboardArticles = getDashboardArticles;
module.exports.updateArticlePublishedState = updateArticlePublishedState;
module.exports.getDashboardArticleByKey = getDashboardArticleByKey;
module.exports.updateArticle = updateArticle;
module.exports.deleteArticle = deleteArticle;
module.exports.createArticle = createArticle;
module.exports.addUser = addUser;
module.exports.login = login;