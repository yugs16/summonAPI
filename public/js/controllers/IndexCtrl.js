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
			
			// close loginDialog
			$scope.closeLoginDialog = function() {
				$location.path('/login-account');
				$mdDialog.hide();
			}
		};


	}]);