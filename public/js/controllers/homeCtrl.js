angular.module('homeCtrl', [])

	.controller('homeCtrl', ['$scope', '$mdDialog', '$location', '$window', '$cookies', 'userDataService', function($scope, $mdDialog, $location, $window, $cookies, userDataService) {

		if ($cookies.get('connect_auth')) {
			userDataService.getData()
				.success(function(resp) {
					$scope.userData = resp;
					console.log(resp);
				})
				.error(function(err) {
					console.log(err);
				})
		}


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
			
			// close loginDialog
			$scope.closeLoginDialog = function() {
				$location.path('/login-account');
				$mdDialog.hide();
			}
		};

		$scope.logout = function() {
			$scope.userData.loggedOnUser = false;
			$cookies.remove('connect_auth');
			$window.location.href = '/';
		}
	}])