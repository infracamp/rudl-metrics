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


$sql = "SELECT top(cnt,http_host,request_uri,status,13) as cnt FROM (SELECT count(bytes_sent) as cnt FROM syslog WHERE time > now() - 15m AND (status='500' OR status='404') group by http_host, request_uri,status)";


$nodeData = $database->query($sql)->getPoints();
$tbl = [];
foreach ($nodeData as $cur) {


    $nodeInfo = [
        fhtml(["span" => ["code" => $cur["http_host"]]]),
        fhtml(["span" => ["code" => $cur["request_uri"]]]),
        fhtml(["code" => $cur["status"]]),
        fhtml(["code" => $cur["cnt"]]),
    ];


    $tbl[] = $nodeInfo;

}


echo pt("table-striped table-hover")->basic_table(
    ["Fail Host", "Fail Request", "Status", "Count"],
    $tbl,
    [
        "@ellipsis @style=width:20%;",
        "@ellipsis @style=width:60%;",
        "@style=width:10%;",
        "@style=width:10%"
    ]
);
echo <<<EOT

<style>
.ellipsis {
    position: relative;
}
.ellipsis:before {
    content: '&nbsp;';
    visibility: hidden;
}
.ellipsis span {
    position: absolute;
    left: 0;
    right: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
EOT;
