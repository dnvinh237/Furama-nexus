import { extendType, intArg, nonNull, stringArg } from "nexus";

export const findAllCustomers = extendType({
  type: "Query",
  definition(t) {
    t.list.field("findAllCustomers", {
      type: "Customer",
      args: {
        searchString: stringArg(),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(_parent, args, context) {
        let where = args.searchString
          ? { name: { contains: args.searchString } }
          : {};
        const customers = await context.db.customer.findMany({
          where,
          skip: args.skip,
          take: args.take,
          include: {
            contracts: true,
          },
        });
        return customers;
      },
    });
  },
});

export const findCustomerById = extendType({
  type: "Query",
  definition(t) {
    t.field("findCustomerById", {
      type: "Customer",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, args, context) {
        let customer = await context.db.customer.findUnique({
          where: { id: Number(args.id) },
          include: {
            contracts: true,
          },
        });
        return customer;
      },
    });
  },
});
