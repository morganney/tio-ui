#!/bin/bash

if [ -z "${bamboo_buildNumber}" ]
then
  bamboo_buildNumber=0
fi

# extract the version number for the tar package
version=`cat package.json | grep "\"version\":" | sed 's/^.*://' | sed 's/[ ",]//g'`

# generate build # for the actual release
deployVersion=$(IFS='.' read -r -a boom <<< "$version"; for a in "${boom[@]}"; do printf "%02d" $a; done;)

# append build number
if [ "${bamboo_planRepository_branch}" = "master" ]
then
    deployVersion=$(printf "TIOUI$deployVersion%04d" $bamboo_buildNumber)
else
    deployVersion=$(printf "TIOUI$deployVersion%s%04d" $bamboo_shortPlanKey $bamboo_buildNumber)
fi

# make a note of it so that it can be injected later
if [ -f cdbuild/build/resources/main/version.properties ]; then
    echo "deployVersion=$deployVersion" >> ./cdbuild/build/resources/main/version.properties
else
    echo "Warning: no version.properties exists, did gradle version task run?"
fi

echo "DeployVersion: $deployVersion"

rm -rf BDockerfile

image='node:8.6-stretch'

uid=$(id -u)
gid=$(id -g)

os=$(uname)

if [ "$os" == "Darwin" ]
then
    uid=1002
    gid=1002
fi

echo "FROM $image" > BDockerfile
echo "" >> BDockerfile
echo "RUN groupadd appuser -g ${gid}" >> BDockerfile
echo "RUN useradd -r -u ${uid} -g appuser appuser" >> BDockerfile
echo "RUN mkdir /home/appuser" >> BDockerfile
echo "RUN chown appuser:appuser /home/appuser" >> BDockerfile
echo "USER appuser" >> BDockerfile
echo "" >> BDockerfile
echo "VOLUME  /app" >> BDockerfile
echo "" >> BDockerfile
echo "CMD []" >> BDockerfile

docker build -t nextgen_dbuild -f BDockerfile . || exit 1
docker run --rm -v $(pwd):/app nextgen_dbuild bash /app/dbuild.sh $deployVersion || exit 1
