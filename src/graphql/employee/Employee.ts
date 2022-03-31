import { objectType } from "nexus";

export const Employee = objectType({
  name: "Employee",
  definition(t) {
    t.int("id");
    t.string("createdAt");
    t.string("name");
    t.string("email");
    t.field("position", {
      type: "Position",
      async resolve(_parent, args, context) {
        let position = await context.db.employee
          .findUnique({
            where: { id: _parent.id },
          })
          .position();
        return position;
      },
    });
    t.field("division", {
      type: "Division",
      async resolve(_parent, args, context) {
        let division = await context.db.employee
          .findUnique({
            where: { id: _parent.id },
          })
          .division();
        return division;
      },
    });
    t.field("educationDegree", {
      type: "EducationDegree",
      async resolve(_parent, args, context) {
        let educationDegree = await context.db.employee
          .findUnique({
            where: { id: _parent.id },
          })
          .educationDegree();
        return educationDegree;
      },
    });
    t.list.field("contracts", {
      type: "Contract",
      async resolve(_parent, args, context) {
        let contracts = await context.db.employee
          .findUnique({
            where: { id: _parent.id },
          })
          .contracts();
        return contracts;
      },
    });
  },
});
