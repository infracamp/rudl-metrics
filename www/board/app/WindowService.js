/**
 * Created by matthes on 10.03.16.
 */


module.service("WindowService", function ($interval) {
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
        var urlParams = new URLSearchParams(window.location.search);
        kasimir_http(CONF_CONFIG_URL).withBearerToken(urlParams.get("token") || "none").json = (response) => {
            self.config.tabs = response.dashboards.main
        };

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
    }, 8000);


});
