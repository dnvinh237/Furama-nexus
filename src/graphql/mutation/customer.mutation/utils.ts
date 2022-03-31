import _ from "lodash";
import { context } from "../../../context";

export const handleCustomerInfo = async (data: any) => {
  let customerInfo;
  if (data.contracts) {
    let contracts = await context.db.contract.findMany({
      where: { id: { in: data.contracts } },
    });
    if (contracts.length != data.contracts.length)
      throw new Error("Contract is not exist");
    let listIdConnect = _.map(data.contracts, (elem) => {
      return { id: elem };
    });
    customerInfo = { ...data, contracts: { connect: listIdConnect } };
  } else {
    customerInfo = {
      ...data,
    };
  }
  return customerInfo;
};

export const checkCustomerExist = async (id: Number) => {
  let isCustomerExist = await context.db.customer.findUnique({
    where: { id: Number(id) },
  });
  if (!isCustomerExist) {
    throw new Error("Customer is not exist");
  }
};
