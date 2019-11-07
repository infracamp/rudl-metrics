# Query the influx db


## 


```
SELECT count(*) as num FROM syslog WHERE time > now() - 1d AND status='200' GROUP BY time(1h)

```
