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
        phore_log()->notice("Message in on SyslogProcessor $message");
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

            $severity = (int)$curMessage["severity"];

            if ($severity <= 3) {
                $tags["type"] = "err";
            } else if ($severity == 4) {
                $tags["type"] = "warn";
            } else if ($severity <= 6) {
                $tags["type"] = "info";
            } else {
                $tags["type"] = "debug";
            }


            $points[] = new Point("syslog",null,$tags, ["msg" => (string)$msg], (int)($curMessage["timestamp"] * 1000000));
        }
        phore_log()->notice("Sending " . count ($points) . " Points to syslog measurement.");

        $client = new Client(CONF_INFLUX_HOST, CONF_INFLUX_PORT, CONF_INFLUX_USER, CONF_INFLUX_PASS);
        $db = $client->selectDB("rudl");

        $db->writePoints($points, Database::PRECISION_MICROSECONDS);

    }
}
