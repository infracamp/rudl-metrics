/**
 * Created by matthes on 10.03.16.
 */

var module = angular.module("module.Main", [
]);

module.controller("MainCtrl", function (WindowService, $interval, $http) {
    "use strict";
    var self = this;
    this.windowService = WindowService;

    this.curDateTime = "loading...";
    var updateDateTime = function () {
        var date = new Date();
        self.curDateTime = date.toLocaleTimeString();
    };
    $interval(updateDateTime, 50);
});

