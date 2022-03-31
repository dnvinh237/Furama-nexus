import { objectType } from "nexus";

export const Contract = objectType({
  name: "Contract",
  definition(t) {
    t.int("id");
    t.string("createdAt");
    t.string("startDate");
    t.string("endDate");
    t.string("deposit");
    t.string("totalMoney");
    t.field("employee", {
      type: "Employee",
      async resolve(_parent, args, context) {
        let employee = await context.db.contract
          .findUnique({
            where: { id: _parent.id },
          })
          .employee();
        return employee;
      },
    }),
      t.field("customer", {
        type: "Customer",
        async resolve(_parent, args, context) {
          let customer = await context.db.contract
            .findUnique({
              where: { id: _parent.id },
            })
            .customer();
          return customer;
        },
      });
  },
});
