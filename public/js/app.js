(function() {
	'use strict';
	
	angular.module('app', ['ngMaterial', 'ngRoute', 'ngCookies', 'ngMdIcons', 'appRoutes', 'sideNavCtrl', 'homeCtrl', 'aboutCtrl', 'teamCtrl',
 	'contactCtrl', 'sideNavCtrl', 'hiddensideNavCtrl', 'createAccountCtrl', 'loginCtrl', 'addPostCtrl', 'postDetailCtrl', 'allDirectives', 'allServices'])

		.config(['$mdThemingProvider', function($mdThemingProvider) {
				$mdThemingProvider.theme('default')
				.primaryPalette('grey', {
					'default' : '100',
					'hue-1' : '800',
					'hue-2' : '600'
				})
				.accentPalette('red');
		}]);
})();