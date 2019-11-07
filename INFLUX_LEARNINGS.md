# Query the influx db

## Tags

To aggregate by something, it must be specified as tag.

## 


```
SELECT count(*) as num FROM syslog WHERE time > now() - 1d AND status='200' GROUP BY time(1h)

```


## Select TOP Services 

SELECT COUNT(status) as count, http_host FROM syslog GROUP BY http_host WHERE time > now() - 1h
