(function() {
	'use strict';
	angular.module('homeCtrl', [])
		.controller('homeCtrl', ['$scope', '$rootScope', '$mdDialog', '$location', '$window', '$cookies', '$mdSidenav', '$routeParams', 'userDataService', 'voteService', function($scope, $rootScope, $mdDialog, $location, $window, $cookies, $mdSidenav, $routeParams, userDataService, voteService) {

			// start spinner
			$scope.loaded = false;
			$mdDialog.show({
				targetEvent: event,
				clickOutsideToClose:false,
				templateUrl: '../views/spinnerDialog.html'
			});

			// sending get request to server if user is logged in
			if ($cookies.get('connect_auth')) {
				console.log('user data : ');
				userDataService.getData()
					.then(function(resp) {
						$rootScope.postData = resp.data;
						
						//data sharing among controllers 
						$rootScope.$broadcast('senddown', resp.data);
						console.log(resp.data);
					}, function errorCallback(err) {
						console.log(err);
					})
					.finally(function() {
						$scope.loaded = true;
						$mdDialog.hide('.spinner');
					})
			}else{
				console.log('post data');

				// sending request to server if user is not logged in
				userDataService.getData()
					.then(function(resp) {
						$scope.postData = resp.data;

						// data sharing among controllers 
						$rootScope.$broadcast('senddown', resp.data);
						
						console.log($scope.postData);
					}, function errorCallback(err) {
						console.log(err);
					})
					.finally(function() {
						$scope.loaded = true;
						$mdDialog.hide('.spinner');
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

			// voting functionality
			// voteUp
			$scope.voteUp = function(data, post_id) {
				if ($cookies.get('connect_auth')) {
					if ($cookies.get('temp_vote_active')) {
						var voteData = {
							"postId" : data._id,
							"vote" : true,
							"vote_active" : $cookies.get('temp_vote_active')
						}
					} else {
						var voteData = {
								"postId" : data._id,
								"vote" : true,
								"vote_active" : data.userInfo.vote_active
							}
					}
					voteService.getVote(voteData)
						.then(function(resp) {
							$cookies.put('temp_vote_active', resp.data.vote_active);
							$scope.vote = resp.data.vote_active;
							$scope.upVote = resp.data.up_vote_cnt;
							$scope.postId = resp.data.postId;
							$scope.showOnClickLike = function(id) {
								if (id != $scope.postId) {
									return true;
								}else{
									return false;
								}
							}
							console.log(resp.data);
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
					if ($cookies.get('temp_downvote_active')) {
						var voteData = {
							"postId" : data._id,
							"vote" : false,
							"vote_active" : $cookies.get('temp_downvote_active')
						}
					}else {
						var voteData = {
							"postId" : data._id,
							"vote" : false,
							"vote_active" : data.userInfo.vote_active
						}
					}
					voteService.getVote(voteData)
						.then(function(resp) {
							$cookies.put('temp_downvote_active', resp.data.vote_active);
							$scope.vote = resp.data.vote_active;
							$scope.downVote = resp.data.down_vote_cnt;
							console.log($scope.downVote);
							$scope.postId = resp.data.postId;
							$scope.showOnClickDisLike = function(id) {
								if (id != $scope.postId) {
									return true;
								}else{
									return false;
								}
							}
							console.log(resp.data);
						}, function errorCallback(err) {
							console.log('error occured', err);
						})
				} else {
					$scope.loginDialog();
				}
			}

			// redirect to detailed page
			$scope.details = function(id) {
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