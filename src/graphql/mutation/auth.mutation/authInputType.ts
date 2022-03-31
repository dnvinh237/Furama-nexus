import { inputObjectType } from "nexus";

export const signupInput = inputObjectType({
  name: "signupInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});

export const loginInput = inputObjectType({
  name: "loginInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});
