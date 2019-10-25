

class ChartBasic extends HTMLElement {


    constructor() {
        super();
        this.config = false;

        this.interval = null;
        this.chart = null;
    }

    static get observedAttributes() { return ["config"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "config":
                console.log ("update config", newValue);
                try {
                    this.config = JSON.parse(newValue);
                } catch (e) {

                }

                console.log("updated");
                break;

        }
    }

    connectedCallback() {
        var self = this;
        var shadow = this.attachShadow({mode: "open"});
        shadow.innerHTML = '<style>.failed { background-color: lightcoral }</style><div><canvas id="chart"></canvas></div>';
        var element = shadow.getElementById("chart");

        var chartData = {};

        window.setTimeout(function () {
            console.log("connected");
            chartData = self.config.template;
            self.config.template = null;

            self.chart = new Chart(element.getContext("2d"), chartData);
            if (typeof self.config.yAxisMax !== "undefined")
                chartData.options.scales.yAxes[0].ticks.suggestedMax = self.config.yAxisMax;

            if (typeof self.config.source != "undefined") {
                self.interval = window.setInterval(function () {
                    console.log("query", self.config.source);
                    console.log(self.config);
                    kasimir_http(self.config.source).withBody(self.config).json = (response) => {
                        let datasets = [];
                        for(var i = 0; i < self.config.select.length; i++) {
                            var serie = response.data[self.config.select[i]];
                            datasets.push({data: serie});
                        }
                        chartData.data.datasets = datasets;

                        if (response.status == "ok") {
                            element.classList.remove("failed")
                        } else {
                            element.classList.add("failed")
                        }

                        chartData.data.labels = new Array(serie.length);
                        self.chart.update();
                    };



                }, 5000);
            }

        }, 100);
        console.log("connect basic-chart", this);
    }


}
window.customElements.define('chart-basic', ChartBasic);
