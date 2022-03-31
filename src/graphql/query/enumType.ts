import { enumType } from "nexus";

export const SearchBy = enumType({
  name: "SearchBy",
  members: {
    startDate: "startDate",
    endDate: "endDate",
  },
});
