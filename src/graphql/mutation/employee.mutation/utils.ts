import { context } from "../../../context";
import * as _ from "lodash";

export const handleEmployeeInfo = async (data: any) => {
  let employeeInfo = { ...data };
  if (data.position) {
    let position = await context.db.position.findUnique({
      where: { id: data.position },
    });
    if (!position) throw new Error("No position in system");
    employeeInfo = {
      ...employeeInfo,
      position: {
        connect: { id: Number(data.position) },
      },
    };
  } else {
    delete employeeInfo.position;
  }

  if (data.division) {
    let division = await context.db.division.findUnique({
      where: { id: data.division },
    });
    if (!division) throw new Error("No division in system");
    employeeInfo = {
      ...employeeInfo,
      division: {
        connect: { id: Number(data.division) },
      },
    };
  } else {
    delete employeeInfo.division;
  }

  if (data.educationDegree) {
    let educationDegree = await context.db.educationDegree.findUnique({
      where: { id: data.educationDegree },
    });
    if (!educationDegree) throw new Error("No educationDegree in system");
    employeeInfo = {
      ...employeeInfo,
      educationDegree: {
        connect: { id: Number(data.educationDegree) },
      },
    };
  } else {
    delete employeeInfo.educationDegree;
  }

  if (data.contracts) {
    let contracts = await context.db.contract.findMany({
      where: { id: { in: data.contracts } },
    });
    if (contracts.length != data.contracts.length)
      throw new Error("Contract is not exist");
    let listIdConnect = _.map(data.contracts, (elem) => {
      return { id: elem };
    });
    employeeInfo = { ...employeeInfo, contracts: { connect: listIdConnect } };
  }

  return employeeInfo;
};

export const checkEmployeeExist = async (id: Number) => {
  let isEmployeeExist = await context.db.employee.findUnique({
    where: { id: Number(id) },
  });
  if (!isEmployeeExist) {
    throw new Error("Employee is not exist");
  }
};
