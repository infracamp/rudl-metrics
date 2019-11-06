/**
 * Created by matthes on 10.03.16.
 */


module.service("WindowService", function ($interval, $http) {
    "use strict";
    var self = this;

    this.curTab = 0;

    var manualChange = false;

    this.switchTab = function (index) {
        manualChange = true;
        self.curTab = index;
    };


    this.config = {tabs: []};

    var update= function () {
      $http({
        url: "/api/config.json",
        timeout: 2000
      }).then(function (data) {
        console.log(data);
        self.config.tabs = data.data.dashboards.main;
        console.log("hello", self.config);
      })
    }

    update();


    $interval(function () {
        if (manualChange == true) {
            manualChange = false;
            return;
        }
        self.curTab++;
        if (self.curTab > self.config.tabs.length-1)
            self.curTab = 0;
    }, 10000);


});
