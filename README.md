# Metrics


## Usage

```
version: 3
services:
  rudl-metrics:
    image: infracamp/rudl-metrics:testing
  environment:
    - "CONF_REPO_URL=git@gitlab.com:/path/to/repo"
  secrets:
    - rudl_ssh_private_key
    
secrets:
  rudl_ssh_private_key:
     external: true

```
