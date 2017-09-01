angular.module('ChartsApp').controller('headerCtrl', function ($scope, bus) {
    'use strict';

    $scope.isShowDepartments = false;
    $scope.isShowCurrentDepartment = false;

    let allDepartments;

    let showDepartments = function () {
        $scope.isShowDepartments = true;
    };

    let hideDepartments = function () {
        $scope.isShowDepartments = false;
    };

    let showCurrentDepartment = function () {
        $scope.isShowCurrentDepartment = true;
    };

    let hideCurrentDepartment = function () {
        $scope.isShowCurrentDepartment = false;
    };

    let menuItems = [{
        className: "current-department",
        hideMethod: hideCurrentDepartment,
        showMethod: showCurrentDepartment
    }, {
        className: "menu-departments",
        hideMethod: hideDepartments,
        showMethod: showDepartments
    }];

    menuItems.forEach(function (obj) {
        $scope.$watch(function() {
            return angular.element(document.getElementsByClassName(obj.className)).hasClass('is-selected');
        }, function(curItem){

                if (curItem)
                    obj.showMethod.call();
                else
                    obj.hideMethod.call();
            });
    });



    $scope.selectDepartment = function (departmentCode) {
        $scope.selectedDepartment = departmentCode;
        $scope.coursesList = allDepartments[departmentCode].courses;
        hideDepartments();
        bus.emit("updateCurrentDepartment", departmentCode);
        setTimeout(function() {
            angular.element(document.getElementsByClassName("current-department")).triggerHandler("click");
        }, 1);
    };

    bus.on("updateDepartments", function (departments) {
        allDepartments = departments;

        $scope.departmentsList = Object.keys(departments).filter(function (key) {
            return departments[key].courses.length > 1;
        }).sort().map(function (key) {
            return {
                code: departments[key].code
            }
        });
    });

});
