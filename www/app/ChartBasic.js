

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
        shadow.innerHTML = '<div><canvas id="chart"></canvas></div>';
        var element = shadow.getElementById("chart");

        var config = {
            type: "line",
            data: {
                labels: ["a", "b", "c"],
                datasets: [
                    {
                        label: 'My First dataset'
                    },
                ]
            }
        }

        window.setTimeout(function () {
            console.log("connected");
            self.chart = new Chart(element.getContext("2d"), config);

            if (typeof self.config.source != "undefined") {
                self.interval = window.setInterval(function () {
                    console.log("query", self.config.source);
                    kasimir_http(self.config.source).json = (data) => {
                        console.log("new data", data);
                        config.data.labels = new Array(data.a.length);
                        config.data.datasets[0].data = data.a;
                        self.chart.update();
                    };



                }, 5000);
            }

        }, 100);
        console.log("connect basic-chart", this);
    }


}
window.customElements.define('chart-basic', ChartBasic);
