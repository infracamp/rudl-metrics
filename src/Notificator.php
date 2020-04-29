<?php


namespace Rudl;


use InfluxDB\Client;
use InfluxDB\Database;

class Notificator
{

    /**
     * @var Database
     */
    private $db;

    public function __construct()
    {
        $client = new Client(CONF_INFLUX_HOST, CONF_INFLUX_PORT, CONF_INFLUX_USER, CONF_INFLUX_PASS);
        $this->db = $client->selectDB("rudl");
    }

    protected function getPercentageErrorRate($data) : int
    {
        return ($data[0]["sum_tot.req500"] + $data[0]["sum_tot.req404"]) / $data[0]["sum_tot.req"] * 100;
    }

    public function checkCfErrorRates(&$state)
    {
        $r24 = $this->db->query("select sum(*) from cloudfront_stats_cluster_min WHERE time > now()-24h")->getPoints();
        $r1 = $this->db->query("select sum(*) from cloudfront_stats_cluster_min WHERE time > now()-1h")->getPoints();

        $log = $this->db->query("SELECT * FROM cloudfront WHERE status!='200' AND status!='301' ORDER by time DESC LIMIT 10")->getPoints();


        $logArr = [];
        foreach ($log as $row) {
            $date = date("Y-m-d H:i:s", strtotime($row["time"]));
            $logArr[] = "<b>{$date} {$row["cluster"]} {$row["status"]}:</b> {$row["remote_user"]} {$row["remote_addr"]} {$row["request"]}";
        }
        $logTxt = "<pre>" . implode("<br>", $logArr) ."</pre>>";


        $p24 = $this->getPercentageErrorRate($r24);
        $p1 = $this->getPercentageErrorRate($r1);

        if (! isset($state["cf_err"])) {
            $state["cf_err"] = false;
        }

        phore_log("Hour $p1 % - dynamic limit $p24 % + 15%");

        if ($p1 > $p24 + 15) {
            if ($state["cf_err"] === false) {
                $state["cf_err"] = true;
                $state["cf_last"] = time();
                $this->sendMsg("𝗔𝗟𝗘𝗥𝗧 Cloudfront error rate '$p1%' exceeds dynamic threshold ($p24%) by more than 15%", $logTxt);
            } else if ($state["cf_last"] < time() - 3600) {
                $state["cf_last"] = time();
                $this->sendMsg("𝗔𝗟𝗘𝗥𝗧 [Reminder] Cloudfront error rate '$p1%' exceeds dynamic threshold rate ($p24 %) by more than 15%", $logTxt);
            }

        } else if ($p1 < $p24) {
            if ($state["cf_err"] === false) {
                $state["cf_err"] = false;
                $this->sendMsg("ＲＥＳＯＬＶＥＤ Cloudfront error rate '$p1%' dropped below dynamic threshold rate");
            }

        }

    }


    public function sendMsg($title, $message="No additional information.")
    {
        phore_log("sending message: $title");
        if (CONF_TEAMS_WEBHOOK === "") {
            phore_log("no webhook defined");
            return;
        }

        phore_http_request(CONF_TEAMS_WEBHOOK)
            ->withPostBody([
                "title"=> "𝗥𝘂𝗱𝗹 𝗠𝗲𝘁𝗿𝗶𝗰𝘀 $title",
                "themeColor" => "cc0000",
                "text" => $message
            ])->send();
    }

    public function run(array &$state)
    {
        $this->checkCfErrorRates($state);

    }
}
