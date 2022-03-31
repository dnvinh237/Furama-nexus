import { extendType } from "nexus";
import { getUserId } from "../../mutation/auth.mutation/utils";

export const currentUser = extendType({
  type: "Query",
  definition(t) {
    t.field("currentUser", {
      type: "User",
      async resolve(_parent, args, context) {
        const userId = getUserId(context);
        const user = await context.db.user.findUnique({
          where: { id: userId },
        });
        return user;
      },
    });
  },
});
