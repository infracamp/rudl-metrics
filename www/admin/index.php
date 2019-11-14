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
use Phore\MicroApp\Type\Request;
use Phore\StatusPage\BasicAuthStatusPageApp;
use Phore\StatusPage\PageHandler\NaviButton;
use Talpa\Flesto\FlestoStoreInflux;


require __DIR__ . "/../../vendor/autoload.php";

set_time_limit(600);

$app = new BasicAuthStatusPageApp("rudl-metrics", "/admin");
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

});



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

}, new NaviButton("Query"));


$app->addPage("/admin/syslog", function (Database $database, Request $request) {
    $q_system = $request->GET->get("system", "");
    $q_severity = $request->GET->get("severity", "");

    $whereStmts = ["1=1"];
    if ($q_system != "")
        $whereStmts[] = "system='" . addslashes($q_system) . "'";
    if ($q_severity != "")
        $whereStmts[] = "severity<" . addslashes((int)$q_severity) . "";

    $query = "SELECT * FROM syslog WHERE " . implode (" AND ", $whereStmts) . " ORDER BY time DESC LIMIT 1000";
    $queryResults = $database->query($query)->getPoints();

    $rowdata = [];
    foreach ($queryResults as $queryResult) {
        $color = "darkslategrey";
        if ($queryResult["severity"] < 5) {
            $color = "darkgoldenrod";
        }
        if ($queryResult["severity"] < 1) {
            $color = "darkred";
        }
        $rowdata[] = fhtml(["code @style=display:block;color:$color;" => "{$queryResult["time"]} {$queryResult["system"]} {$queryResult["facility"]} {$queryResult["severity"]}: {$queryResult["msg"]}"]);
    }



    $e = \fhtml();
    $r = $e["div @row"];
    $c1 = $r["div @col-12"];
    $c1[] = pt()->card(
        "See syslog values",
        [
            "form @action=/admin/syslog @method=get" => [
                fhtml("input @type=text @class=col-2 @name=system @value=? @placeholder=system", [(string)$q_system]),
                fhtml("input @type=text @class=col-1 @name=severity @value=? @placeholder=severity", [(string)$q_severity]),
                "button @type=submit" => "senden"
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

}, new NaviButton("Syslog"));


$app->serve();
