import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;
interface Token {
  userId: string;
}
export const generateHashPassword = async (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

export const generateToken = (userId: String) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 } // 1 day
  );
  return token;
};

export const getUserId = (context: any) => {
  const authTokenWithBarer = context.request.headers.authorization;
  if (authTokenWithBarer) {
    const user = jwt.verify(
      authTokenWithBarer,
      process.env.JWT_SECRET
    ) as Token;
    return user && user.userId;
  }
};
