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

class CloudFrontSyslogProcessor extends AbstractSyslogProcessor {


    public function filterMessage(string $message)
    {
        try {
            if (substr($message, 0, 1) !== "{") {
                phore_log()->notice("Rejected $message in CloudFrontProcessor");
                return null; // Not a json string!
            }

            $data = phore_json_decode($message);
        } catch(\Exception $e) {
            phore_log()->notice("Cannot json decode message: $message");
            return null;
        }
        return $data;
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
                "cluster" => phore_pluck("cluster", $msg, "undefined"),
                "service" => phore_pluck("service", $msg, "undefined"),
                "hostname" => $curMessage["hostname"],
                "system" => $curMessage["system"],
                "facility" => $curMessage["facility"],
                "severity" => $curMessage["severity"],
                "clientIp" => $curMessage["clientIp"],

                "http_host" => $msg["http_host"],
                "request_method" => $msg["request_method"],
                //"request_uri" => $msg["request_uri"],
                "server_protocol" => $msg["server_protocol"],
                "status" => $msg["status"],
                "remote_addr" => $msg["remote_addr"]
            ];

            $status = (int)$msg["status"];

            if ($status <= 399) {
                $tags["type"] = "OK";
            } else if ($status <= 499) {
                $tags["type"] = "USRFAIL";
            } else {
                $tags["type"] = "SRVFAIL";
            }

            unset ($msg["cluster"], $msg["service"], $msg["http_host"], $msg["request_method"],$msg["server_protocol"]);
            unset ($msg["status"], $msg["remote_addr"]);

            $points[] = new Point("cloudfront",null,$tags, $msg, (int)($curMessage["timestamp"] * 1000000));
        }
        phore_log()->notice("Sending " . count ($points) . " Points to syslog measurement.");

        $client = new Client(CONF_INFLUX_HOST, CONF_INFLUX_PORT, CONF_INFLUX_USER, CONF_INFLUX_PASS);
        $db = $client->selectDB("rudl");

        $db->writePoints($points, Database::PRECISION_MICROSECONDS);

    }
}
