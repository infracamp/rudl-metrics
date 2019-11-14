<?php

# Demo Syslog generator RFC3164 (nginx default) for logstash


define ("SYSLOG_IP", "localhost");
define("SYSLOG_PORT", 4200);



function genLog ($status=200)
{
    $time_iso8601 = (new DateTime())->format(DateTime::ATOM);

   return "Something failed here";
}



function send_remote_syslog($message, $component = "web", $program = "next_big_thing", $facility=2, $severity=7) {
    $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
    foreach(explode("\n", $message) as $line) {
        $date = new DateTime();
        $pri = (int)(($facility * 8) + $severity);
        $syslog_message = "<$pri>" . date('M d H:i:s') . " app1 xfc: $message";
        //$syslog_message = "<164>" .date('M d H:i:s'). " 1.2.3.4 %ASA-4-106023: Deny udp src DRAC:10.1.2.3/43434 dst outside:192.168.0.1/53 by access-group \"acl_drac\" [0x0, 0x0]";

        socket_sendto($sock, $syslog_message, strlen($syslog_message), 0, SYSLOG_IP, SYSLOG_PORT);
    }
    socket_close($sock);
}


while (true) {
    send_remote_syslog(genLog(200), "web", "prog", 2, 0);
    send_remote_syslog(genLog(200), "web", "prog", 2, 3);
    send_remote_syslog(genLog(200), "web", "prog", 2, 5);
    send_remote_syslog(genLog(200), "web", "prog", 2, 7);
    sleep (1);
}

