var app = angular.module('kB',['ngRoute']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	      when('/catagories',{
	      	templateUrl:'views/catagories.view.html',
	      	controller :'CatagoriesCtrl'
	      }).
	      when('/articles',{
	      	templateUrl:'views/articles.view.html',
	      	controller :'ArticlesCtrl'
	      }).
	      when('/articles/details/:id',{
	      	templateUrl:'views/article_details.view.html',
	      	controller :'ArticleDetailsCtrl'
	      }).
	      when('/articles/catagory/:catagory',{
	      	templateUrl:'views/cat_articles.view.html',
	      	controller :'ArticlesCatagoryCtrl'
	      }).
	      when('/articles/add',{
			templateUrl: 'views/add_article.view.html',
			controller: 'ArticleCreateCtrl'
		}).
		when('/articles/edit/:id',{
			templateUrl: 'views/edit_article.view.html',
			controller: 'ArticleEditCtrl'
		}).
		otherwise({redirectTo: '/catagories'})
}]);