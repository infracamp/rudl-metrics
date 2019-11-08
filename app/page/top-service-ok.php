<?php
/**
 * Created by PhpStorm.
 * User: matthias
 * Date: 06.11.19
 * Time: 18:01
 */

namespace Page;

use Phore\Html\Fhtml\FHtml;

/* @var $database \InfluxDB\Database */


$sql = "SELECT top(cnt,http_host,request_uri,status,16) as cnt FROM (SELECT count(bytes_sent) as cnt FROM syslog WHERE time > now() - 15m AND status='200' group by http_host, request_uri,status)";


$nodeData = $database->query($sql)->getPoints();
$tbl = [];
foreach ($nodeData as $cur) {


    $nodeInfo = [
        $cur["http_host"],
        $cur["request_uri"],
        $cur["status"],
        $cur["cnt"] . "x"
    ];


    $tbl[] = $nodeInfo;

}


echo pt("table-striped table-hover")->basic_table(
    ["OK Host", "OK Request", "Status", "Count"],
    $tbl
);
