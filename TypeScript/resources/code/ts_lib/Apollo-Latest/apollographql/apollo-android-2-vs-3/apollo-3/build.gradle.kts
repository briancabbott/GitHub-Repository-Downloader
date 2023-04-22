import com.apollographql.apollo3.compiler.MODELS_COMPAT

plugins {
  id("org.jetbrains.kotlin.jvm").version("1.5.31")
  id("com.apollographql.apollo3").version("3.0.0-beta01")
}

dependencies {
  implementation("com.apollographql.apollo3:apollo-runtime:3.0.0-beta01")
}

apollo {
  file("../graphql/com/example")
    .listFiles()!!
    .filter { it.isDirectory }
    .forEach { serviceDir ->
      val schema = listOf("schema.sdl", "schema.json", "../../../schema.sdl")
        .map { serviceDir.resolve(it) }
        .first { it.exists() }

      service(serviceDir.name) {
        packageName.set(serviceDir.name)
        codegenModels.set(MODELS_COMPAT)
        sealedClassesForEnumsMatching.set(emptyList())
        generateOptionalOperationVariables.set(true)

        srcDir("../graphql/com/example/${serviceDir.name}")
        schemaFile.set(schema)
      }
    }
}
