(function() {
	'use strict';
	angular.module('addPostCtrl', [])

	.controller('addPostCtrl', function($scope, $rootScope,$http) {
		var data={};
		data.title1= $scope.apiName;
		data.desc= $scope.apiDescription;
		data.link1= $scope.apiLink;
		data.tags1= $scope.apiTags;
		$scope.submitform=function(){
			$http.post("/api/addPost",data)
			.then(function(data	){
				console.log(data);
				console.log("post added successfully");

			});	
		}
	});
})();