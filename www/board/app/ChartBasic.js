

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
        shadow.innerHTML = '<style>.failed { background-color: lightcoral }</style><div><canvas id="chart"></canvas><p style="float: left;color: red; font-size: 18px" id="msg"></p></div>';
        var element = shadow.getElementById("chart");
        var msgElem = shadow.getElementById("msg");
        var chartData = {
            data: {
                datasets: []
            }
        };

        window.setTimeout(function () {
            console.log("connected");
            chartData = self.config.template;
            self.config.template = null;

            self.chart = new Chart(element.getContext("2d"), chartData);
            if (typeof self.config.yAxisMax !== "undefined")
                chartData.options.scales.yAxes[0].ticks.suggestedMax = self.config.yAxisMax;

            if (typeof self.config.source != "undefined") {
                self.interval = window.setInterval(function () {
                    // console.log("query", self.config.source);
                    // console.log(self.config);
                    kasimir_http(self.config.source).withBody(self.config).json = (response) => {


                        if (self.config.append === true) {
                            var keep = self.config.keep || 60;

                            for(var i = 0; i < self.config.select.length; i++) {
                                var point = response.data[self.config.select[i]];
                                if (typeof chartData.data.datasets[i] === "undefined") {
                                    chartData.data.datasets.push({
                                        data: []
                                    });
                                }
                                chartData.data.datasets[i].data.push(point);
                                if (chartData.data.datasets[i].data.length > keep)
                                    chartData.data.datasets[i].data.shift();
                            }
                            chartData.data.labels = new Array(keep);
                        } else {
                            let datasets = [];
                            for(var i = 0; i < self.config.select.length; i++) {
                                var serie = response.data[self.config.select[i]];
                                datasets.push({data: serie});
                            }
                            chartData.data.datasets = datasets;
                            chartData.data.labels = new Array(serie.length);
                        }

                        if (response.status == "ok") {
                            element.classList.remove("failed");
                            msgElem.innerText = "";
                        } else {
                            element.classList.add("failed");
                            msgElem.innerText = response.status;

                        }

                        self.chart.update();
                    };



                }, (self.config.interval || 15) * 1000);
            }

        }, (Math.random() * 1000) + 100);
        console.log("connect basic-chart", this);
    }


}
window.customElements.define('chart-basic', ChartBasic);
