<?php

namespace App;



use InfluxDB\Client;
use InfluxDB\Database;
use InfluxDB\Point;
use Phore\MicroApp\App;
use Phore\MicroApp\Handler\JsonExceptionHandler;
use Phore\MicroApp\Handler\JsonResponseHandler;
use Phore\MicroApp\Type\Request;
use Phore\VCS\VcsFactory;

require __DIR__ . "/../vendor/autoload.php";

$app = new App();
$app->activateExceptionErrorHandlers();
$app->setOnExceptionHandler(new JsonExceptionHandler());
$app->setResponseHandler(new JsonResponseHandler());



/**
 ** Configure Access Control Lists
 **/
$app->acl->addRule(\aclRule()->route("/*")->ALLOW());


/**
 ** Configure Dependency Injection
 **/

$app->define("database", function () {
    $client = new Client(CONF_INFLUX_HOST, CONF_INFLUX_PORT, CONF_INFLUX_USER, CONF_INFLUX_PASS);
    $db = $client->selectDB("rudl");
    if ( ! $db->exists())
        $db->create(new Database\RetentionPolicy("removeafter48h", "12h", 1, true));
    return $db;
});

$app->define("dashTokenValid", function (Request $request) : bool {
    $config = phore_file(CONFIG_PATH . "/config.yaml")->get_yaml();
    if ($request->GET->has("token")) {
        $token = $request->GET->get("token");
        if (in_array($token, $config["dash_tokens"]))
            return true;
    }
    if ($request->authorizationMethod === "bearer") {
        if (in_array($request->getAuthBearerToken(), $config["dash_tokens"])) {
            return true;
        }
    }
    throw new \Exception("Token invalid. Access denied! Specify valid ?token=");

});

$app->router->onPost("/v1/push/node", function (Request $request, Database $database) {
    $points = [];
    $in = $request->getJsonBody();

    $hostname = phore_pluck("host", $in, "unknown");
    $cluster = phore_pluck("cluster", $in, "unknown");
    $data = phore_pluck("system", $in, []);

    $points[] = new Point("node_stat", null, ["host" => $hostname, "cluster"=>$cluster], $data, time() * 1000);

    $database->writePoints($points, Database::PRECISION_MILLISECONDS);
    return ["success" => true];
});



require __DIR__ . "/../app/analytics.php";


$app->router->onGet("/api/dash.config/:name", function ($dashTokenValid, string $name) {
    $data = phore_file( CONFIG_PATH . "/$name.dash.yaml")->get_yaml();

    foreach ($data["dashboards"] as $key => &$dashboard) {
        foreach ($dashboard as &$item) {
            if ( ! is_array($item["elements"]))
                continue;
            foreach ($item["elements"] as &$element) {
                if (isset ($element["template"]))
                    $element["template"] = phore_file(CONFIG_PATH . "/" . $element["template"])->get_yaml();
            }

        }
    }
    return $data;
});

/**
 ** Define Routes
 **/

$app->router->onGet("/", function () {
    header("Location: /admin");
    return [
        "success" => true,
        "msg" => "rudl-metrics ready " . VERSION_INFO,

    ];
});


$app->router->onGet("/dash/:name?", function($dashTokenValid, string $name="default") {
    $content = phore_file(__DIR__ . "/board/dashboard.inc.html")->get_contents();
    $content = str_replace("%%CONF_CONFIG_URL%%", "/api/dash.config/$name", $content);
    echo $content;
    return true; // Continue with next controllers.
});


$app->router->on("/v1/hooks/repo", ["POST", "GET"], function () {
    if (CONF_REPO_URL == "")
        throw new \InvalidArgumentException("CONF_REPO_URL is not configured.");

    $factory = new VcsFactory();
    $factory->setCommitUser("rudl-metrics", "rudl-metrics@infracamp.org");
    $factory->setAuthSshPrivateKey(phore_file(CONF_SSH_PRIV_KEY_FILE)->get_contents());
    $repo = $factory->repository(REPO_PATH, CONF_REPO_URL);

    ignore_user_abort(true);
    $repo->pull();
    return ["success" => true, "repo" => CONF_REPO_URL, "path" => REPO_PATH];
});



/**
 ** Run the application
 **/
$app->serve();
