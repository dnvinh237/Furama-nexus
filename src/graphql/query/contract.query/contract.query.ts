import { extendType, intArg, nonNull, stringArg } from "nexus";
import { SearchBy } from "../enumType";

export const findAllContracts = extendType({
  type: "Query",
  definition(t) {
    t.list.field("findAllContracts", {
      type: "Contract",
      args: {
        skip: intArg(),
        take: intArg(),
        fromDate: stringArg(),
        toDate: stringArg(),
        searchBy: SearchBy,
      },
      async resolve(_parent, args, context) {
        let { skip, take, fromDate, toDate, searchBy } = args;

        let predicate = {};
        if (fromDate) {
          predicate = { ...predicate, gt: fromDate };
        }
        if (toDate) {
          predicate = { ...predicate, lt: toDate };
        }

        const contracts = await context.db.contract.findMany({
          where: { [searchBy]: predicate },
          skip: skip,
          take: take,
        });
        return contracts;
      },
    });
  },
});

export const findContractById = extendType({
  type: "Query",
  definition(t) {
    t.field("findContractById", {
      type: "Contract",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, args, context) {
        let contract = await context.db.contract.findUnique({
          where: { id: Number(args.id) },
        });
        return contract;
      },
    });
  },
});
