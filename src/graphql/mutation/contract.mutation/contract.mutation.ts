import { checkContractExist, handleContractInfo } from "./utils";
import {
  createContractInputType,
  updateContractInputType,
} from "./contractInputType";
import { extendType, nonNull } from "nexus";
import { deleteInputType } from "../common/commonInput";

export const createContract = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createContract", {
      type: "Contract",
      args: { data: nonNull(createContractInputType) },
      async resolve(_parent, args, context) {
        let contractInfo = await handleContractInfo(args.data);
        let contract = await context.db.contract.create({
          data: contractInfo,
          include: {
            employee: true,
            customer: true,
          },
        });
        return contract;
      },
    });
  },
});

export const updateContract = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateContract", {
      type: "Contract",
      args: { data: nonNull(updateContractInputType) },
      async resolve(_parent, args, context) {
        await checkContractExist(args.data.id);
        let contractInfo = await handleContractInfo(args.data);
        let id = contractInfo.id;
        delete contractInfo.id;
        let contract = await context.db.contract.update({
          where: { id: Number(id) },
          data: contractInfo,
          include: {
            employee: true,
            customer: true,
          },
        });
        return contract;
      },
    });
  },
});

export const deleteContract = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteContract", {
      type: "MessagePayload",
      args: { data: nonNull(deleteInputType) },
      async resolve(_parent, args, context) {
        let id = args.data.id;
        await checkContractExist(id);
        await context.db.contract.delete({
          where: { id: Number(id) },
        });
        return { message: "Delete contract complete" };
      },
    });
  },
});
