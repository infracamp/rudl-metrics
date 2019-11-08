# Query the influx db

## Tags

To aggregate by something, it must be specified as tag.

## 


```
SELECT count(*) as num FROM syslog WHERE time > now() - 1d AND status='200' GROUP BY time(1h)

```


## Select TOP Services 


```sql
SELECT count(bytes_sent) as count FROM syslog WHERE time > now() - 15m group by http_host, status
```

```
SELECT top(cnt,http_host,status,5) FROM (SELECT count(bytes_sent) as cnt FROM syslog WHERE time > now() - 15m group by http_host, status)
```
Errors:
```text
SELECT top(cnt,http_host,request_uri,5) FROM (SELECT count(bytes_sent) as cnt FROM syslog WHERE time > now() - 15m AND status='500' group by http_host, request_uri)
```
