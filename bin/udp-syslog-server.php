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


phore_log()->addDriver(new PhoreEchoLoggerDriver());


phore_log()->setLogLevel(LogLevel::WARNING);

if (DEBUG_MODE) {
    phore_log()->setLogLevel(LogLevel::DEBUG);
}





$udpServer = new SocketServer("0.0.0.0", "4200", phore_log());


$udpServer->addProcessor(new CloudFrontSyslogProcessor(phore_log()));
$udpServer->addProcessor(new SyslogProcessor(phore_log()));
$udpServer->run(5);

