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


//echo '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">';



$sql = "SELECT top(cnt,http_host,request_uri,status,13) as cnt FROM (SELECT count(bytes_sent) as cnt FROM syslog WHERE time > now() - 30m AND status='200' AND request_uri!='/' group by http_host, request_uri,status)";


$nodeData = $database->query($sql)->getPoints();
$tbl = [];
foreach ($nodeData as $cur) {


    $nodeInfo = [
        fhtml(["span @style=font-size:24px" => ["code @style=color:darkgreen" => $cur["http_host"]]]),
        fhtml(["span @style=font-size:24px" => ["code @style=color:darkgreen" => $cur["request_uri"]]]),
        fhtml(["code @style=color:darkgreen;font-size:24px" => $cur["status"]]),
        fhtml(["code @style=color:darkgreen;font-size:24px" => $cur["cnt"]]),
    ];


    $tbl[] = $nodeInfo;

}


echo pt("table-striped table-hover")->basic_table(
    ["OK Host", "OK Request", "Status", "Count"],
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
