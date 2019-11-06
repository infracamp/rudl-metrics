<?php

# Demo Syslog generator RFC3164 (nginx default) for logstash


define ("SYSLOG_IP", "127.0.0.1");
define("SYSLOG_PORT", 4200);



function genLog ($status=200)
{
    $time_iso8601 = (new DateTime())->format(DateTime::ATOM);

    $nginxLog = [

        "cluster" => "unnamed",
        "service" => "cloudfront",

        "time_iso8601" => "$time_iso8601",
        "status" => "$status",
        "bytes_sent" => "1034945",
        "body_bytes_sent" => "784092",

        "remote_addr" => "192.168.24.234",

        "remote_user" => "",
        "request" => "http://xyz.de",
        "request_time" => "329",

        "request_id" => "op2kjlödfj",
        "request_length" => "02348",
        "request_method" => "GET",
        "request_uri" => "https://20kdfj.wr/slkd/sdfa",

        "server_addr" => "127.0.0.2",
        "server_port" => "80",
        "server_protocol" => "https",
        "ssl_protocol" => "tls",

        "http_host" => "198.28.217.23",
        "http_referrer" => "",
        "http_user_agent" => "linux",

        "upstream_addr" => "182.22.28.82",
        "upstream_response_time" => "123",
        "upstream_connect_time" => "24"

    ];
    return json_encode($nginxLog);
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
    send_remote_syslog(genLog(200));
    sleep (1);
}

