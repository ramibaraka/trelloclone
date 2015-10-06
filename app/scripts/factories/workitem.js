'use strict';
angular.module('trellocloneApp')
    .factory('workItemFactory', ['$http', function ($http) {

        var urlBase = '/taskboard-web/workitems';
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

        workItemFactory.getWorkItemsHistory = function (fromDate, toDate) {
            return $http.get(urlBase + '/history?fromDate=' + fromDate + '&toDate=' + toDate);
        };

        workItemFactory.saveWorkItem = function (workItem) {
            return $http.post(urlBase, workItem);
        };

        workItemFactory.setCompleted = function (id) {
            return $http.put(urlBase + '/' + id + '/completed')
        };

        workItemFactory.setInProgress = function (id) {
            return $http.put(urlBase + '/' + id + '/inprogress')
        };

        workItemFactory.setNotStarted = function (id) {
            return $http.put(urlBase + '/' + id + '/notstarted')
        };

        workItemFactory.updateIssue = function (id, issue) {
            return $http.put(urlBase + '/' + id + '/issue', issue)
        };

        workItemFactory.deleteWorkItem = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        return workItemFactory;
    }]);