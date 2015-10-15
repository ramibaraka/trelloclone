'use strict';
angular.module('trellocloneApp')
    .controller('WorkItemCtrl', ['$scope', 'workItemFactory', 'userFactory',

        function ($scope, workItemFactory, userFactory) {

            $scope.status;
            $scope.issues;
            $scope.users = [];

            $scope.newWorkItem = {};
            $scope.workItems = [
                [],
                [],
                []
            ];
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
                        $scope.users =
                            [{
                                username: 'user',
                                userId: 'userId',
                                id: 1
                            }];
                        $scope.status = 'Unable to load users data: ' + error.message;
                    });
            }

            function getInProgressWorkItems() {
                workItemFactory.getWorkItemsInProgress()
                    .success(function (workItemsInProgress) {
                        $scope.workItems[1] = workItemsInProgress;
                    })
                    .error(function (error) {
                        $scope.workItems[1] = [{
                            id: '1',
                            title: 'title1',
                            description: 'description1'
                        }];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getNotStartedWorkItems() {
                workItemFactory.getNotStartedWorkItems()
                    .success(function (notStartedWorkItems) {
                        $scope.workItems[0] = notStartedWorkItems;
                    })
                    .error(function (error) {
                        $scope.workItems[0] = [{
                            id: '2',
                            title: 'title2',
                            description: 'description2'
                        }];
                        $scope.status = 'Unable to load workItem data: ' + error.message;
                    });
            }

            function getCompletedWorkItems() {
                workItemFactory.getCompletedWorkItems()
                    .success(function (completedWorkItems) {
                        $scope.workItems[2] = completedWorkItems;
                    })
                    .error(function (error) {
                        $scope.workItems[2] = [{
                            id: '3',
                            title: 'title3',
                            description: 'description3'
                        }]
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