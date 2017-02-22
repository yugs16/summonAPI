 angular.module('IndexCtrl')
	
	.controller('indexCtrl', ['$scope', '$mdDialog', function($scope, $mdDialog) {

		$scope.signupDialog = function(ev) {
			$mdDialog.show({
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

		$scope.signinDialog = function(ev) {
			$mdDialog.show({
				controller : signinDialogController,
				templateUrl: '../views/signinDialog.html',
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

	// signinDialog controller
	
		function signinDialogController($scope,$mdDialog){
			$scope.siginDetails=function(){
				
			}
		};

	}]);