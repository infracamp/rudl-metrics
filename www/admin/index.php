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
use Phore\Log\PhoreLogger;
use Phore\MicroApp\Type\Request;
use Phore\StatusPage\BasicAuthStatusPageApp;
use Phore\StatusPage\PageHandler\NaviButton;
use Phore\StatusPage\PageHandler\NaviButtonWithIcon;
use Talpa\Flesto\FlestoStoreInflux;


require __DIR__ . "/../../vendor/autoload.php";

set_time_limit(600);

$app = new BasicAuthStatusPageApp("Rudl Metrics", "/admin");
$app->activateExceptionErrorHandlers();
$app->theme->frameworks["highlightjs"] = true;


/**
 ** Configure Dependency Injection
 **/
$app->define("database", function () : Database {
    $client = new Client("localhost");
    $db = $client->selectDB("rudl");
    $db->create();
    return $db;
});

$config = phore_file("/mod/metrics/config.yaml")->get_yaml();
foreach ($config["admin_users"] as $curUser) {
    $app->allowUser($curUser["user"], $curUser["pass"]);
}



$app->addPage("/admin/", function () {




    $e = \fhtml();
    $e[] = pt()->card(
        "Execute query in database '''",
        [
            "Hello woalrd."
        ]
    );

    return $e;

}, new NaviButtonWithIcon("Dashboard", "fas fa-home nav-icon"));



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


$app->addPage("/admin/syslog", function (Database $database, Request $request) {
    $q_system = $request->GET->get("system", "");
    $q_severity = $request->GET->get("severity", "");
    $q_hostname = $request->GET->get("hostname", "");
    $q_msg = $request->GET->get("msg", "");

    $whereStmts = ["1=1"];
    if ($q_system != "")
        $whereStmts[] = "system='" . addslashes($q_system) . "'";
    if ($q_hostname != "")
        $whereStmts[] = "hostname='" . addslashes($q_hostname) . "'";
    if ($q_severity != "")
        $whereStmts[] = "severity<" . addslashes((int)$q_severity) . "";
    if ($q_msg != "")
        $whereStmts[] = "msg =~ /" . addcslashes($q_msg, "/'") . "/";

    $query = "SELECT * FROM syslog WHERE " . implode (" AND ", $whereStmts) . " ORDER BY time DESC LIMIT 2500";
    $queryResults = $database->query($query)->getPoints();

    $rowdata = [];
    foreach ($queryResults as $i => $queryResult) {
        $color = "darkslategrey";
        if ($queryResult["severity"] < 5) {
            $color = "darkgoldenrod";
        }
        if ($queryResult["severity"] < 1) {
            $color = "darkred";
        }

        $date = strtotime($queryResult["time"]);
        $date = date("M d H:i:s", $date);
        $bg = "";
        if ($i % 10 < 5)
            $bg = "WhiteSmoke";

        $rowdata[] = fhtml(
            ["code @style=display:block;color:$color;background-color:$bg @title=:title" =>
                [
                    "b" => [
                        "{$date} ",
                        ["a @href=:hostLink" => "{$queryResult["hostname"]}"], " ",
                        ["a @href=:systemLink" => "{$queryResult["system"]}"], " ",
                        "{$queryResult["facility"]} [" . PhoreLogger::LOG_LEVEL_MAP[$queryResult["severity"]] . "]: "
                    ],
                    "{$queryResult["msg"]}"
                ],
            ],
            [
                "title" => $queryResult["time"] . ": " . $queryResult["msg"],
                "systemLink" => "?system=" . urlencode($queryResult["system"]),
                "hostLink" => "?hostname=" . urlencode($queryResult["hostname"])
            ]
        );
    }



    $e = \fhtml();
    $r = $e["div @row"];
    $c1 = $r["div @col-12"];
    $c1[] = pt()->card(
        "Syslog browser",
        [
            "form @action=/admin/syslog @method=get @class=form-inline" => [
                "div @class=form-group" => [
                    ["label @class=mr-1" => "System"],
                    fhtml("input @type=text @class=col-1 form-control @name=system @value=?", [(string)$q_system]),
                    ["label @class=mr-1 ml-2" => "Hostname"],
                    fhtml("input @type=text @class=col-1 form-control @name=hostname @value=?", [(string)$q_hostname]),
                    ["label @class=mr-1 ml-2" => "Severity"],
                    fhtml("input @type=text @class=col-1 form-control @name=severity @value=?", [(string)$q_severity]),
                    ["label @class=mr-1 ml-2" => "Filter"],
                    fhtml("input @type=text @class=col-2 form-control @name=msg @value=?", [(string)$q_msg]),
                    "button @class=ml-2 btn btn-primary @type=submit" => "Apply filter"
                ]
            ]
        ]
    );


    $c1[] = pt()->card(
        "Result of query: $query",
        [
            "div @style=overflow-y:scroll;white-space:nowrap;" => $rowdata
        ]
    );

    return $e;

}, new NaviButtonWithIcon("Syslog", "fas fa-list nav-icon"));


$app->serve();
