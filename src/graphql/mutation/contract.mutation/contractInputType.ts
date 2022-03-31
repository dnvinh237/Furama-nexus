import { inputObjectType } from "nexus";

export const createContractInputType = inputObjectType({
  name: "createContractInputType",
  definition(t) {
    t.string("startDate");
    t.string("endDate");
    t.string("deposit");
    t.string("totalMoney");
    t.nonNull.int("employee");
    t.nonNull.int("customer");
  },
});

export const updateContractInputType = inputObjectType({
  name: "updateContractInputType",
  definition(t) {
    t.nonNull.int("id");
    t.string("startDate");
    t.string("endDate");
    t.string("deposit");
    t.string("totalMoney");
    t.int("employee");
    t.int("customer");
  },
});
