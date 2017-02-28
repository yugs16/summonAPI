 angular.module('IndexCtrl',[])
	
	.controller('indexCtrl', ['$scope', '$mdDialog', '$route', 'signupService', function($scope, $mdDialog, $route, signupService) {

		$scope.signupDialog = function(ev) {
			$mdDialog.show({
				controller : signupDialogController,
				templateUrl: '../views/signupDialog.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			})
			.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
				console.log($scope.status);
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

	// signupDialog controller
	function signupDialogController($scope,$mdDialog){
		$scope.sigupDetails = function(){
			var data = {
				"fullName" : $scope.user.fullName,
				"email" : $scope.user.email,
				"password" : $scope.user.password 
			}
			console.log(data);
			signupService.userSignup(data)
				.success(function(data, status, headers, config) {
					console.log(data);
					$route.reload();
				})
		}
	};

	}]);