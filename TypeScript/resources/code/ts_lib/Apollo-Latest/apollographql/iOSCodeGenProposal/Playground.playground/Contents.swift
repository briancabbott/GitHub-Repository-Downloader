@testable import CodegenProposalFramework

let cat = Animal( // TODO: have to retain this for nested weak type condition
  __typename: "Cat",
  species: "Cat",
  height: .init(fields: .init(__typename: "Height", feet: 2, inches: 7, meters: 10)),
  predators: []
)
.makeAsWarmBlooded(bodyTemperature: 98, height: .init(fields: .init(meters: 10, yards: 3)))
.parent
.makeAsPet(humanName: "Tiger Lily", favoriteToy: "Shoelaces")
.makeAsWarmBlooded(bodyTemperature: 98, height: .init(fields: .init(meters: 10, yards: 3)))

let species = cat.species // This code completes all properties and accesses them properly!
