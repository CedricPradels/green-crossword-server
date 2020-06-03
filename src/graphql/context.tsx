import User from "../models/User";

const context = async ({ req }: any) => {
  try {
    if (!req.headers.authorization) throw "Token missing.";
    const token = String(req.headers.authorization).replace("Bearer ", "");
    const userQuery = await User.findOne({ token }).lean(true);
    if (!userQuery) throw "Token unknown";
    const { hash, salt, _id: id, ...safeUser } = userQuery;
    return { ...safeUser, id };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default context;
