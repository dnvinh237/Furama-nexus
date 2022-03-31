import { checkEmployeeExist, handleEmployeeInfo } from "./utils";
import { extendType, nonNull } from "nexus";
import {
  createEmployeeInputType,
  updateEmployeeInputType,
} from "./employeeInputType";
import { deleteInputType } from "../common/commonInput";

export const createEmployee = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createEmployee", {
      type: "Employee",
      args: { data: nonNull(createEmployeeInputType) },
      async resolve(_parent, args, context) {
        let employeeInfo = await handleEmployeeInfo(args.data);
        let employee = await context.db.employee.create({
          data: employeeInfo,
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

export const updateEmployee = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateEmployee", {
      type: "Employee",
      args: { data: nonNull(updateEmployeeInputType) },
      async resolve(_parent, args, context) {
        await checkEmployeeExist(args.data.id);
        let employeeInfo = await handleEmployeeInfo(args.data);
        let id = employeeInfo.id;
        delete employeeInfo.id;
        let employee = await context.db.employee.update({
          where: { id: Number(id) },
          data: employeeInfo,
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

export const deleteEmployee = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteEmployee", {
      type: "MessagePayload",
      args: { data: nonNull(deleteInputType) },
      async resolve(_parent, args, context) {
        let id = args.data.id;

        await checkEmployeeExist(id);

        await context.db.employee.delete({
          where: { id: Number(id) },
        });
        return { message: "Delete employee complete" };
      },
    });
  },
});
