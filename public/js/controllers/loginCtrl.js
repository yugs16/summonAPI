angular.module('loginCtrl', [])

	.controller('loginCtrl', ['$scope', '$location', 'signinService', function($scope, $location, signinService) {

		$scope.loginAccount = function(){
			var data = {
				"username" : $scope.user.username,
				"password" : $scope.user.password 
			};
			signinService.userSignin(data)
				.success(function(data, status, headers, config) {
					console.log(data);
					$location.path('/home');
				})
				.error(function(err) {
					console.log(err);
				})
		}		
	}])