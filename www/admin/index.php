<?php
/**
 * Created by PhpStorm.
 * User: matthias
 * Date: 14.11.18
 * Time: 13:37
 */

namespace Tadis;

use InfluxDB\Client;
use InfluxDB\Database;
use Phore\Html\Elements\RawHtmlNode;
use Phore\Log\PhoreLogger;
use Phore\MicroApp\Response\JsonResponse;
use Phore\MicroApp\Type\QueryParams;
use Phore\MicroApp\Type\Request;
use Phore\StatusPage\BasicAuthStatusPageApp;
use Phore\StatusPage\PageHandler\NaviButton;
use Phore\StatusPage\PageHandler\NaviButtonWithIcon;
use PHPUnit\Util\Json;
use Talpa\Flesto\FlestoStoreInflux;


require __DIR__ . "/../../vendor/autoload.php";

set_time_limit(600);

$app = new BasicAuthStatusPageApp(CONF_BRAND_NAME, "/admin");
$app->activateExceptionErrorHandlers();
$app->theme->frameworks["highlightjs"] = true;
$app->theme->jsUrls[] = "/admin/assets/kasimir.full.js";
$app->theme->cssUrls[] = "/admin/assets/logstyle.css";

$app->theme->footer[] = [
    "div @float-right @text-muted" => new RawHtmlNode("Rudl Metrics " . VERSION_INFO . " &copy; 2020 <a href='https://infracamp.org'>infracamp.org</a> contributors")
];

/**
 ** Configure Dependency Injection
 **/
$app->define("database", function () : Database {
    $client = new Client(CONF_INFLUX_HOST, CONF_INFLUX_PORT, CONF_INFLUX_USER, CONF_INFLUX_PASS);
    $db = $client->selectDB("rudl");
    return $db;
});

$config = phore_file(CONFIG_PATH . "/config.yaml")->get_yaml();
foreach ($config["admin_users"] as $curUser) {
    $app->allowUser($curUser["user"], $curUser["pass"]);
}


$app->router->onGet("/admin/api/query", function (Database $database, QueryParams $params) {
    $q = $params->get("q", new \InvalidArgumentException("Missing q parameter"));
    $resp = [
        "qtime" => gmdate("Y-m-d\TH:i:s\.064332\Z"),
        "result" => null
    ];

    if (is_array ($q)) {
        $resp["result"] = [];
        foreach ($q as $key => $query) {
            $resp["result"][$key] = $database->query($query)->getPoints();
        }
    } else {
        $resp["result"] =  $database->query($q)->getPoints();
    }

    return new JsonResponse($resp);
});

$app->router->onGet("/admin/api/ipinfo", function (Database $database, QueryParams $params) {
    $ip = $params->get("ip", new \InvalidArgumentException("Missing query parameter ip"));

    $ret = [
        "ip" => $ip,
        "requests" => $database->query("SELECT * FROM cloudfront WHERE remote_addr='$ip' AND time > now()-24h ORDER BY time DESC LIMIT 100 ")->getPoints(),
        "host" => gethostbyaddr($ip),
        "whois" => utf8_encode(phore_exec("whois :ip", ["ip" => $ip]))
    ];
    return new JsonResponse($ret);
});

$app->router->onGet("/admin/api/nodeinfo", function (Database $database) {
    $nodeData = $database->query("SELECT DISTINCT(host) as host FROM node_stat WHERE time > now() - 30m GROUP BY cluster, host")->getPoints();
    $ret = ["qtime" => gmdate("Y-m-d\TH:i:s\Z"), "result" => []];
    foreach ($nodeData as $cur) {
        $hostName = $cur["host"];
        $hData = $database->query("SELECT * FROM node_stat WHERE host='$hostName' AND time > now() - 30m ORDER BY time DESC LIMIT 1")->getPoints();

        if (count($hData) == 0) {
            continue;
        }
        $hData = $hData[0];
        $ret["result"][] = $hData;

    }
    $ret["qtime"] =  gmdate("Y-m-d\TH:i:s\.999\Z");
    return new JsonResponse($ret);
});

$app->addPage("/admin/", function () {

    $e = \fhtml();
    $e->loadHtml(__DIR__ . "/tpl/dashboard-top.html");
    $e->loadHtml(__DIR__ . "/tpl/dashboard-traffic.html");
    $e->loadHtml(__DIR__ . "/tpl/dashboard-log.html");
    return $e;

}, new NaviButtonWithIcon("Dashboard", "fas fa-home nav-icon"));

/*
$app->addPage("/admin/dashboards", function () {
    $e = \fhtml();
    $e->loadHtml(__DIR__ . "/tpl/dashboard-top.html");
    return $e;
}, new NaviButtonWithIcon("Dashboard", "fas fa-home nav-icon"));
*/

$app->addPage("/admin/query", function (Database $database, Request $request) {
    $query = $request->GET->get("q", "SHOW MEASUREMENTS");
    $outputFormat = $request->GET->get("outputFormat", "json");

    $output = $database->query($query)->getPoints();
    $data = phore_json_pretty_print(phore_json_encode($output));
    $tables = $database->query("SHOW MEASUREMENTS")->getPoints();

    $e = \fhtml();
    $r = $e["div @row"];
    $c1 = $r["div @col-8"];
    $c2 = $r["div @col-4"];
    $c1[] = pt()->card(
        "Execute query in database ",
        [
            "form @action=/admin/query @method=get" => [
                fhtml("input @type=text @style=width:100% @name=q @value=?", [$query]),
                fhtml("select @name=outputFormat")->options(["json", "csv"], $outputFormat),
                "button @type=submit" => "senden"
            ]
        ]
    );

    $tbl = phore_array_transform($tables, function ($key, $value) {
        return [
            $value["name"]
        ];
    });



    $c1[] = pt()->card(
        "Result of query: $query",
        [
            "pre" => [
                "code" => "\nRequest-Url:\n\n". $data
            ]
        ]
    );
    $c2[] = pt()->card(
        "Tables in database",
        pt("table-striped table-hover")->basic_table(
            ["Table"],
            $tbl,
            [""]
        )
    );

    return $e;
}, new NaviButtonWithIcon("Query", "fas fa-database nav-icon"));


$app->addPage("/admin/cloudfront", function() {
    $e = \fhtml();
    $e->loadHtml(__DIR__ . "/tpl/cloudfront-head.html");
    $e->loadHtml(__DIR__ . "/tpl/cloudfront.html");
    return $e;
}, new NaviButtonWithIcon("Cloudfront", "fas fa-globe nav-icon"));


$app->addPage("/admin/nodeinfo", function() {
    $e = \fhtml();
    $e->loadHtml(__DIR__ . "/tpl/nodeinfo.html");
    return $e;
}, new NaviButtonWithIcon("Nodes", "fas fa-server nav-icon"));


$app->addPage("/admin/syslog", function () {
    $e = fhtml();
    $e->loadHtml(__DIR__ . "/tpl/syslog-head.html");
    $e->loadHtml(__DIR__ . "/tpl/syslog.html");
    return $e;
}, new NaviButtonWithIcon("Syslog", "fas fa-list nav-icon"));





$app->serve();
