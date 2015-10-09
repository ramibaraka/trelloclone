'use strict';
angular.module('trellocloneApp')
    .controller('WorkItemCtrl', ['$scope', 'workItemFactory',
        function ($scope, workItemFactory, userFactory) {

            $scope.status;
            $scope.issues;

            $scope.formData = {};

            refresh();

            function refresh() {
                setTimeout(function () {
                    getInProgressWorkItems();
                    getNotStartedWorkItems();
                    getCompletedWorkItems();
                }, 200);
            }

            function getInProgressWorkItems() {
                workItemFactory.getWorkItemsInProgress()
                    .success(function (workItemsInProgress) {
                        $scope.inProgressWorkItems = workItemsInProgress;
                    })
                    .error(function (error) {
                        $scope.workItemsInProgress = ['fel1', 'fel2', 'fel3'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getNotStartedWorkItems() {
                workItemFactory.getNotStartedWorkItems()
                    .success(function (notStartedWorkItems) {
                        $scope.notStartedWorkItems = notStartedWorkItems;
                    })
                    .error(function (error) {
                        $scope.notStartedWorkItems = ['fel1', 'fel2', 'fel3'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getCompletedWorkItems() {
                workItemFactory.getCompletedWorkItems()
                    .success(function (completedWorkItems) {
                        $scope.completedWorkItems = completedWorkItems;
                    })
                    .error(function (error) {
                        $scope.completedWorkItems = ['WorkItem1 hejehessd eh', 'Fel2', 'Fel3'];
                        $scope.status = 'Unable to load workitem data: ' + error.message;
                    });
            }

            $scope.deleteWorkItem = function (id) {
                workItemFactory.deleteWorkItem(id)
                    .success(function () {
                        $scope.status = 'Deleted workitem! Refreshing workitem list...';
                        /*for (var i = 0; i < $scope.workItems.length; i++) {
                            var workItem = $scope.workItems[i];
                            if (workItem.id === id) {
                                $scope.workItems.splice(i, 1);
                                break;
                            }
                        }*/
                        $scope.issues = null;
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to delete workitem: ' + error.message;
                    });
            };

            $scope.users = userFactory.getAllUsers();
            // $scope.contributors = [{
            //     username: 'Osama',
            //     userId: 'blabla',
            //     id: 1
            // }, {
            //     username: 'Sandra',
            //     userId: 'hejhej111',
            //     id: 2
            // }, {
            //     username: 'Rami',
            //     userId: 'hejhej222',
            //     id: 3
            // }, {
            //     username: 'Stefan',
            //     userId: 'hejhej333',
            //     id: 4
            // }];

            $scope.sortingLog = [];

            function createOptions(listName) {
                var _listName = listName;
                var options = {
                    placeholder: 'app',
                    connectWith: '.apps-container',
                    // activate: function () {
                    //     console.log("list " + _listName + ": activate");
                    // },
                    // beforeStop: function () {
                    //     console.log("list " + _listName + ": beforeStop");
                    // },
                    // change: function () {
                    //     console.log("list " + _listName + ": change");
                    // },
                    // create: function () {
                    //     console.log("list " + _listName + ": create");
                    // },
                    // deactivate: function () {
                    //     console.log("list " + _listName + ": deactivate");
                    // },
                    // out: function () {
                    //     console.log("list " + _listName + ": out");
                    // },
                    // over: function () {
                    //     console.log("list " + _listName + ": over");
                    // },
                    receive: function (something) {
                        console.log('list ' + _listName + ': received ' + something.toElement.id);
                        //------------------------------------>Här ska http-anropet göras!!<------------------------------------------

                        switch (_listName) {

                        case 'NOT_STARTED':
                            workItemFactory.setNotStarted(something.toElement.id);
                            refresh();
                            break;
                        case 'IN_PROGRESS':
                            $('#progress').addClass('fa-pulse');
                            workItemFactory.setInProgress(something.toElement.id);
                            refresh();
                            break;
                        case 'COMPLETED':
                            workItemFactory.setCompleted(something.toElement.id);
                            refresh();
                            break;

                        default:
                        }
                    },
                    remove: function () {
                            // console.log("list " + _listName + ": remove");
                            if (_listName === 'IN_PROGRESS' && $scope.workItems[1].length === 0) {
                                $("#progress").removeClass("fa-pulse");
                            }
                        }
                        // ,
                        // sort: function () {
                        //     console.log("list " + _listName + ": sort");
                        // },
                        // start: function () {
                        //     console.log("list " + _listName + ": start");
                        // },
                        // stop: function () {
                        //     console.log("list " + _listName + ": stop");
                        // },
                        // update: function () {
                        //     console.log("list " + _listName + ": update");
                        // }
                };
                return options;
            }

            $scope.sortableOptionsList = [createOptions('NOT_STARTED'), createOptions('IN_PROGRESS'), createOptions('COMPLETED')];

            $scope.logModels = function () {
                $scope.sortingLog = [];
                for (var i = 0; i < $scope.workItems.length; i++) {
                    var logEntry = $scope.workItems[i].map(function (x) {
                        return x.title;
                    }).join(', ');
                    logEntry = 'container ' + (i + 1) + ': ' + logEntry;
                    $scope.sortingLog.push(logEntry);
                }
            };

            $scope.addWorkItem = function () {
                $scope.workItems[0].push({
                    title: this.workItem
                });
                $scope.workItem = '';
            };

            $scope.saveWorkItem = function () {
                var workitem = angular.copy($scope.formData);
                workItemFactory.saveWorkItem(workitem);
                // console.log('SUBMITTED');
                // console.log('formData:' + result);
                // for (var k in result) {
                //     if (result.hasOwnProperty(k)) {
                //         console.log('Key is ' + k + ', value is ' + result[k]);
                //     }
                // }
            };

            $scope.saveNewWorkItem = function (workItem, user) {
                var workitem = angular.copy($scope.formData);
                workItemFactory.saveWorkItem(workitem);
                userFactory.addWorkItemToUser(user.id, workItem);
            };

            $scope.initFormData = function (workItem) {
                $scope.formData = angular.copy(workItem);
            };

            $scope.setUserToWorkItem = function (userId, workItemId) {
                // console.log('userId: ' + userId + ' workItemId: ' + workItemId);
                workItemFactory.setUserToWorkItem(userId, workItemId);
            };
        }
    ]);