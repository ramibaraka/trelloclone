'use strict';
angular.module('trellocloneApp')
    .controller('WorkItemCtrl', ['$scope', 'workItemFactory',
        function ($scope, workItemFactory) {

            $scope.status;
            $scope.customers;
            $scope.orders;

            getInProgress();
            getNotStartedWorkItems();
            getCompletedWorkItems();


            function getInProgress() {
                workItemFactory.getWorkItemsInProgress()
                    .success(function (workItemsInProgress) {
                        $scope.workItemsInProgress = workItemsInProgress;
                    })
                    .error(function (error) {
                        $scope.workItems = ['fel1', 'fel2', 'fel3'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getNotStartedWorkItems() {
                workItemFactory.getNotStartedWorkItems()
                    .success(function (notStartedWorkItems) {
                        $scope.notStartedWorkItems = notStartedWorkItems;
                    })
                    .error(function (error) {
                        $scope.workItems = ['fel1', 'fel2', 'fel3'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getCompletedWorkItems() {
                workItemFactory.getCompletedWorkItems()
                    .success(function (completedWorkItems) {
                        $scope.completedWorkItems = completedWorkItems;
                    })
                    .error(function (error) {
                        $scope.workItems = ['fel1', 'fel2', 'fel3'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }
        }
    ]);