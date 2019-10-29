<?php
/**
 * Created by PhpStorm.
 * User: matthias
 * Date: 25.10.19
 * Time: 14:38
 */

namespace Phore\Tests;


use PHPUnit\Framework\TestCase;

class NodeDataInTest extends TestCase
{


    public function testNodeStatusIn ()
    {
        $data = [
            "hostname" => "someName",
            "cluster" => "cluster1",
            "system" => [
                "avg_disk_io"  => 1234
            ]
        ];

        phore_http_request("http://localhost/v1/input/node")->withPostBody($data)->send();
    }

}
