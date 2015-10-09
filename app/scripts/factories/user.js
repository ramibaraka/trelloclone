'use strict';
angular.module('trellocloneApp')
    .factory('userFactory', ['$http', function ($http) {

        var urlBase = 'http://localhost:8080/taskboard-web/users';
        var userFactory = {};

        userFactory.createUser = function () {
            return $http.post(urlBase);
        };

        userFactory.getUser = function (id) {
            return $http.get(urlBase + '/id/' + id);
        };

        userFactory.getAllUsers = function () {
            return $http.get(urlBase);
        };

        userFactory.getByUserName = function (username) {
            return $http.get(urlBase + '/' + username);
        };

        userFactory.searchUserByFirstName = function (firstname) {
            return $http.get(urlBase + '/' + firstname);
        };

        userFactory.deleteUser = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        userFactory.updateUser = function (id, userJson) {
            return $http.put(urlBase + '/' + id);
        };

        userFactory.addWorkItemToUser = function (id, workItemId) {
            return $http.put(urlBase + '/' + id + '/workitems', {
                id: workItemId
            });
        };

        userFactory.getAllWorkItemsFromUser = function (id) {
            return $http.get(urlBase + '/' + id + '/workitems');
        };

        return userFactory;
    }]);