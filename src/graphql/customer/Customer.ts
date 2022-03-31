import { objectType } from "nexus";

export const Customer = objectType({
  name: "Customer",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("createdAt");
    t.string("dayOfBirth");
    t.string("idCard");
    t.string("phone");
    t.string("email");
    t.string("address");
    t.list.field("contracts", {
      type: "Contract",
      async resolve(_parent, args, context) {
        let contracts = await context.db.customer
          .findUnique({
            where: { id: _parent.id },
          })
          .contracts();
        return contracts;
      },
    });
  },
});
