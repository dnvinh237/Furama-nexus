import { extendType, nonNull } from "nexus";
import { deleteInputType } from "../common/commonInput";
import {
  createCustomerInputType,
  updateCustomerInputType,
} from "./customerInputType";
import { checkCustomerExist, handleCustomerInfo } from "./utils";

export const createCustomer = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createCustomer", {
      type: "Customer",
      args: { data: nonNull(createCustomerInputType) },
      async resolve(_parent, args, context) {
        let customerInfo = await handleCustomerInfo(args.data);
        let customer = await context.db.customer.create({
          data: customerInfo,
          include: {
            contracts: true,
          },
        });
        return customer;
      },
    });
  },
});

export const updateCustomer = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateCustomer", {
      type: "Customer",
      args: { data: nonNull(updateCustomerInputType) },
      async resolve(_parent, args, context) {
        await checkCustomerExist(args.data.id);
        let customerInfo = await handleCustomerInfo(args.data);
        let id = customerInfo.id;
        delete customerInfo.id;

        let customer = await context.db.customer.update({
          where: { id: Number(id) },
          data: customerInfo,
          include: {
            contracts: true,
          },
        });
        return customer;
      },
    });
  },
});

export const deleteCustomer = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteCustomer", {
      type: "MessagePayload",
      args: { data: nonNull(deleteInputType) },
      async resolve(_parent, args, context) {
        let id = args.data.id;

        await checkCustomerExist(id);

        await context.db.customer.delete({
          where: { id: Number(id) },
        });
        return { message: "Delete customer complete" };
      },
    });
  },
});
