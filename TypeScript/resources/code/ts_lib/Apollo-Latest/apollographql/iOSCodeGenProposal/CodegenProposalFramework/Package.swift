// swift-tools-version:5.3
import PackageDescription

let package = Package(
  name: "CodegenProposalFramework",
  platforms: [
    .iOS(.v12),
    .macOS(.v10_15),
    .tvOS(.v12),
    .watchOS(.v5)
  ],
  products: [
    .library(name: "CodegenProposalFramework", targets: ["CodegenProposalFramework"]),
    .executable(name: "RunCodeGen", targets: ["RunCodeGen"]),
  ],
  dependencies: [
    .package(name: "Apollo",
             path: "/Users/amdev/Documents/repos/apollo-ios"),
    .package(name: "Nimble",
             url: "https://github.com/Quick/Nimble.git",
             .upToNextMajor(from: "9.2.1")),
  ],
  targets: [
    .target(
      name: "CodegenProposalFramework",
      dependencies: [
        .product(name: "Apollo", package: "Apollo"),
      ]
    ),
    .target(
      name: "RunCodeGen",
      dependencies: [
        .product(name: "Apollo", package: "Apollo"),
        .product(name: "ApolloCodegenLib", package: "Apollo"),
        "AnimalsAPI"
      ]
    ),
    .target(
      name: "AnimalsAPI",
      dependencies: [
        "AnimalSchema",
        .product(name: "ApolloAPI", package: "Apollo")
      ],
      resources: [.process("GraphQL")]
    ),
    .target(
      name: "AnimalSchema",
      dependencies: ["CodegenProposalFramework"]
    ),
    .testTarget(
      name: "CodegenProposalFrameworkTests",
      dependencies: ["CodegenProposalFramework", "AnimalsAPI", "Nimble"]),
  ]
)
