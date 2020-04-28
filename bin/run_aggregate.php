#!/usr/bin/php
<?php
namespace Rudl;


use Phore\Log\Logger\PhoreEchoLoggerDriver;
use Phore\Log\PhoreLogger;
use Psr\Log\LogLevel;

require __DIR__ . "/../vendor/autoload.php";

PhoreLogger::Init(new PhoreEchoLoggerDriver());

phore_log()->setLogLevel(LogLevel::WARNING);

if (DEBUG_MODE) {
    phore_log()->setLogLevel(LogLevel::DEBUG);
}

while (true) {
    try {
        $class = new InfluxDbStats();
        phore_log()->notice("init database...");
        $class->init();

        phore_log()->notice("start aggregating syslog...");

        $class->aggregateSyslogTimesSystem();
        phore_log()->notice("start aggregating cloudfront...");
        $class->aggregateCloudFrontData();
        phore_log()->notice("done");
        sleep(60);
    } catch (\Exception $e) {
        phore_log()->alert("Exception:" . $e->getMessage());
        sleep(10);
    }
}

