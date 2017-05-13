angular.module('allDirectives', [])
	
	.directive('navBar', function() {
		return {
			restrict: 'E',
			templateUrl: '../views/directive-templates/nav-bar.html'
		};
	})

	.directive('sideNav', function() {
		return {
			restrict: 'E',
			templateUrl: '../views/directive-templates/side-nav.html'
		}
	})

	.directive('hiddenSideNav', function() {
		return {
			restrict: 'E',
			templateUrl: '../views/directive-templates/hidden-side-nav.html'
		}
	})
	.directive('spinnerDialog', function() {
		return {
			restrict: 'E',
			templateUrl: '../views/directive-templates/spinner.html'
		}
	})