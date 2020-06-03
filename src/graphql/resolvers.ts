import User from "../models/User";

import authentication from "../helpers/authentication";

import { IResolvers, UserInputError } from "apollo-server";

import { isEmail, isPassword } from "../helpers/predicates";

const resolvers: IResolvers = {
  Query: {
    test: () => console.log("hello, world"),
  },
  Mutation: {
    login: async (_parent, args, _context, _info) => {
      try {
        const { email, password: passwordToCheck } = args;
        const user = await User.findOne({ email }).lean(true);

        // ERRORS
        // EMAIL PREDICATE
        if (!isEmail(email)) throw new UserInputError("Wrong email format");
        // EMAIL DOES NOT EXIST
        if (!!!user) throw new UserInputError("User not found");

        const { hash: userHash, salt: userSalt, _id: id, ...safeUser } = user;

        if (!authentication.checkPassword(passwordToCheck, userSalt, userHash))
          throw new UserInputError("Wrong password");

        return { ...safeUser, id };
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    register: async (_parent, args, _context, _info) => {
      try {
        const { email, password } = args;

        // ERRORS
        // EMAIL PREDICATE
        if (!isEmail(email)) throw new UserInputError("Wrong email format");
        // PASSWORD PREDICATE
        if (!isPassword(password))
          throw new UserInputError("Wrong password format");
        // EMAIL ALREADY EXIST
        const queryEmail = await User.findOne({ email });
        if (queryEmail) throw new UserInputError("Email already exist");

        const authenticationData = authentication.createAuthenticationData(
          password
        );
        const newUser = await User.create({ ...authenticationData, email });

        return newUser;
      } catch (error) {
        return error;
      }
    },
  },
};

export default resolvers;
