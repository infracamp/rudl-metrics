<?php
/**
 * Created by PhpStorm.
 * User: matthias
 * Date: 06.11.19
 * Time: 18:01
 */

namespace Page;

use Phore\Html\Fhtml\FHtml;

/* @var $database \InfluxDB\Database */

$gitlabToken = CONF_GITLAB_TOKEN;

echo "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">";

if ($gitlabToken == "") {
    echo "<h1>Gitlab support disabled. Please provide CONF_GITLAB_TOKEN to use this feature</h1>";
    return;
}

try {
    $result = phore_http_request("https://gitlab.com/api/v4/projects?membership=1&simple=1")
        ->withHeaders(["PRIVATE-TOKEN" => $gitlabToken])
        ->send()
        ->getBodyJson();

} catch (\Exception $e) {
    echo "<h1>Gitlab token invalid or unable to pull gitlab service</h1>";
    return;
}

function parseDate(string $in) : \DateTime {
    if (preg_match("/^([0-9\-]+)T([0-9\:]+)/", $in, $matches)) {
        return new \DateTime($matches[1] . "T" . $matches[2], new \DateTimeZone("GMT"));
    }
    throw new \InvalidArgumentException("Cannot parse time $in");
}



usort($result, function ($a, $b) {
    return parseDate($a["last_activity_at"]) < parseDate($b["last_activity_at"]);
});



$nodes = [];
foreach ($result as $index => $cur) {

    $nodeInfo = [];
    $icon = $cur["avatar_url"] != null ? fhtml("img @src=? @height=40 @width=40", [$cur["avatar_url"]]) : \fhtml("div @style=display:inline-block;height:40px;width:40px;vertical-align:middle;");
    $date = parseDate($cur["last_activity_at"]);


    $nodeInfo[] = fhtml([$icon, "b @style=padding-left:25px;font-size:34px" => $cur["name"], "small" =>" :" . $cur["default_branch"]]);
    $nodeInfo[] = fhtml(["b @style=font-size:34px" => phore_format()->dateInterval((time() - $date->getTimestamp()), true)]);
    //$nodeInfo[] = $cur[""]

    try {
        $buildStatus = phore_http_request("https://gitlab.com/api/v4/projects/{id}/pipelines", ["id" => $cur["path_with_namespace"]])
            ->withHeaders(["PRIVATE-TOKEN" => $gitlabToken])
            ->send()
            ->getBodyJson();
        $status = phore_pluck("0.status", $buildStatus, "undefined");
    } catch (\Exception $e) {
        $status = "polling error";
    }


    $msg2badge = [
        "running" => "badge-primary",
        "success" => "badge-success",
        "failed" => "badge-danger",
        "pending" => "badge-info",
        "polling error" => "badge-warning",
        "undefined" => "badge-light"
    ];


    $nodeInfo[] = fhtml(["h1 @style=padding:0px;margin:0px" => ["span @class=badge @{$msg2badge[$status]}" => $status]]);

    $nodes[] = $nodeInfo;
    if ($index > 6)
        break;

}



echo pt("table-striped table-hover")->basic_table(
    [ "Repo", "Update", ""],
    $nodes,
    ["", "@style=text-align:right", "@style=float:right"]
);
