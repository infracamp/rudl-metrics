# Metrics


## Installation

### Run the docker image

### Run docker stack

See [example stackfile](doc/stackfile.yml)



## Usage

https://coreui.io/angular/demo/#/dashboard
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
