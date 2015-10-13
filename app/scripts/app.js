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
    'ngRoute',
    'ui.sortable',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/workitems.html',
        controller: 'WorkItemCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });