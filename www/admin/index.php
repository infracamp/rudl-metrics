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
use Phore\FileSystem\PhoreTempFile;
use Phore\Html\Fhtml\FHtml;
use Phore\Html\Helper\Highlighter;
use Phore\HttpClient\Ex\PhoreHttpRequestException;
use Phore\HttpClient\Handler\PhoreHttpFileStream;
use Phore\HttpClient\PhoreHttpAsyncQueue;
use Phore\HttpClient\PhoreHttpRequest;
use Phore\HttpClient\PhoreHttpResponse;
use Phore\MicroApp\Type\Request;
use Phore\MicroApp\Type\RouteParams;
use Phore\StatusPage\BasicAuthStatusPageApp;
use Phore\StatusPage\Mod\ModInterMicroServiceNavigaion;
use Phore\StatusPage\PageHandler\NaviButton;
use Phore\StatusPage\PageHandler\NaviButtonWithIcon;
use Talpa\Flesto\FlestoStoreInflux;


require __DIR__ . "/../../vendor/autoload.php";

set_time_limit(600);

$app = new BasicAuthStatusPageApp("rudl-metrics", "/admin");
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


$app->serve();
