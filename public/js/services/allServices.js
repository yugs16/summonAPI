angular.module('allServices', [])
	

	.factory('signupService', ['$http', function($http) {
		return {
			userSignup : function(data) {
				var config = {
					 headers : {
					 	'Content-Type': 'json/x-www-form-urlencoded;charset=utf-8;'
					 }
				}
				return $http.post("/api/signup", data, config);
			}
		}
	}])

	.factory('signinService', ['$http', function($http) {
		return {
			userSignin : function(data) {
				var config = {
					 headers : {
					 	'Content-Type': 'json/x-www-form-urlencoded;charset=utf-8;'
					 }
				}
				return $http.post("/api/signin", data, config);
			}
		}
	}])