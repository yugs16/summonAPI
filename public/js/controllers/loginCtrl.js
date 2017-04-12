angular.module('loginCtrl', [])

	.controller('loginCtrl', ['$scope', '$location', 'signinService', '$window', '$route', function($scope, $location, signinService, $window, $route) {

		$scope.loginAccount = function(){
			var data = {
				"username" : $scope.user.username,
				"password" : $scope.user.password 
			};
			signinService.userSignin(data)
				.success(function(data, status, headers, config) {
					console.log(data);
					if (data.success === false) {
						alert(data.message);
					} else {
						$window.location.href = '/';
					}
					// $location.path('/');
				})
				.error(function(err) {
					console.log(err);
				})
		}		
	}])