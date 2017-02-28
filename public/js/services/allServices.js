angular.module('allServices', [])
	

	.factory('signupService', ['$http', function($http) {
		return {
			userSignup : function(data) {
				var config = {
					 headers : {
					 	'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					 }
				}
				return $http.get("/api/signin", data, config);
			}
		}
	}])