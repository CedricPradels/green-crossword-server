import User from "../models/User";
import authentication from "../helpers/authentication";

import { IResolvers } from "apollo-server";

const resolvers: IResolvers = {
  Query: {
    test: () => "Hello world test",
  },
  Mutation: {
    register: async (_parent, args, _context, _info) => {
      try {
        const { email, password } = args;
        const authenticationData = authentication.createAuthenticationData(
          password
        );
        const newUser = await User.create({ ...authenticationData, email });

        return newUser;
      } catch (error) {
        return null;
      }
    },
  },
};

export default resolvers;
