angular.module('contactCtrl', [])

	.controller('contactCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
		console.log($rootScope.userData);
	}])