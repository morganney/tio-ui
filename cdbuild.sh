npm  --version  || exit 1
node --version || exit 1
yarn --version || exit 1

cd /app

npm config set registry https://nexus.cloud.aws.tenablesecurity.com/content/groups/tenable-cloud-node || exit 1
yarn config set registry https://nexus.cloud.aws.tenablesecurity.com/content/groups/tenable-cloud-node || exit 1

rm -rf node_modules

yarn run init
yarn run sauce

exit 0
