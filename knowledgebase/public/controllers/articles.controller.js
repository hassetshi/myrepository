angular.module("kB")

.controller('ArticlesCtrl',['$scope','$http',function($scope,$http){
   $http.get('/articles').success(function(data){
   	  $scope.articles=data;
   });
}])

.controller('ArticlesCatagoryCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
   $http.get('/articles/catagory/'+$routeParams.catagory).success(function(data){
   	  $scope.cat_articles=data;
   	  $scope.catagory=$routeParams.catagory;
   });
}])

.controller('ArticleDetailsCtrl',['$scope','$http','$routeParams','$location',function($scope,$http,$routeParams,$location){
   $http.get('/articles/' + $routeParams.id).success(function(data){
   	  $scope.article=data;
   });

   $scope.removeArticle = function(){
      $http.delete('/articles/'+ $routeParams.id).success(function(data){
         console.log(data)
      });
      $location.path('/articles');
   }   

}])

.controller('ArticleCreateCtrl', ['$scope','$http','$routeParams', '$location', function($scope, $http, $routeParams, $location){
   $http.get('/catagories').success(function(data){
      $scope.catagories = data;
   });

   $scope.addArticle = function(){
      var data = {
         title: $scope.title,
         body: $scope.body,
         catagory: $scope.catagory
      }

      $http.post('/articles', data).success(function(data, status){
         console.log(status);
      });

      $location.path('/articles');
   }
}])

.controller('ArticleEditCtrl',['$scope','$http','$routeParams','$location', function($scope,$http,$routeParams,$location){
   $http.get('/catagories').success(function(data){
        $scope.catagories=data;
   });
   $http.get('/articles/'+$routeParams.id).success(function(data){
        $scope.article=data;
   });

   $scope.updateArticle= function(){
      var data = {
         id:   $routeParams.id,
         title: $scope.article.title,
         body:  $scope.article.body,
         catagory: $scope.article.catagory
      }
      $http.put('/articles',data).success(function(data,status){
         console.log(status);
      });
      $location.path('/articles');
   }
}])