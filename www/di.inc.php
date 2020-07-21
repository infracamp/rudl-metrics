<?php
/**
 * Created by PhpStorm.
 * User: matthias
 * Date: 17.07.20
 * Time: 14:38
 */


namespace App;




/* @var $app \Phore\MicroApp\App */

$app->define("mongoClient", function () : \MongoDB\Client {
    if (CONF_MONGODB_CON === "")
        throw new \InvalidArgumentException("MongoDb connection not defined in configuration. Please set CONF_MONGODB_CON env.");
    $url = phore_parse_url(CONF_MONGODB_CON);

    $client = new \MongoDB\Client($url->getAsString());
    return $client;
});

$app->define("database", function () {
    $client = new \InfluxDB\Client(CONF_INFLUX_HOST, CONF_INFLUX_PORT, CONF_INFLUX_USER, CONF_INFLUX_PASS);
    $db = $client->selectDB("rudl");
    if ( ! $db->exists())
        $db->create(new \InfluxDB\Database\RetentionPolicy("removeafter48h", "12h", 1, true));
    return $db;
});
