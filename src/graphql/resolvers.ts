import User from "../models/User";
import authentication from "../helpers/authentication";

import { IResolvers } from "apollo-server";

const resolvers: IResolvers = {
  Query: {
    login: async (_parent, args, _context, _info) => {
      try {
        const { email, password: passwordToCheck } = args;
        const user = await User.findOne({ email }).lean(true);

        if (!user) throw "User not found";

        const { hash: userHash, salt: userSalt, _id: id, ...safeUser } = user;

        if (!authentication.checkPassword(passwordToCheck, userSalt, userHash))
          throw "Wrong password";

        return { ...safeUser, id };
      } catch (error) {
        return null;
      }
    },
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
