import { extendType, nonNull } from "nexus";
import { generateHashPassword, generateToken } from "./utils";
import { loginInput, signupInput } from "./authInputType";
import bcrypt from "bcrypt";

export const signup = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("signup", {
      type: "MessagePayload",
      args: { data: nonNull(signupInput) },
      async resolve(_parent, args, context) {
        let userInfo = args.data;
        const isUserExist = await context.db.user.findUnique({
          where: { email: userInfo.email },
        });
        if (isUserExist) {
          throw new Error("Email is already associated with another user");
        }
        const hashPassword = await generateHashPassword(userInfo.password);
        userInfo.password = hashPassword;
        const user = await context.db.user.create({ data: userInfo });
        return { message: "Signup success. Please sign in." };
      },
    });
  },
});

export const login = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "AuthPayload",
      args: { data: nonNull(loginInput) },
      async resolve(_parent, args, context) {
        let userInfo = args.data;
        const isUserExist = await context.db.user.findFirst({
          where: { email: userInfo.email },
        });
        if (!isUserExist) throw new Error("User is not exist");
        const isPasswordMatch = await bcrypt.compare(
          userInfo.password,
          isUserExist.password
        );
        if (!isPasswordMatch) throw new Error("Password is wrong");
        const token = generateToken(isUserExist.id);
        return { user: isUserExist, token };
      },
    });
  },
});
