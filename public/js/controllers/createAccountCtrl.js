angular.module('createAccountCtrl', [])

	.controller('createAccountCtrl', ['$scope', '$location', 'signupService', function($scope, $location, signupService) {
		$scope.createAccount = function() {
			var data = {
					"username" : $scope.user.email,
					"password" : $scope.user.password 
				};
				console.log(data);
				signupService.userSignup(data)
					.success(function(data, status, headers, config) {
						console.log(data);
						$location.path('/home');
					}).error(function(){

					})
		}
	}])