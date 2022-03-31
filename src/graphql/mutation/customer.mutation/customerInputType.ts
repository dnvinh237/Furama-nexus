import { inputObjectType } from "nexus";

export const createCustomerInputType = inputObjectType({
  name: "createCustomerInputType",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("idCard");
    t.string("dayOfBirth");
    t.string("phone");
    t.string("email");
    t.string("address");
    t.list.int("contracts");
  },
});

export const updateCustomerInputType = inputObjectType({
  name: "updateCustomerInputType",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.string("idCard");
    t.string("dayOfBirth");
    t.string("phone");
    t.string("email");
    t.string("address");
    t.list.int("contracts");
  },
});
