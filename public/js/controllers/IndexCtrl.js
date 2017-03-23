 angular.module('IndexCtrl',[])
	
	.controller('indexCtrl', ['$scope', '$mdDialog', 'signupService', 'signinService', function($scope, $mdDialog, signupService, signinService) {

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
		function loginDialogController($scope, $mdDialog){
			$scope.loginAccount = function(){
				var data = {
					"username" : $scope.user.userName,
					"email" : $scope.user.email,
					"password" : $scope.user.password 
				};
				signupService.userSignup(data)
					.success(function(data, status, headers, config) {
					})
			}
			// close loginDialog
			$scope.closeLoginDialog = function() {
				$mdDialog.hide();
			}
		};


	}]);