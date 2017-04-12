angular.module('createAccountCtrl', [])

	.controller('createAccountCtrl', ['$scope', '$location', 'signupService', function($scope, $location, signupService) {
		$scope.createAccount = function() {
			var data = {
					"email" : $scope.user.email,
					"password" : $scope.user.password,
					"username" : $scope.user.username
				};
				if (data.email === undefined || data.username === undefined || data.password === undefined) {
					alert('Please fill all fields');
				}else{
					signupService.userSignup(data)
						.then(function(data, status, headers, config) {
							console.log(data);
							$location.path('/login-account');
						}, function errorCallback(err) {
							console.log(err);
						})
				}
		}
	}])