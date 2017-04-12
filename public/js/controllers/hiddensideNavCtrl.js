angular.module('hiddensideNavCtrl', [])

	.controller('hiddensideNavCtrl', ['$scope', '$rootScope', '$controller', '$location', '$mdSidenav', '$mdDialog', '$cookies', '$window', function($scope, $rootScope, $controller, $location, $mdSidenav, $mdDialog, $cookies, $window) {
		
		// console.log('hiddenCtrl');
		// $controller('homeCtrl', {$scope: $scope});
		// console.log('hiddenCtrl');
		// $scope.loginDialog;
		// $scope.logout;

		$rootScope.userData;

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
				$mdSidenav('hiddenNavBar').close();
				$mdDialog.hide();
			}
		};

		$scope.logout = function() {
			$scope.userData.loggedOnUser = false;
			$cookies.remove('connect_auth');
			$window.location.href = '/';
		}


		// implement routing....
		// redirect to /home
		$scope.redirectHomePage = function() {
			$location.path('/home');
			$mdSidenav('hiddenNavBar').close();
		}
		// redirect to /about
		$scope.redirectAboutPage = function() {
			$location.path('/about');
			$mdSidenav('hiddenNavBar').close();
		}
		// redirect to /team
		$scope.redirectTeamPage = function() {
			$location.path('/team');
			$mdSidenav('hiddenNavBar').close();
		}
		// redirect to /contact_us
		$scope.redirectContactPage = function() {
			$location.path('/contact_us');
			$mdSidenav('hiddenNavBar').close();
		}
	}])