import { objectType } from "nexus";

export const EducationDegree = objectType({
  name: "EducationDegree",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("createdAt"),
      t.list.field("employees", {
        type: "Employee",
        async resolve(_parent, args, context) {
          let employees = await context.db.educationDegree
            .findUnique({
              where: { id: _parent.id },
            })
            .employees();
          return employees;
        },
      });
  },
});
