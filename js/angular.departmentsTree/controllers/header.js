angular.module('ChartsApp').controller('headerCtrl', function ($scope, bus, $window) {
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

            // Creators Dialog
            let creatorsDialog = document.querySelector(".creators-dialog");
            creatorsDialogComponent = new fabric['Dialog'](creatorsDialog);

        }, 1);
    };

    $scope.showCreatorsDialog = function () {
        creatorsDialogComponent.open();
    };


    $scope.isShowDepartments = true;
    $scope.isShowCurrentDepartment = false;
    $scope.isCurrentDepartmentSelected = false;
    $scope.currentDepartmentCode = "";
    $scope.currentCourseCode = "";

    let allDepartments;

    $scope.toggleDepartments = function () {
        $scope.isShowDepartments = !$scope.isShowDepartments;
        $scope.isShowCurrentDepartment = false;
    };

    $scope.toggleCurrentDepartment = function () {
        $scope.isShowCurrentDepartment = !$scope.isShowCurrentDepartment;
        $scope.isShowDepartments = false;
    };

    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    $scope.selectDepartment = function (departmentCode) {
        $scope.isCurrentDepartmentSelected = true;
        $scope.currentDepartment = departmentCode;
        $scope.coursesList = sortByKey(allDepartments[departmentCode].courses, "code");

        $scope.toggleCurrentDepartment();
        bus.emit("updateCurrentDepartment", departmentCode);
        setTimeout(function() {
            angular.element(document.getElementsByClassName("current-department")).triggerHandler("click");
        }, 1);
    };

    $scope.selectCourse = function (courseCode) {
        $scope.currentCourseCode = courseCode;
        $window.open("https://stars.bilkent.edu.tr/syllabus/view/" + courseCode.replace(' ', '/'));
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
