'use strict';
angular.module('trellocloneApp')
	.factory('loginFactory', ['$http', function ($http) {

		var urlBase = 'http://localhost:8080/taskboard-web/login';
		var loginFactory = {};
		var loginObject = {};

		loginFactory.tryLogin = function (username, password) {
			loginObject.username = username;
			loginObject.password = password;
			return $http.post(urlBase, loginObject);
		};

		return loginFactory;
	}]);