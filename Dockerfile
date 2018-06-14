FROM node:8.6-stretch
LABEL maintainer="tkirchner@tenable.com"
LABEL dockerfile_version="1.0.0"

ENV APP_FOLDER /usr/src/main

# Setup environmental settings
RUN yarn config set registry https://nexus.cloud.aws.tenablesecurity.com/content/groups/tenable-cloud-node

# Create directories for building the app and its dependencies
RUN mkdir -p ${APP_FOLDER}

# Load the app dependency files into the temporary directory
COPY ./package.json ./yarn.lock ${APP_FOLDER}/
COPY ./deps/alloy/package.json ${APP_FOLDER}/deps/alloy/
COPY ./deps/common/package.json ${APP_FOLDER}/deps/common/
COPY ./apps/settings/package.json ${APP_FOLDER}/apps/settings/
COPY ./apps/container-security/package.json ${APP_FOLDER}/apps/container-security/
COPY ./apps/dashboards/package.json ${APP_FOLDER}/apps/dashboards/
COPY ./apps/login/package.json ${APP_FOLDER}/apps/login/
COPY ./apps/vulnerability-management/package.json ${APP_FOLDER}/apps/vulnerability-management/
COPY ./apps/lumin/package.json ${APP_FOLDER}/apps/lumin/
COPY ./apps/tenableio/package.json ${APP_FOLDER}/apps/tenableio/
COPY ./apps/tenableio/lib/tenable-telemetry ${APP_FOLDER}/apps/tenableio/lib/tenable-telemetry

# Install dependencies
RUN cd ${APP_FOLDER} && yarn run init

# Expose various ports
# Port 3333 - loads the UI proxied through BrowserSync
# Port 3334 - loads the BrowserSync control panel
# Port 3335 - loads the UI by itself (no BrowserSync)
EXPOSE 3333 3334 3335

# Set working directory and volume
WORKDIR ${APP_FOLDER}

# Create a volume for each node module directory
VOLUME ${APP_FOLDER}/node_modules
VOLUME ${APP_FOLDER}/deps/alloy/node_modules
VOLUME ${APP_FOLDER}/deps/common/node_modules
VOLUME ${APP_FOLDER}/apps/container-security/node_modules
VOLUME ${APP_FOLDER}/apps/dashboards/node_modules
VOLUME ${APP_FOLDER}/apps/login/node_modules
VOLUME ${APP_FOLDER}/apps/lumin/node_modules
VOLUME ${APP_FOLDER}/apps/settings/node_modules
VOLUME ${APP_FOLDER}/apps/tenableio/node_modules
VOLUME ${APP_FOLDER}/apps/vulnerability-management/node_modules

# Define opening command
ENTRYPOINT [ "yarn", "run", "dev", "--docker=true" ]
