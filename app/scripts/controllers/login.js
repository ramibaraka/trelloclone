'use strict';
angular.module('trellocloneApp')
	.controller('LoginCtrl', ['$scope', 'loginFactory', function ($scope, loginFactory) {
		$scope.username;
		$scope.password;

		$scope.error;

		$scope.validate = function (username, password) {
			console.dir("test");
			loginFactory.tryLogin(username, password)
				.success(function (token) {
					$scope.error = '';
					window.localStorage.setItem("token", token);
					window.location.href = '/';
				})
				.error(function (error) {
					$scope.error = 'Wrong username or password!';
				});
		};
	}]);