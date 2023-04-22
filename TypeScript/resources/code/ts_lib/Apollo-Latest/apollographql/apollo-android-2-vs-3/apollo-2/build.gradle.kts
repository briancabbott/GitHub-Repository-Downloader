plugins {
  id("org.jetbrains.kotlin.jvm").version("1.5.31")
  id("com.apollographql.apollo").version("2.5.10")
}

dependencies {
  implementation("com.apollographql.apollo:apollo-runtime:2.5.10")
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
        generateKotlinModels.set(true)
        sourceFolder.set("../../../../graphql/com/example/${serviceDir.name}")
        schemaPath.set(schema.absolutePath)
        rootPackageName.set(serviceDir.name)
      }
    }
}
