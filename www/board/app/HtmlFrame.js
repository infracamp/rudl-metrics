

class HtmlFrame extends HTMLElement {


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
        shadow.innerHTML = '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"><div id="main"></div>';
        var element = shadow.getElementById("main");

        window.setTimeout(function () {
            console.log("connected");

            if (typeof self.config.source == "undefined")
                return;

            self.interval = window.setInterval(function () {
                console.log("query", self.config);
                var urlParams = new URLSearchParams(window.location.search);
                kasimir_http(self.config.source).withBearerToken(urlParams.get("token") || "none").plain = (response) => {
                    element.innerHTML = response;
                };
            }, (self.config.interval || 30) * 1000);


        }, (Math.random() * 10000) + 100);
        console.log("connect html-frame", this);
    }


}
window.customElements.define('html-frame', HtmlFrame);
