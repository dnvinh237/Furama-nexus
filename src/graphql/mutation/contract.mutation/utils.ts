import { context } from "../../../context";

export const handleContractInfo = async (data: any) => {
  let contractInfo = { ...data };
  if (data.customer) {
    let customer = await context.db.customer.findUnique({
      where: { id: data.customer },
    });
    if (!customer) throw new Error("No customer in system");
    contractInfo = {
      ...contractInfo,
      customer: {
        connect: { id: Number(data.customer) },
      },
    };
  } else {
    delete contractInfo.customer;
  }
  if (data.employee) {
    let employee = await context.db.employee.findUnique({
      where: { id: data.employee },
    });
    if (!employee) throw new Error("No employee in system");
    contractInfo = {
      ...contractInfo,
      employee: {
        connect: { id: Number(data.employee) },
      },
    };
  } else {
    delete contractInfo.employee;
  }
  return contractInfo;
};

export const checkContractExist = async (id: Number) => {
  let isContractExist = await context.db.contract.findUnique({
    where: { id: Number(id) },
  });
  if (!isContractExist) {
    throw new Error("Contract is not exist");
  }
};
