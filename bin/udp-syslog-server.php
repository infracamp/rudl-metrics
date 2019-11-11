<?php
/**
 * Created by PhpStorm.
 * User: matthias
 * Date: 06.11.19
 * Time: 14:40
 */

namespace Rudl;


use InfluxDB\Client;
use InfluxDB\Database;
use InfluxDB\Point;
use Phore\Log\Logger\PhoreEchoLoggerDriver;
use Phore\SockServer\Processor\AbstractSyslogProcessor;
use Phore\SockServer\SocketServer;
use Psr\Log\LogLevel;

require __DIR__ . "/../vendor/autoload.php";


phore_log()->setDriver(new PhoreEchoLoggerDriver());


phore_log()->setLogLevel(LogLevel::WARNING);

if (DEBUG_MODE) {
    phore_log()->setLogLevel(LogLevel::DEBUG);
}


class SyslogProcessor extends AbstractSyslogProcessor {


    public function filterMessage(string $message)
    {
        try {
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
                "request_uri" => $msg["request_uri"],
                "server_protocol" => $msg["server_protocol"],
                "status" => $msg["status"],
                "remote_addr" => $msg["remote_addr"]
            ];
            unset ($msg["cluster"], $msg["service"], $msg["http_host"], $msg["request_method"],$msg["request_uri"],$msg["server_protocol"]);
            unset ($msg["status"], $msg["remote_addr"]);

            $points[] = new Point("syslog",null,$tags, $msg, (int)($curMessage["timestamp"] * 1000));
        }
        phore_log()->notice("Sending " . count ($points) . " Points to syslog measurement.");

        $client = new Client("localhost");
        $db = $client->selectDB("rudl");
        if ( ! $db->exists())
            $db->create(new Database\RetentionPolicy("removeafter12h", "12h", 1, true));

        $db->writePoints($points, Database::PRECISION_MILLISECONDS);

    }
}



$udpServer = new SocketServer("0.0.0.0", "4200", phore_log());


$udpServer->addProcessor(new SyslogProcessor(phore_log()));

$udpServer->run(5);

