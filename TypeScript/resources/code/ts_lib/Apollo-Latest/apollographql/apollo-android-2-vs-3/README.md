A repo to compare the Apollo Android 2 and Apollo Android 3 models.
It uses the test fixtures from Apollo Android 2 and compares the jars with [japicmp](https://siom79.github.io/japicmp/)

To generate the report, run

```
./gradlew assemble && java -jar japicmp-0.15.4-jar-with-dependencies.jar -o apollo-2/build/libs/apollo-2.jar -n apollo-3/build/libs/apollo-3.jar --ignore-missing-classes --html-file japicmp.html
```

A sample report is available [here](https://storage.googleapis.com/uploadbin.appspot.com/japicmp.html)