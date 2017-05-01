(function() {
	'use strict';
	angular.module('homeCtrl', [])
		.controller('homeCtrl', ['$scope', '$rootScope', '$mdDialog', '$location', '$window', '$cookies', '$mdSidenav', '$routeParams', 'userDataService', 'voteService', function($scope, $rootScope, $mdDialog, $location, $window, $cookies, $mdSidenav, $routeParams, userDataService, voteService) {

			// sending get request to server if user is logged in
			if ($cookies.get('connect_auth')) {
				console.log('user data : ');
				userDataService.getData()
					.then(function(resp) {
						$rootScope.postData = resp.data;

						//data sharing among controllers 
						$rootScope.$broadcast('senddown', resp.data);
						console.log(resp);
					}, function errorCallback(err) {
						console.log(err);
					});
			}else{
				console.log('post data');

				// sending request to server if user is not nogged in
				userDataService.getData()
					.then(function(resp) {
						$scope.postData = resp.data;

						// data sharing among controllers 
						$rootScope.$broadcast('senddown', resp.data);
						console.log($scope.postData);
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

			// voting functionality
			// voteUp
			$scope.voteUp = function(data) {
				if ($cookies.get('connect_auth')) {
					var voteData = {
						"postId" : data._id,
						"vote" : true
					}
					voteService.getVote()
						.then(function(resp) {
							console.log(resp);
						}, function errorCallback(err) {
							console.log('error occured', err);
						})
				} else {
					$scope.loginDialog();
				}
			}
			// voteDown
			$scope.voteDown = function(data) {
				if ($cookies.get('connect_auth')) {
					var voteData = {
						"postId" : data.votes[0].userId,
						"vote" : false
					}
					voteService.getVote()
						.then(function(resp) {
							console.log(resp);
						}, function errorCallback(err) {
							console.log('error occured', err);
						})
				} else {
					$scope.loginDialog();
				}
			}

			// redirect to detailed page
			$scope.details = function(id) {
				console.log($routeParams);
				$location.path('/details/' + id);
			}

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