import { inputObjectType } from "nexus";

export const createEmployeeInputType = inputObjectType({
  name: "createEmployeeInputType",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.int("position");
    t.nonNull.int("division");
    t.nonNull.int("educationDegree");
    t.list.int("contracts");
  },
});

export const updateEmployeeInputType = inputObjectType({
  name: "updateEmployeeInputType",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.string("email");
    t.int("position");
    t.int("division");
    t.int("educationDegree");
    t.list.int("contracts");
  },
});
