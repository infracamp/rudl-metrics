# Metrics


## Installation

### Examples

- [example stackfile](doc/stackfile.yml)
- [Example nginx.conf for cloudfront logging](doc/nginx-logging.conf)


## Usage

## Config options

The configuration of the authentication can be done directly in the url params:

**SSH example**

```
git@git.host.de/path/to/git?ssh_priv_key_file=/mnt/some/key
```

**HTTPS example**

```
https://path/to/git?auth_user=username&auth_pass=somepass
```

| Query Parameter | Description |
|-----------------|-------------|
| `ssh_priv_key`        | Take the value as private key |
| `ssh_priv_key_file`   | Load the private key from file |
| `auth_user`           | (https): The user to log in with |
| `auth_pass`           | (https): The password |
| `auth_pass_file`      | Load password from file |

**MongoDB example store data**

An @ in front of a field will index that field in the mongo database 
```
curl -X POST --data '{"@FIELD1":"abc0","@FIELD2":"tad","FIELD3":123456791000}' http://localhost/v1/push/doc/COLLECTION
```


**MongoDB example getting data**
```javascript
    <script>
        ((self) => {
            let req = ka_http_req("/admin/api/doc/query/$COLLECTION");



            let $scope = self.scopeInit({

                stats: {
                    distinct_assets: [],
                    distinct_assets_5d: []
                },

                $fn: {
                    "statQuery": (q, name) => {
                        req.withBody(q).json = (r) => {
                            $scope.stats[name] = r;
                        }
                    },

                    "refresh": () => {
                        $scope.$fn.statQuery({
                            cmd: "distinct",
                            fieldName: "@tmid",
                            filter: {

                            },
                            options: {}
                        }, "distinct_assets");

                        $scope.$fn.statQuery({
                            cmd: "distinct",
                            fieldName: "@FIELD",
                            filter: {
                                input: "@FILTERFIELD",
                                cond: {
                                    "$gte": ["$$num", (Date.now() / 1000 - 86400 * 5)]
                                }
                            },
                            options: {}
                        }, "distinct_assets_5d");
                    }
                }

            });

            $scope.$fn.refresh();
        })(KaTpl.self);
    </script>
```
