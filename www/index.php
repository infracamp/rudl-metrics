<?php

namespace App;



use InfluxDB\Client;
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



$app->router->onPost("/v1/push", function (Request $request) {
    $client = new Client("localhost");
    $db = $client->selectDB("node");
    $db->create();


    //$points[] =

});



$app->router->onGet("/api/data/stats.json", function () {
    return [
        "a" => [100, 99, 38, 99, 28]
    ];

});


$app->router->onGet("/api/config.json", function () {
    return phore_file(__DIR__ . "/../etc/config.yaml")->get_yaml();
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
