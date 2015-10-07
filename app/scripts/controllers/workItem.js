'use strict';
angular.module('trellocloneApp')
    .controller('WorkItemCtrl', ['$scope', 'workItemFactory',
        function ($scope, workItemFactory) {

            $scope.status;
            $scope.workItems;
            $scope.issues;

            $scope.workItemsInProgress = getInProgress();
            $scope.notStartedWorkItems = getNotStartedWorkItems();
            $scope.completedWorkItems = getCompletedWorkItems();


            function getInProgress() {
                workItemFactory.getWorkItemsInProgress()
                    .success(function (workItemsInProgress) {
                        $scope.workItemsInProgress = workItemsInProgress;
                    })
                    .error(function (error) {
                        $scope.workItemsInProgress = ['fel1', 'fel2', 'fel3fel1Fel2Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getNotStartedWorkItems() {
                workItemFactory.getNotStartedWorkItems()
                    .success(function (notStartedWorkItems) {
                        $scope.notStartedWorkItems = notStartedWorkItems;
                    })
                    .error(function (error) {
                        $scope.notStartedWorkItems = ['fel1Fel2Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci', 'fel2', 'fel3'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getCompletedWorkItems() {
                workItemFactory.getCompletedWorkItems()
                    .success(function (completedWorkItems) {
                        $scope.completedWorkItems = completedWorkItems;
                    })
                    .error(function (error) {
                        $scope.completedWorkItems = ['WorkItem1 hejehessd eh', 'Fel2Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci', 'Fel3'];
                        $scope.status = 'Unable to load workitem data: ' + error.message;
                    });
            }

            $scope.deleteWorkItem = function (id) {
                workItemFactory.deleteWorkItem(id)
                    .success(function () {
                        $scope.status = 'Deleted workitem! Refreshing workitem list...';
                        for (var i = 0; i < $scope.workItems.length; i++) {
                            var workItem = $scope.workItems[i];
                            if (workItem.id === id) {
                                $scope.workItems.splice(i, 1);
                                break;
                            }
                        }
                        $scope.issues = null;
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to delete workitem: ' + error.message;
                    });
            };
        }
    ]);