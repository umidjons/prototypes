FROM ubuntu:16.04

ENV DOWNLOAD_URL=https://github.com/z3APA3A/3proxy/archive/0.8.11.tar.gz \
    PROXY_CONFIG=/etc/3proxy/3proxy.cfg \
    PROXY_AUTH_FILE=/etc/3proxy/.proxyauth \
    PROXY_LOG_PATH=/var/log/3proxy \
    PROXY_GROUP=proxy3 \
    PROXY_USER=proxy3 \
    IP_EXTERNAL=172.17.0.2 \
    IP_INTERNAL=172.17.0.2 \
    PORT_HTTPS=3128 \
    PORT_SOCKS=1080 \
    TEST_USER=user1 \
    TEST_PASSWORD=1234 \
    NSERVER1=8.8.8.8 \
    NSERVER2=8.8.4.4 \
    NSCACHE=65536

RUN apt-get update \
    && apt-get install -y wget build-essential \
    && wget ${DOWNLOAD_URL} -O 3proxy.tar.gz \
    && mkdir 3proxy \
    && tar -zxvf 3proxy.tar.gz -C 3proxy --strip-components=1 \
    && rm -f 3proxy.tar.gz \
    && cd 3proxy \
    && make -f Makefile.Linux \
    && cd src/ \
    && cp 3proxy /usr/bin/ \
    && cd ../.. \
    && rm -rf 3proxy

RUN adduser --system --no-create-home --disabled-login --group ${PROXY_GROUP} \
    && PRX_UID=$(id -u ${PROXY_USER}) \
    && PRX_GID=$(id -g ${PROXY_GROUP}) \
    && mkdir /etc/3proxy \
    && echo "setgid $PRX_GID" >> ${PROXY_CONFIG} \
    && echo "setuid $PRX_UID" >> ${PROXY_CONFIG} \
    && echo "nserver ${NSERVER1}" >> ${PROXY_CONFIG} \
    && echo "nserver ${NSERVER2}" >> ${PROXY_CONFIG} \
    && echo "nscache ${NSCACHE}" >> ${PROXY_CONFIG} \
    && echo "timeouts 1 5 30 60 180 1800 15 60" >> ${PROXY_CONFIG} \
    && echo "#external ${IP_EXTERNAL}" >> ${PROXY_CONFIG} \
    && echo "#internal ${IP_INTERNAL}" >> ${PROXY_CONFIG} \
    && echo "users \$${PROXY_AUTH_FILE}" >> ${PROXY_CONFIG} \
    && echo "log" >> ${PROXY_CONFIG} \
    && echo 'logformat "- +_L%t.%. %N.%p %E %U %C:%c %R:%r %O %I %h %T"' >> ${PROXY_CONFIG} \
    && echo "auth cache strong" >> ${PROXY_CONFIG} \
    && echo "proxy -n -p${PORT_HTTPS} -a" >> ${PROXY_CONFIG} \
    && echo "socks -p${PORT_SOCKS}" >> ${PROXY_CONFIG} \
    && echo "${TEST_USER}:CL:${TEST_PASSWORD}" >> ${PROXY_AUTH_FILE} \
    && chown ${PROXY_GROUP}:${PROXY_USER} -R /etc/3proxy \
    && chown ${PROXY_GROUP}:${PROXY_USER} /usr/bin/3proxy \
    && chmod 444 ${PROXY_CONFIG} \
    && chmod 400 ${PROXY_AUTH_FILE} \
    && mkdir ${PROXY_LOG_PATH} \
    && chown ${PROXY_GROUP}:${PROXY_USER} ${PROXY_LOG_PATH}

EXPOSE ${PORT_HTTPS} ${PORT_SOCKS}

VOLUME ${PROXY_LOG_PATH}

ENTRYPOINT /usr/bin/3proxy /etc/3proxy/3proxy.cfg
