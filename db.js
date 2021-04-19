const { text } = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/blogangular`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    key: {
        type:  String,

    },
    date:{
        type: Date,

    },
    content:{
        type: String,

    },
    description:{
        type: String,

    },
    imageUrl:{
        type: String,

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
// Article.create({
//     title: 'My first Article',
//    content: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',
//    description: 'This is my first article',
//    key: 'my-first-article',
//    date: new Date(),
//    imageUrl: 'https://getwallpapers.com/wallpaper/full/e/b/8/1526301.jpg',
//    viewCount: 0,
//    published:true
// });



getArticles = function(callback){
 Article.find({published:true}).sort('-date').then(articles => callback(articles));
};

getArticleByKey = function(options,callback){
    Article.findOne({key:options.key,published:true}).then(article => {
        // if(article != null){
        //         article.update({viewCount: viewCount+1} )
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

module.exports = db;
module.exports.getArticles = getArticles;
module.exports.getArticleByKey  = getArticleByKey;
module.exports.getDashboardArticles = getDashboardArticles;
module.exports.updateArticlePublishedState = updateArticlePublishedState;
module.exports.getDashboardArticleByKey = getDashboardArticleByKey;
module.exports.updateArticle = updateArticle;