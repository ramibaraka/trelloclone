'use strict';

/**
 * @ngdoc overview
 * @name trellocloneApp
 * @description
 * # trellocloneApp
 *
 * Main module of the application.
 */
angular
  .module('trellocloneApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
