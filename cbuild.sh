#!/bin/bash

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

docker build -t cnextgen_dbuild -f BDockerfile . || exit 1
docker run --rm -v $(pwd):/app cnextgen_dbuild bash /app/cdbuild.sh || exit 1
