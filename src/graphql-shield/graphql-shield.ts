import { rule, shield } from "graphql-shield";
import { getUserId } from "../graphql/mutation/auth.mutation/utils";

const rules = {
  isAuthenticatedUser: rule()((parent, args, context: any) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isAdmin: rule()(async (parent, args, context: any) => {
    const userId = getUserId(context);
    const isAdmin = await context.db.user.findFirst({
      where: {
        id: userId,
        isAdmin: true,
      },
    });
    if (!isAdmin) {
      throw new Error("This is only for admin");
    }
    return Boolean(isAdmin);
  }),
};
export const middlewares = shield(
  {
    Query: {
      currentUser: rules.isAuthenticatedUser,
      findAllCustomers: rules.isAuthenticatedUser,
      findAllContracts: rules.isAuthenticatedUser,
      findAllEmployees: rules.isAuthenticatedUser,
      findContractById: rules.isAuthenticatedUser,
      findCustomerById: rules.isAuthenticatedUser,
      findEmployeeById: rules.isAuthenticatedUser,
    },
    Mutation: {
      createContract: rules.isAuthenticatedUser,
      createCustomer: rules.isAuthenticatedUser,
      createEmployee: rules.isAuthenticatedUser,
      updateContract: rules.isAuthenticatedUser,
      updateCustomer: rules.isAuthenticatedUser,
      updateEmployee: rules.isAuthenticatedUser,
      deleteContract: rules.isAdmin,
      deleteCustomer: rules.isAdmin,
      deleteEmployee: rules.isAdmin,
    },
  },
  {
    debug: true,
  }
);
