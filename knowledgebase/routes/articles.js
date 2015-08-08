var express = require('express');
var router = express.Router();

var Article = require('../models/article')

/* GET users listing. */
router.get('/', function(req, res, next) {
  Article.getArticles(function(err,articles){
  	if (err) {
  		console.log(err);
  	}
  	res.json(articles);
  })
});
router.get('/:id', function(req, res, next) {
  Article.getArticleById(req.params.id,function(err,article){
  	if (err) {
  		console.log(err);
  	}
  	res.json(article);
  })
});
router.get('/catagory/:catagory', function(req, res, next) {
  Article.getArticleByCatagory(req.params.catagory,function(err,articles){
  	if (err) {
  		console.log(err);
  	}
  	res.json(articles);
  })
});

router.post('/',function(req,res,next){
	//Get form values
	var title=req.body.title;
	var catagory=req.body.catagory;
	var body=req.body.body;

	//Article Object
	var newArticle = new Article({
		title:title,
		catagory:catagory,
		body:body
	});
	//Create Article
	Article.createArticle(newArticle,function(err,article){
		if (err) {
			console.log(err);
		}
		res.location('/articles');
		res.redirect('/articles') ;
	});
	
});

router.put('/',function(req,res,next){
	var id = req.body.id;

	var data= {
		title:req.body.title,
		catagory:req.body.catagory,
		body:req.body.body
	};
	//create article
	Article.updateArticle(id,data, function(err,article){
		if (err) {
         console.log(err);
         }
        res.location('/articles');
		res.redirect('/articles') ; 
	});
});
//Remove Article
router.delete('/:id',function(req,res,next){
	var id = req.params.id;

	Article.removeArticle(id, function(err,article){
		if (err) {
         console.log(err);
         }
        res.location('/articles');
		res.redirect('/articles') ; 
	}); 
});
module.exports = router;
