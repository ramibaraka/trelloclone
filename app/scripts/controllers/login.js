'use strict';
angular.module('trellocloneApp')
	.controller('LoginCtrl', function ($scope) {
		$scope.username;
		$scope.password;

		$scope.validate = function (username, password) {
			if (username === 'hej' && password === 'bajs') {
				//redirect to board
				window.alert('Correct input!');
				window.location.replace("http://localhost:9000/#/");
			} else {
				window.alert('Wrong input!');
			}
		};
	});