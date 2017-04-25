(function() {
	'use strict';
	angular.module('homeCtrl', [])
		.controller('homeCtrl', ['$scope', '$rootScope', '$mdDialog', '$location', '$window', '$cookies', '$mdSidenav', 'userDataService', function($scope, $rootScope, $mdDialog, $location, $window, $cookies, $mdSidenav, userDataService) {

			if ($cookies.get('connect_auth')) {
				console.log('user data : ');
				userDataService.getData()
					.then(function(resp) {
						$rootScope.userData = resp.data;
						$rootScope.$broadcast('senddown', resp.data);
						console.log(resp);
					}, function errorCallback(err) {
						console.log(err);
					});
			}else{
				console.log('trending data');
				userDataService.getData()
					.then(function(resp) {
						$scope.trendingData = resp.data;
						$scope.posts = $scope.trendingData.posts[0];
						console.log($scope.tags = resp.data.posts[0].tags);
						$rootScope.$broadcast('senddown', resp.data);
						console.log($scope.trendingData);
					}, function errorCallback(err) {
						console.log(err);
					});
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
					$mdSidenav('hiddenNavBar').close();
				}
			};

			$scope.logout = function() {
				$cookies.remove('connect_auth');
				$window.location.href = '/';
			}
	}]);
})();