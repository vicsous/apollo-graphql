const typeDefs = `
type Query {
  login(content: loginInput!): ID!
}

type Mutation {
  signup(content: userInput!): String!
}

input userInput {
  username: String!
  email: String!
  password: String!
  password2: String!
}

input loginInput {
  username: String!
  password: String!
}
`;

module.exports = typeDefs;
