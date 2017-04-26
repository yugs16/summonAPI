(function() {
	'use strict';
	angular.module('sideNavCtrl', [])
		.controller('sideNavCtrl', function ($scope, $timeout, $mdSidenav, $log, $location) {
			
			$scope.toogleleft = function () {
				$mdSidenav('hiddenNavBar').open();
			};

				// implement routing....
			// redirect to /home
			$scope.redirectHomePage = function() {
				$location.path('/home');
			}
			// redirect to /about
			$scope.redirectAboutPage = function() {
				$location.path('/about');
			}
			// redirect to /team
			$scope.redirectTeamPage = function() {
				$location.path('/team');
			}
			// redirect to /contact_us
			$scope.redirectContactPage = function() {
				$location.path('/contact_us');
			}
	  });
})();