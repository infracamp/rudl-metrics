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



$sql = "SELECT * FROM syslog ORDER BY time DESC LIMIT 100";


$queryResults = $database->query($sql)->getPoints();
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


echo \fhtml($rowdata);



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
