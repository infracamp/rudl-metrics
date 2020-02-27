FROM infracamp/kickstart-flavor-gaia:testing

ENV DEV_CONTAINER_NAME="rudl-metrics"

ENV DEBUG_MODE="0"
ENV CONF_GITLAB_TOKEN=""
ENV CONF_REPO_URL=""
ENV CONF_SSH_PRIV_KEY_FILE="/run/secrets/rudl_ssh_private_key"

ADD / /opt
ADD /metrics /mod/metrics

RUN ["bash", "-c",  "chown -R user /opt"]
RUN ["bash", "-c",  "chown -R user /mod/metrics"]
RUN ["/kickstart/flavorkit/scripts/start.sh", "build"]

ENTRYPOINT ["/kickstart/flavorkit/scripts/start.sh", "standalone"]
