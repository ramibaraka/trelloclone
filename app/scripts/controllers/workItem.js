'use strict';
angular.module('trellocloneApp')
    .controller('WorkItemCtrl', ['$scope', 'workItemFactory',
        function ($scope, workItemFactory) {

            $scope.status;
            $scope.customers;
            $scope.orders;

            getWorkItems();

            function getWorkItems() {
                workItemFactory.getAllWorkItems()
                    .success(function (workItems) {
                        $scope.workItems = workItems;
                    })
                    .error(function (error) {
                        $scope.workItems = ['fel1', 'fel2', 'fel3'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }
        }
    ]);