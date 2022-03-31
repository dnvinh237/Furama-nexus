import { inputObjectType } from "nexus";

export const deleteInputType = inputObjectType({
  name: "deleteContractInputType",
  definition(t) {
    t.nonNull.int("id");
  },
});
