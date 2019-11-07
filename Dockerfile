FROM infracamp/kickstart-flavor-gaia:testing

ENV DEV_CONTAINER_NAME="rudl-metrics"

ENV DEBUG_MODE="0"

ADD / /opt
ADD /metrics /mnt/metrics

RUN ["bash", "-c",  "chown -R user /opt"]
RUN ["/kickstart/flavorkit/scripts/start.sh", "build"]

ENTRYPOINT ["/kickstart/flavorkit/scripts/start.sh", "standalone"]
