angular.module("kB")

.controller('CatagoriesCtrl',['$scope','$http',function($scope,$http){
   $http.get('/catagories').success(function(data){
   	  $scope.catagories=data;
   });
}]);