npm  --version  || exit 1
node --version || exit 1
yarn --version || exit 1

deployVersion="$*"

cd /app

npm config set registry https://nexus.cloud.aws.tenablesecurity.com/content/groups/tenable-cloud-node || exit 1
yarn config set registry https://nexus.cloud.aws.tenablesecurity.com/content/groups/tenable-cloud-node || exit 1

#export PAYH=$PATH:$(pwd)/node_modules/.bin

rm -rf node_modules

yarn run init || exit 1
yarn run build --deployVersion=${deployVersion} || exit 1
yarn run test --coverage=true || exit 1

# Create a tar package to deploy to S3
tar cvzf tio_ui_${1}.tar.gz -C dist/public/ .

exit 0
