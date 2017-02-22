angular.module('appRoutes',[])


.config(function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'index.html'
            // controller: 'mainCtrl'
		})
		/*.when('/login', {
			templateUrl: 'app/views/pages/login.html'
		})*/
		.when('/none',{
          templateUrl:'views/none.html'
		})

		.when('/signin',{
          templateUrl:'../views/none.html'
		});

	$locationProvider.html5Mode(true);

});
