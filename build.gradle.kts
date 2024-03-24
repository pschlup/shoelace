plugins {
  id("kotlin")
  id("com.github.node-gradle.node") version "7.0.2"
}

node {
  download = true
}

tasks {
  named("npm_run_build") {
    outputs.dir(layout.projectDirectory.dir("cdn"))
  }
}
