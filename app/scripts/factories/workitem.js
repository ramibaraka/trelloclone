'use strict';
angular.module('trellocloneApp')
    .factory('workItemFactory', ['$http', function ($http) {

        var urlBase = 'http://localhost:8080/taskboard-web/workitems';
        var workItemFactory = {};

        workItemFactory.getAllWorkItems = function () {
            return $http.get(urlBase);
        };

        workItemFactory.searchForWorkItemsWithDesc = function (desc) {
            return $http.get(urlBase + '/description/' + desc);
        };

        workItemFactory.getWorkItemsWithIssues = function (issue) {
            return $http.get(urlBase + '/issue?issue=' + issue);
        };

        workItemFactory.getWorkItemsWithStatus = function (status) {
            return $http.get(urlBase + '/status/' + status);
        };

        workItemFactory.getCompletedWorkItems = function () {
            return $http.get(urlBase + '/status/completed');
        };

        workItemFactory.getWorkItemsInProgress = function () {
            return $http.get(urlBase + '/status/in_progress');
        };

        workItemFactory.getNotStartedWorkItems = function () {
            return $http.get(urlBase + '/status/not_started');
        };

        workItemFactory.getWorkItemsHistory = function (fromDate, toDate) {
            return $http.get(urlBase + '/history?fromDate=' + fromDate + '&toDate=' + toDate);
        };

        workItemFactory.saveWorkItem = function (workItem) {
            return $http.post(urlBase, workItem);
        };

        workItemFactory.setCompleted = function (id) {
            return $http.put(urlBase + '/' + id + '/status', {
                status: 'COMPLETED'
            });
        };

        workItemFactory.setUserToWorkItem = function (userId, workItemId) {
            return $http.put('http://localhost:8080/taskboard-web/users' + '/' + userId + '/workitems', {
                id: workItemId
            });
        };

        workItemFactory.setInProgress = function (id) {
            return $http.put(urlBase + '/' + id + '/status', {
                status: 'IN_PROGRESS'
            });
        };

        workItemFactory.setNotStarted = function (id) {
            return $http.put(urlBase + '/' + id + '/status', {
                status: 'NOT_STARTED'
            });
        };

        workItemFactory.updateIssue = function (id, issue) {
            return $http.put(urlBase + '/' + id + '/issue', issue);
        };

        workItemFactory.deleteWorkItem = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        return workItemFactory;
    }]);