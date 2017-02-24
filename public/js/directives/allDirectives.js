angular.module('allDirectives', [])
	
	.directive('navBar', function() {
		return {
			restrict: 'E',
			templateUrl: '../views/nav-bar.html'
		};
	})

	.directive('sideNav', function() {
		return {
			restrict: 'E',
			templateUrl: '../views/side-nav.html'
		}
	})

	.directive('hiddenSideNav', function() {
		return {
			restrict: 'E',
			templateUrl: '../views/hidden-side-nav.html'
		}
	})