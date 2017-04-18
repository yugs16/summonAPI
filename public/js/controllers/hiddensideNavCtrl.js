angular.module('hiddensideNavCtrl', [])

	.controller('hiddensideNavCtrl', ['$scope', '$rootScope', '$location', '$mdSidenav', '$mdDialog', '$cookies', '$window', function($scope, $rootScope, $location, $mdSidenav, $mdDialog, $cookies, $window) {

		$scope.$on('senddown', function(evt, resp) {
			$scope.data = resp;
			console.log($scope.data);
		});

		// $scope.loginDialog = function() {
  //           $rootScope.$emit("loginDialog", {});
  //       }

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