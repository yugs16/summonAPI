(function() {
	'use strict';
	angular.module('postDetailCtrl', [])
		.controller('postDetailCtrl', function($scope, $routeParams, postDetailService) {
			console.log($routeParams);
			postDetailService.getPostDetails($routeParams)
				.then(function(resp) {
					console.log(resp);
				}, function errorCallback(err) {
					console.log('error occured', err);
				});
		})
})();