<?php


namespace Rudl;


use InfluxDB\Client;
use InfluxDB\Database;
use InfluxDB\Point;
use Rudl\Tools\DataList;

class InfluxDbStats
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

    public function init()
    {
        if ( ! $this->db->exists())
            $this->db->create(null, true);
        $this->db->alterRetentionPolicy(new Database\RetentionPolicy("autogen", "30d", 1, true));
        //$this->db->createRetentionPolicy(new Database\RetentionPolicy("360days", "360d", 1, false));
        //$this->db->createRetentionPolicy(new Database\RetentionPolicy("1h", "1h", 1, false));
        //$this->db->createRetentionPolicy(new Database\RetentionPolicy("6days", "6d", 1, false));

    }


    public function getSyslogSystems()
    {
        $result = $this->db->query("select count(*) as count from syslog  WHERE time > now() - 24h group by system")->getPoints();
        $ret = [];
        foreach ($result as $sing) {
            $ret[] = $sing;
        }
        return $sing;
    }

    public function aggregateSyslogTimesSystem()
    {
        $results = $this->db->query("select count(*) from syslog  WHERE time > now() - 5m GROUP BY time(1m),severity,system")->getPoints();
        $ret = [];
        $t = new DataList($ret);
        foreach ($results as $res) {
            $e = $t->select($res["time"]);

            $evt = "notice";
            if ((int)$res["severity"] < 5)
                $evt = "warn";
            if ((int)$res["severity"] < 1)
                $evt = "emerg";

            $e->inc("evt.{$evt}",   $res["count_msg"]);
            $e->set("sys.{$res["system"]}.{$evt}", $res["count_msg"]);
            $e->inc("sys.{$res["system"]}.total", $res["count_msg"]);
        }
        $inserts = [];
        foreach($ret as $date => $mu) {
            $inserts[] = new Point("syslog_stats_min", null, [], $mu, strtotime($date));
        }
        $this->db->writePoints($inserts, Database::PRECISION_SECONDS);
    }

    public function aggregateCloudFrontData()
    {
        $results = $this->db->query("SELECT count(request), sum(bytes_sent) as bytes_sent, sum(request_length) as request_length from cloudfront Where time > now() - 5m GROUP BY time(1m),cluster,status")->getPoints();
        $ret = [];
        $t = new DataList($ret);
        foreach ($results as $res) {
            $e = $t->select($res["time"]);

            $e->inc("tot.bytesin", (int)$res["request_length"]);
            $e->inc("tot.bytesout", (int)$res["bytes_sent"]);
            $e->inc("tot.req", (int)$res["count"]);
            $e->inc("tot.req{$res["status"]}", (int)$res["count"]);

            $e->inc("cl.{$res["cluster"]}.bytesin", (int) $res["request_length"]);
            $e->inc("cl.{$res["cluster"]}.bytesout", (int)  $res["bytes_sent"]);
            $e->inc("cl.{$res["cluster"]}.req", (int)  $res["count"]);
            $e->inc("cl.{$res["cluster"]}.req{$res["status"]}", (int)  $res["count"]);

        }
        $inserts = [];
        foreach($ret as $date => $mu) {
            $inserts[] = new Point("cloudfront_stats_cluster_min", null, [], $mu, strtotime($date));
        }
        $this->db->writePoints($inserts, Database::PRECISION_SECONDS);
    }

}
