<?php
/**
 * Created by PhpStorm.
 * User: matthias
 * Date: 06.11.19
 * Time: 17:57
 *
 *
 */

namespace App;


use InfluxDB\Database;
use Phore\MicroApp\App;
use Phore\MicroApp\Type\Request;

/* @var $app App */

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


$app->router->onPost("/api/data/service.json", function (Request $request) {

    $body = $request->getJsonBody();
    $query = $body["query"];

    try {

        $request = phore_http_request($query)->withTimeout(1, 3);
        $request->send();
        $curlInfo = $request->getDriver()->curlInfoLastResponse;

        return [
            "status" => "ok",
            "data" => [
                "time" => [$curlInfo["total_time"]],
                "connect" => [$curlInfo["connect_time"]],
                "lookup" => [$curlInfo["namelookup_time"]]
            ]
        ];

    } catch (\Exception $e) {
        return ["status" => "fail: " . $e->getMessage(), "data" => []];
    }


});


$app->router->onGet("/api/data/html/:page", function (Request $request, Database $database, string $page) {

    require __DIR__ . "/page/" . $page . ".php";

    return true;

});





