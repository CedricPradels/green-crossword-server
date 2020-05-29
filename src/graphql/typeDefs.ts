import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID
    email: String
    token: String
  }

  type Query {
    login(email: String!, password: String!): User
  }

  type Mutation {
    register(email: String!, password: String!): User
  }
`;

export default typeDefs;
