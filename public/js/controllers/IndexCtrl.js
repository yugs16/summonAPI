 angular.module('IndexCtrl',[])
	
	.controller('indexCtrl', ['$scope', '$mdDialog', 'signupService', 'signinService', '$location', function($scope, $mdDialog, $location, signupService, signinService) {

		$scope.loginDialog = function(ev) {
			$mdDialog.show({
				controller : loginDialogController,
				templateUrl: '../views/signupDialog.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			})
			.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.status = 'You cancelled the dialog.';
			});
		};

		// loginDialog controller
		function loginDialogController($scope, $mdDialog, $location){
			$scope.loginAccount = function(){
				var data = {
					"username" : $scope.user.userName,
					"email" : $scope.user.email,
					"password" : $scope.user.password 
				};
				signupService.userSignup(data)
					.success(function(data, status, headers, config) {
						console.log(data);
						
					})
					.error(function(err) {
						console.log('error occured:' + err);
					})
			}
			// close loginDialog
			$scope.closeLoginDialog = function() {
				$location.path('/login-account');
				$mdDialog.hide();
			}
		};


	}]);