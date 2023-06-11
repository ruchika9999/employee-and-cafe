export const column = [
  { field: "employeeId" },
  { field: "employeeName", headerName: "Name" },
  { field: "emailAddress", headerName: "Email" },
  { field: "phoneNumber" },
  { field: "daysWorkedInCafe" },
  { field: "cafeName" },
];

export const enum EmployeeAlertMessage {
  ADD_SUCCESS = "Employee added successfully",
  ADD_ERROR = "Error adding employee",
  UPDATE_SUCCESS = "Employee updated successfully",
  UPDATE_ERROR = "Error updating employee",
  DELETE_SUCCESS = "Employee deleted successfully",
  DELETE_ERROR = "Error deleting employee",
}
