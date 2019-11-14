<?php
/**
 * Created by PhpStorm.
 * User: matthias
 * Date: 14.11.19
 * Time: 14:46
 */

namespace Rudl;

use InfluxDB\Client;
use InfluxDB\Database;
use InfluxDB\Database\RetentionPolicy;
use InfluxDB\Point;
use Phore\SockServer\Processor\AbstractSyslogProcessor;

class SyslogProcessor extends AbstractSyslogProcessor {


    public function filterMessage(string $message)
    {
        return $message;
    }


    /**
     * Process the data asyncron.
     *
     * Make sure DB Connections are re-established before writing to them!
     *
     *
     *
     * @param int $flushTimestamp
     * @return mixed
     */
    public function processData(int $flushTimestamp)
    {
        $points = [];

        foreach ($this->buffer as $curMessage) {
            $msg = $curMessage["message"];

            $tags = [
                "hostname" => (string)$curMessage["hostname"],
                "system" => (string)$curMessage["system"],
                "facility" => (int)$curMessage["facility"],
                "severity" => (int)$curMessage["severity"],
                "clientIp" => (string)$curMessage["clientIp"],
            ];
            $points[] = new Point("syslog",null,$tags, ["msg" => (string)$msg], (int)($curMessage["timestamp"] * 1000));
        }
        phore_log()->notice("Sending " . count ($points) . " Points to syslog measurement.");

        $client = new Client("localhost");
        $db = $client->selectDB("rudl");
        if ( ! $db->exists())
            $db->create(new RetentionPolicy("removeafter12h", "12h", 1, true));

        $db->writePoints($points, Database::PRECISION_MILLISECONDS);

    }
}
