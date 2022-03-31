import { objectType } from "nexus";

export const messagePayload = objectType({
  name: "MessagePayload",
  definition(t) {
    t.nonNull.string("message");
  },
});
