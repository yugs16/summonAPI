angular.module('appRoutes', [])


.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/home', {
			templateUrl: '../views/home.html'
		})
		.when('/about', {
			templateUrl: '../views/about.html'
		})
		.otherwise({
          redirectTo:'/home'
		});

	$locationProvider.html5Mode(true);
	}
]);
