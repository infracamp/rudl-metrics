<?php

namespace App;



use InfluxDB\Client;
use InfluxDB\Database;
use InfluxDB\Point;
use Phore\MicroApp\App;
use Phore\MicroApp\Handler\JsonExceptionHandler;
use Phore\MicroApp\Handler\JsonResponseHandler;
use Phore\MicroApp\Type\Request;

require __DIR__ . "/../vendor/autoload.php";

$app = new App();
$app->activateExceptionErrorHandlers();
$app->setOnExceptionHandler(new JsonExceptionHandler());
$app->setResponseHandler(new JsonResponseHandler());



/**
 ** Configure Access Control Lists
 **/
$app->acl->addRule(\aclRule()->route("/*")->ALLOW());


/**
 ** Configure Dependency Injection
 **/

$app->define("database", function () {
    $client = new Client("localhost");
    $db = $client->selectDB("rudl");
    $db->create();
    return $db;
});

$app->router->onPost("/v1/push/node", function (Request $request, Database $database) {
    $points = [];
    $in = $request->getJsonBody();

    $hostname = phore_pluck("host", $in, "unknown");
    $cluster = phore_pluck("cluster", $in, "unknown");
    $data = phore_pluck("system", $in, []);

    $points[] = new Point("node_stat", null, ["host" => $hostname, "cluster"=>$cluster], $data);

    $database->writePoints($points);
    return ["success" => true];
});



$app->router->onPost("/api/data/stats.json", function (Request $request, Database $database) {
    $ret = ["status"=>"ok", "data" => []];

    $body = $request->getJsonBody();

    $result = $database->query($body["query"]);

    $points = $result->getPoints();

    foreach ($points as $point) {
        foreach ($body["select"] as $select) {
            if ( ! isset ($ret["data"][$select]))
                $ret["data"][$select] = [];
            $ret["data"][$select][] = $point[$select];
        }
    }
    return $ret;
});


$app->router->onGet("/api/config.json", function () {
    $data = phore_file(__DIR__ . "/../etc/config.yaml")->get_yaml();

    foreach ($data["dashboards"] as $key => &$dashboard) {
        foreach ($dashboard as &$item) {
            if ( ! is_array($item["elements"]))
                continue;
            foreach ($item["elements"] as &$element) {
                if (isset ($element["template"]))
                    $element["template"] = phore_file(__DIR__ . "/../etc/" . $element["template"])->get_yaml();
            }

        }
    }
    return $data;
});



$app->router->onGet("/", function() {
    echo phore_file(__DIR__ . "/dashboard.inc.html")->get_contents();
    return true; // Continue with next controllers.
});


/**
 ** Define Routes
 **/











/**
 ** Run the application
 **/
$app->serve();
