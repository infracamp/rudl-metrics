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

$app->router->onPost("/api/data/stats.json", function (Request $request, Database $database, $dashTokenValid) {
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


$app->router->onPost("/api/data/service.json", function (Request $request, $dashTokenValid) {

    $body = $request->getJsonBody();
    $query = $body["query"];

    try {

        $request = phore_http_request($query)->withTimeout(1, 3);
        $request->send();
        $curlInfo = $request->getDriver()->curlInfoLastResponse;

        return [
            "status" => "ok",
            "data" => [
                "time" => [$curlInfo["total_time"]*100],
                "connect" => [$curlInfo["connect_time"]*100],
                "lookup" => [$curlInfo["namelookup_time"]*100]
            ]
        ];

    } catch (\Exception $e) {
        return ["status" => "fail: " . $e->getMessage(), "data" => []];
    }


});


$app->router->onGet("/api/pages/:page", function (Request $request, Database $database, string $page, $dashTokenValid) {
    $page = phore_assert($page)->safeString(["_", "-"]);

    $file = phore_file(CONFIG_PATH . "/pages/$page.php");
    if ($file->exists())
        require $file;

    $file = phore_file(__DIR__ . "/pages/" . $page . ".php");
    if ($file->exists())
        require $file;

    return true;

});





