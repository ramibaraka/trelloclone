'use strict';
angular.module('trellocloneApp')
	.controller('LoginCtrl', ['$scope', 'loginFactory', function ($scope, loginFactory) {
		$scope.username;
		$scope.password;

		$scope.validate = function (username, password) {
			loginFactory.tryLogin(username, password)
				.success(function (token) {
					window.alert(token);
				})
				.error(function (error) {
					window.alert(error);
				});
		};
	}]);