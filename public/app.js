angular.module('app', [])

.controller('MainController',['$scope','$http', 'fileUpload', function($scope, $http, fileUpload){	
	$scope.uploadFile = function(){
       var file = $scope.myFile;
       
       console.log('file is ' );
       console.dir(file);
       
       var uploadUrl = "api/fileupload";
       fileUpload.uploadFileToUrl(file, uploadUrl);
    };
}])

.directive('fileModel', ['$parse', function ($parse) {
	return {
	restrict: 'A',
	link: function(scope, element, attrs) {
	  var model = $parse(attrs.fileModel);
	  var modelSetter = model.assign;
	  
  		element.bind('change', function(){
	         scope.$apply(function(){
	            modelSetter(scope, element[0].files[0]);
	         });
	      });
       }
    };
 }])

 .service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
       var fd = new FormData();
       fd.append('file', file);    
       $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })    
       .then(function(response){
       		console.log(response.data);
       })    
    }
 }]);