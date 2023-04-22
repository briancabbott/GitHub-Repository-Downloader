import Foundation
import ApolloAPI

public final class Query: Object {
  override public class var __typename: String { "Query" }

  var allAnimals: [Animal] = []
  var allPets: [Pet] = []
//  var classroomPets: [ClassroomPet]
}

//store.readWriteTransaction() { transaction in
//  let bird: Bird = AnimalSchema.object(withKey: "Bird:1234", in: transaction)
//
//  bird.$species
//  bird.humanName = "Tweety"
//
//  let rootQuery: RootQuery = AnimalSchema.rootQuery(in: transaction)
//  let user = rootQuery.me.friends[0]
//  let post = rootQuery.latestPosts(user: user.id)
//
//
//}
