var mongoose =require('mongoose');
var articleSchema = mongoose.Schema({
	title:{
		type:String,
		index:true,
		required:true
	},
	body:{
		type:String,
		required:true
	},
	catagory:{
		type:String,
		index : true,
		required:true
	},
	date:{
		type: Date,
		default:Date.now
	}
});

var Article= module.exports= mongoose.model('Article',articleSchema);

//Get all articles

module.exports.getArticles=function(callback){
	Article.find(callback);
}

//Get Article By  id

module.exports.getArticleById=function(id,callback){
	Article.findById(id,callback);
}

// Get catagory Articles

module.exports.getArticleByCatagory=function(catagory,callback){
	var query={
		catagory:catagory
	};
	Article.find(query,callback);
}
//Save Article
module.exports.createArticle=function(newArticle,callback){
	newArticle.save(callback);
}
//update Article

module.exports.updateArticle=function(id,data,callback){
	var title =data.title;
	var body =data.body;
	var catagory =data.catagory;

	var query ={_id:id};

	Article.findById(id,function(err,article){
		if (!article) {
			return next(new Error('Could not load article'));
		}else{
			//update
			article.title   =title;
			article.body    =body;
			article.catagory=catagory;

			article.save(callback);
		}
	});
}

//remove Article

module.exports.removeArticle=function(id,callback){

	Article.find({_id:id}).remove(callback);
}