'use strict';
angular.module('trellocloneApp')
	.controller('LoginCtrl', ['$scope', 'loginFactory', function ($scope, loginFactory) {
		$scope.username;
		$scope.password;

		$scope.validate = function (username, password) {
			console.dir("test");
			loginFactory.tryLogin(username, password)
				.success(function (token) {
					console.dir("succes");
					window.localStorage.setItem("token", token);
					window.location.href = '/';
				})
				.error(function (error) {
					console.dir("error");
				});
		};
	}]);