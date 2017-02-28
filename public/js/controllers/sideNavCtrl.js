angular.module('sideNavCtrl', [])

	.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
	    $scope.toogleleft = function () {
	      console.log('enter toggle');
	      $mdSidenav('hiddenNavBar').open();
	    };
	  })