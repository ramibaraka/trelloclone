'use strict';
angular.module('trellocloneApp')
    .controller('WorkItemCtrl', ['$scope', 'workItemFactory', 'userFactory',

        function ($scope, workItemFactory, userFactory) {

            $scope.status;
            $scope.issues;
            $scope.users = [];

            $scope.newWorkItem = {};
            $scope.formData = {};

            refresh();

            function refresh() {
                setTimeout(function () {
                    getInProgressWorkItems();
                    getNotStartedWorkItems();
                    getCompletedWorkItems();
                    getAllUsers();
                }, 500);
            }

            function getAllUsers() {
                userFactory.getAllUsers()
                    .success(function (usersResponse) {
                        $scope.users = usersResponse.users;
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load users data: ' + error.message;
                    });
            }

            function getInProgressWorkItems() {
                workItemFactory.getWorkItemsInProgress()
                    .success(function (workItemsInProgress) {
                        $scope.workItems[1] = workItemsInProgress.workitems;
                    })
                    .error(function (error) {
                        $scope.workItemsInProgress = ['fel1', 'fel2', 'fel3'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getNotStartedWorkItems() {
                workItemFactory.getNotStartedWorkItems()
                    .success(function (notStartedWorkItems) {
                        $scope.workItems[0] = notStartedWorkItems.workitems;
                    })
                    .error(function (error) {
                        $scope.notStartedWorkItems = ['fel1', 'fel2', 'fel3'];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getCompletedWorkItems() {
                workItemFactory.getCompletedWorkItems()
                    .success(function (completedWorkItems) {
                        $scope.workItems[2] = completedWorkItems.workitems;
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

                        $scope.issues = null;
                        refresh();
                        $('.modal-backdrop').remove();
                        $('body').removeClass('modal-open');
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to delete workitem: ' + error.message;
                    });
            };

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
                    receive: function (something) {

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
                        if (_listName === 'IN_PROGRESS' && $scope.workItems[1].length === 0) {
                            $("#progress").removeClass("fa-pulse");
                        }
                    }
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
                //Stänger ner modalen
                $('.modal-backdrop').remove();
                $('body').removeClass('modal-open');

                var workitem = angular.copy($scope.formData);
                //Skickar datan till servern
                workItemFactory.updateWorkItem(workitem);
                //laddar om datan från servern
                refresh();
            };

            $scope.saveNewWorkItem = function () {

                $('.modal-backdrop').remove();
                $('.modal').remove();
                $('body').removeClass('modal-open');

                var workitem = angular.copy($scope.newWorkItem);
                $scope.newWorkItem = {};

                workItemFactory.saveWorkItem(workitem);

                refresh();
            };

            $scope.initFormData = function (workItem) {
                $scope.formData = angular.copy(workItem);
            };

            $scope.setUserToWorkItem = function (userId, workItemId) {
                userFactory.addWorkItemToUser(userId, workItemId);
            };
        }
    ]);