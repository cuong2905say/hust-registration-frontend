import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "id",
    accessor: "id",
  },
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "DOB",
    accessor: "date_of_birth",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Age",
    accessor: "age",
  },
];