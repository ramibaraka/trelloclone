'use strict';
angular.module('trellocloneApp')
    .controller('WorkItemCtrl', ['$scope', 'workItemFactory',
        function ($scope, workItemFactory) {

            $scope.status;
            $scope.workItems;
            $scope.issues;

            getWorkItems();

            function getWorkItems() {
                workItemFactory.getAllWorkItems()
                    .success(function (workItems) {
                        $scope.workItems = workItems;
                    })
                    .error(function (error) {
                        $scope.workItems = ['fel1', 'fel2', 'fel3'];
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