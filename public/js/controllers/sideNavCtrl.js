(function() {
	'use strict';
	angular.module('sideNavCtrl', [])
		.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
				$scope.toogleleft = function () {
					$mdSidenav('hiddenNavBar').open();
				};
	  });
})();