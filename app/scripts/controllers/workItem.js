'use strict';
angular.module('trellocloneApp')
    .controller('WorkItemCtrl', ['$scope', 'workItemFactory',
        function ($scope, workItemFactory) {

            $scope.status;
            $scope.issues;



            function refresh() {
                setTimeout(function () {
                    getInProgress();
                    getNotStartedWorkItems();
                    getCompletedWorkItems();
                }, 1000);
            }


            // setInterval(function () {
            //     getInProgress();
            //     getNotStartedWorkItems();
            //     getCompletedWorkItems();
            // }, 1000);

            function getInProgress() {
                workItemFactory.getWorkItemsInProgress()
                    .success(function (workItemsInProgress) {
                        $scope.workItems[1] = workItemsInProgress.workitems;
                    })
                    .error(function (error) {
                        $scope.workItemsInProgress = ['fel1', 'fel2', 'fel3fel1Fel2Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getNotStartedWorkItems() {
                workItemFactory.getNotStartedWorkItems()
                    .success(function (notStartedWorkItems) {
                        $scope.workItems[0] = notStartedWorkItems.workitems;
                        // $scope.notStartedWorkItems = notStartedWorkItems;
                    })
                    .error(function (error) {
                        $scope.notStartedWorkItems = ['fel1Fel2Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci', 'fel2', 'fel3'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getCompletedWorkItems() {
                workItemFactory.getCompletedWorkItems()
                    .success(function (completedWorkItems) {
                        $scope.workItems[2] = completedWorkItems.workitems;
                        // $scope.completedWorkItems = completedWorkItems;
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

            $scope.contributors = ['Osama', 'Sandra', 'Rami', 'Stefan'];

            $scope.workItems = [
                [{
                    id: '12',
                    title: 'Login with Security',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, dicta laboriosam obcaecati, ea reiciendis optio maiores voluptates autem quam excepturi quidem nostrum repellendus. Quia cumque explicabo eum aspernatur, doloremque officia.'
                }, {
                    id: '123',
                    title: 'Fix VG',
                    description: 'Mera information 2'
                }, {
                    id: '1234',
                    title: 'Entreprenörskap',
                    description: 'Mera information 3'
                }, {
                    id: '12345',
                    title: 'Säkerhetskurs',
                    description: 'Mera information 4'
                }],
                [{
                    id: '123456',
                    title: 'Write Html',
                    description: 'Mera information 5'
                }, {
                    id: '1234567',
                    title: 'Write Css',
                    description: 'Mera information 6'
                }, {
                    id: '12345678',
                    title: 'Write Javascript',
                    description: 'Mera information 7'
                }, {
                    id: '123456789',
                    title: 'Fix Angular',
                    description: 'Mera information 8'
                }],
                [{
                    id: '1231213',
                    title: 'Fix G',
                    description: 'Mera information 9'
                }, {
                    id: '1231323',
                    title: 'Be happy',
                    description: 'Mera information 10'
                }, {
                    id: '1231312312',
                    title: 'SteffeKUNG',
                    description: 'Mera information 11'
                }, {
                    id: '123123123',
                    title: 'Http anrop',
                    description: 'Mera information 12'
                }]
            ];

            $scope.sortingLog = [];

            function createOptions(listName) {
                var _listName = listName;
                var options = {
                    placeholder: "app",
                    connectWith: ".apps-container",
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
                        console.log("list " + _listName + ": received " + something.toElement.id);
                        //------------------------------------>Här ska http-anropet göras!!<------------------------------------------

                        switch (_listName) {

                        case 'NOT_STARTED':
                            workItemFactory.setNotStarted(something.toElement.id);
                            refresh();
                            break;
                        case 'IN_PROGRESS':
                            $("#progress").addClass("fa-pulse");
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
                            if (_listName === 'B' && $scope.workItems[1].length === 0) {
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
        }
    ]);