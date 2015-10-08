'use strict';
angular.module('trellocloneApp')
    .controller('WorkItemCtrl', ['$scope', 'workItemFactory',
        function ($scope, workItemFactory) {

            $scope.status;
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

            $scope.contributors = ['Osama', 'Sandra', 'Rami', 'Stefan'];

            $scope.workItems = [
                [{
                    title: 'Login with Security',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, dicta laboriosam obcaecati, ea reiciendis optio maiores voluptates autem quam excepturi quidem nostrum repellendus. Quia cumque explicabo eum aspernatur, doloremque officia.'
                }, {
                    title: 'Fix VG',
                    description: 'Mera information 2'
                }, {
                    title: 'Entreprenörskap',
                    description: 'Mera information 3'
                }, {
                    title: 'Säkerhetskurs',
                    description: 'Mera information 4'
                }],
                [{
                    title: 'Write Html',
                    description: 'Mera information 5'
                }, {
                    title: 'Write Css',
                    description: 'Mera information 6'
                }, {
                    title: 'Write Javascript',
                    description: 'Mera information 7'
                }, {
                    title: 'Fix Angular',
                    description: 'Mera information 8'
                }],
                [{
                    title: 'Fix G',
                    description: 'Mera information 9'
                }, {
                    title: 'Be happy',
                    description: 'Mera information 10'
                }, {
                    title: 'SteffeKUNG',
                    description: 'Mera information 11'
                }, {
                    title: 'Http anrop',
                    description: 'Mera information 12'
                }]
            ];

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
                        console.log('list ' + _listName + ': received ' + something.toElement.innerText.trim());
                        if (_listName === 'B') {
                            $('#progress').addClass('fa-pulse');
                        }
                    },
                    remove: function () {
                            // console.log("list " + _listName + ": remove");
                            if (_listName === 'B' && $scope.workItems[1].length === 0) {
                                $('#progress').removeClass('fa-pulse');
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
        }
    ]);