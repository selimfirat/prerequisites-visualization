angular.module('ChartsApp').controller('headerCtrl', function ($scope, bus) {
    'use strict';

    let creatorsDialogComponent;

    $scope.init = function () {
        setTimeout(function () {
            // CommandBar
            let CommandBarElements = document.querySelectorAll(".ms-CommandBar");
            for (let i = 0; i < CommandBarElements.length; i++) {
                new fabric['CommandBar'](CommandBarElements[i]);
            }

            // Personas
            var PersonaElements = document.querySelectorAll(".ms-Persona");
            for (var i = 0; i < PersonaElements.length; i++) {
                new fabric['Persona'](PersonaElements[i]);
            }

            // Dialog
            let dialog = document.querySelector(".ms-Dialog");
            creatorsDialogComponent = new fabric['Dialog'](dialog);
        }, 1);
    };

    $scope.showCreatorsDialog = function () {
        creatorsDialogComponent.open();
    };


    $scope.isShowDepartments = false;
    $scope.isShowCurrentDepartment = false;
    $scope.isCurrentDepartmentSelected = false;
    $scope.currentDepartmentCode = "";

    let allDepartments;

    $scope.toggleDepartments = function () {
        $scope.isShowDepartments = !$scope.isShowDepartments;
        $scope.isShowCurrentDepartment = false;
    };

    $scope.toggleCurrentDepartment = function () {
        $scope.isShowCurrentDepartment = !$scope.isShowCurrentDepartment;
        $scope.isShowDepartments = false;
    };


    $scope.selectDepartment = function (departmentCode) {
        $scope.isCurrentDepartmentSelected = true;
        $scope.currentDepartment = departmentCode;
        $scope.coursesList = allDepartments[departmentCode].courses;
        $scope.toggleCurrentDepartment();
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
