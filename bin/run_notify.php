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

$state = [];
while (true) {
    try {
        $a = new Notificator();
        $a->run($state);
        sleep(120);
    } catch (\Exception $e) {
        phore_log()->warning($e->getMessage());
        sleep(120);
    }

}



