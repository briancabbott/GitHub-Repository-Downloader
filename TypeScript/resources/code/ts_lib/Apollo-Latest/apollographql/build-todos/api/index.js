import {ApolloServer, gql} from 'apollo-server';
import {Todo, sequelize} from './db.js';

const typeDefs = gql`
  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(text: String!): Todo!
    deleteTodo(id: ID!): Todo
    updateTodo(id: ID!, isComplete: Boolean!): Todo
  }

  type Todo {
    id: ID!
    text: String!
    isComplete: Boolean!
  }
`;

const resolvers = {
  Query: {
    todos: () =>
      Todo.findAll({
        order: [['createdAt', 'DESC']]
      })
  },
  Mutation: {
    addTodo: (_, {text}) => Todo.create({text}),
    async deleteTodo(_, {id}) {
      const todo = await Todo.findByPk(id);
      await todo.destroy();
      return todo;
    },
    async updateTodo(_, {id, isComplete}) {
      const todo = await Todo.findByPk(id);
      return todo.update({isComplete});
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

(async () => {
  await sequelize.sync();
  const {url} = await server.listen({port: process.env.PORT || 4000});
  console.log(`🚀  Server is ready at ${url}`);
})();
