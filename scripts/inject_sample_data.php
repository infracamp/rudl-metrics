<?php
/**
 * Created by PhpStorm.
 * User: matthias
 * Date: 06.11.19
 * Time: 18:25
 */

require __DIR__ . "/../vendor/autoload.php";

function push ($host, $cluster) {

    phore_http_request("http://localhost/v1/push/node")->withPostBody([
        "host" => $host,
        "cluster" => $cluster,
        "system" => [
            "loadavg" => (float)mt_rand(0,10),
            "host" => $host,
            "mem_avail_kb" => mt_rand(0,100000),
            "mem_total_kb" => 1000000

        ],

    ])->send();

}


push("host1-1", "cluster1");
push("host1-2", "cluster1");
push("host1-3", "cluster1");
push("host1-4", "cluster1");
push("host2-1", "cluster2");
push("host2-2", "cluster2");
push("host2-3", "cluster2");


