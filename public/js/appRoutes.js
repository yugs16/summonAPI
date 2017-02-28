angular.module('appRoutes', [])


.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/home', {
			templateUrl: '../views/home.html'
		})
		.when('/about', {
			templateUrl: '../views/about.html'
		})
		.when('/contact_us', {
			templateUrl: '../views/contact_us.html'
		})
		.when('/team', {
			templateUrl: '../views/team.html'
		})
		.otherwise({
          redirectTo:'/home'
		});

	$locationProvider.html5Mode(true);
	}
]);
