cp ../package.json .
./gradlew updateNodeVersion
./gradlew version
cp package.json ..
