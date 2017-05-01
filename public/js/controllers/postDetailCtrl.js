(function() {
	'use strict';
	angular.module('postDetailCtrl', [])
		.controller('postDetailCtrl', function($scope, $routeParams, postDetailService) {
			console.log($routeParams);
			postDetailService.getPostDetails($routeParams)
				.then(function(resp) {
					$scope.detailedData = resp.data;
					$scope.private_post = resp.data.post.private_post;
					$scope.public_post = resp.data.post.public_post;
					console.log(resp.data);
				}, function errorCallback(err) {
					console.log('error occured', err);
				});
		})
})();