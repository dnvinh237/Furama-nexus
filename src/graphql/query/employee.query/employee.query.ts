import { extendType, intArg, nonNull, stringArg } from "nexus";

export const findAllEmployees = extendType({
  type: "Query",
  definition(t) {
    t.list.field("findAllEmployees", {
      type: "Employee",
      args: {
        searchString: stringArg(),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(_parent, args, context) {
        let where = args.searchString
          ? {
              OR: [
                { name: { contains: args.searchString } },
                { email: { contains: args.searchString } },
              ],
            }
          : {};
        const employees = await context.db.employee.findMany({
          where,
          skip: args.skip,
          take: args.take,
          include: {
            position: true,
            division: true,
            educationDegree: true,
          },
        });
        return employees;
      },
    });
  },
});

export const findEmployeeById = extendType({
  type: "Query",
  definition(t) {
    t.field("findEmployeeById", {
      type: "Employee",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, args, context) {
        let employee = await context.db.employee.findUnique({
          where: { id: Number(args.id) },
          include: {
            position: true,
            division: true,
            educationDegree: true,
          },
        });
        return employee;
      },
    });
  },
});
