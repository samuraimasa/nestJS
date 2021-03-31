FROM node:15.11.0-slim

WORKDIR /server
COPY package.json yarn.lock /server/

ENV NODE_VERSION=15.11.0
ENV YARN_VERSION=1.22.5

ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV TZ JST-9
ENV TERM xterm

ENV LIB="git curl python make g++"

RUN apt-get update \
  && apt-get upgrade -y \
  && apt install -y wget \
  && apt-get install -y $LIB --no-install-recommends \
  && apt-get remove --purge yarn \
  && rm -rf /usr/local/bin/yarn \
  && rm -rf /usr/local/bin/yarnpkg \
  && curl -L --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" > /tmp/yarn.tar.gz \
  && tar -xzf /tmp/yarn.tar.gz -C /opt \
  && ln -s /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
  && ln -s /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
  && rm /tmp/yarn.tar.gz \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && apt-get autoclean -y \
  && yarn install \
  && yarn cache clean --all
