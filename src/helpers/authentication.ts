import randomstring from "randomstring";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

// TYPESCRIPT
type password = string;
type salt = string;
type hash = string;
type token = string;
interface AuthenticationData {
  token: token;
  hash: hash;
  salt: salt;
}

const randomString = (length: number): string => randomstring.generate(length);

const cryptString = (str: string): string => sha256(str).toString(Base64);

const createSalt = (): salt => randomString(64);

const createHash = (password: password, salt: salt): hash => {
  const unencryptedHash: hash = password + salt;
  const encryptedHash: hash = cryptString(unencryptedHash);
  return encryptedHash;
};

const createToken = (): token => randomString(64);

const authentication = {
  createAuthenticationData: (password: password): AuthenticationData => {
    const salt = createSalt();
    const token = createToken();
    const hash = createHash(password, salt);
    return { salt, token, hash };
  },
  checkPassword: (
    passwordToCheck: password,
    userSalt: salt,
    userHash: hash
  ): boolean => {
    const hashToCheck = createHash(passwordToCheck, userSalt);
    return hashToCheck === userHash;
  },
};

export default authentication;
