import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    test: String
  }
`;

export default typeDefs;
