(function() {
	'use strict';
	angular.module('addPostCtrl', [])

		.controller('addPostCtrl', ['$scope', '$rootScope', 'addPostService', function($scope, $rootScope, $http, addPostService) {
			$scope.submitform=function(){
				var data={	
					"title" : $scope.apiName,
					"description" : $scope.apiDescription,
					"public_post": true,
					"private_post": false,
					"api_link" : $scope.apiLink
				};
				console.log(data);
				// addPostService.fuck().then(function(res) {console.log(res);})
				addPostService.addPostDetails(data)
					.then(function(res){
						console.log(res.data);
						console.log("post added successfully");
					}, function errorCallback(err) {
						console.log(err);
					});	
			}
		}]);
})();