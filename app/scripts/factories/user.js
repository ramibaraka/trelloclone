'use strict';
angular.module('trellocloneApp')
    .factory('userFactory', ['$http', function ($http) {

        var urlBase = 'http://localhost:8080/taskboard-web/users';
        var workItemFactory = {};

        workItemFactory.createUser = function () {
            return $http.post(urlBase);
        };

        workItemFactory.getUser = function (id) {
            return $http.get(urlBase + '/id/' + id);
        };

        workItemFactory.getAllUsers = function () {
            return $http.get(urlBase);
        };

        workItemFactory.getByUserName = function (username) {
            return $http.get(urlBase + '/' + username);
        };

        workItemFactory.searchUserByFirstName = function (firstname) {
            return $http.get(urlBase + '/' + firstname);
        };

        workItemFactory.deleteUser = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        workItemFactory.updateUser = function (id, userJson) {
            return $http.put(urlBase + '/' + id);
        };

        workItemFactory.addWorkItemToUser = function (id, workitemJson) {
            return $http.put(urlBase + '/' + id + '/workitems');
        };

        workItemFactory.getAllWorkItemsFromUser = function (id) {
            return $http.get(urlBase + '/' + id + '/workitems');
        };
    }]);