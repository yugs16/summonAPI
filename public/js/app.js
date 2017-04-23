angular.module('app', ['ngMaterial', 'ngRoute', 'ngCookies', 'ngMdIcons', 'appRoutes', 'sideNavCtrl', 'homeCtrl', 'aboutCtrl', 'teamCtrl',
 'contactCtrl', 'hiddensideNavCtrl', 'createAccountCtrl', 'loginCtrl', 'allDirectives', 'allServices'])

 .config(function($mdThemingProvider) {
	    $mdThemingProvider.theme('default')
	    .primaryPalette('brown')
	    .accentPalette('red');
})