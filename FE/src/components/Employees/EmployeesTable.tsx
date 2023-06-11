import { useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { Button, Space, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { deleteEmployeeRequest } from "../../store/employees/actions";
import { fetchCafesRequest } from "../../store/cafes/actions";

import { column } from "./helper";
import { deleteConfirm } from "../../utils/constant";

import { EmployeesContext } from "./context";
import { getEmployeesSelector } from "../../store/employees/selectors";

function EmployeesTable() {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const employeesData = useSelector(getEmployeesSelector);

  const { showDrawer } = useContext(EmployeesContext);

  useEffect(() => {
    dispatch(fetchCafesRequest());
  }, [dispatch]);

  const actionButton = {
    headerName: "Actions",
    field: "employeeId",
    lockPinned: true,
    pinned: "right",
    cellRendererFramework: ({ value }: { value: string }) => {
      return (
        <Space wrap>
          <Button
            size="small"
            onClick={() => {
              showDrawer(value);
            }}
          >
            EDIT
          </Button>
          <Button
            size="small"
            danger
            onClick={() => {
              showDeleteConfirm(value);
            }}
          >
            DELETE
          </Button>
        </Space>
      );
    },
  };

  const columnDefs = [...column, actionButton];

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      flex: 1,
    }),
    []
  );

  const showDeleteConfirm = (employeeId: string) => {
    confirm({
      ...deleteConfirm,
      title: "Are you sure you want to delete this employee?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteEmployeeRequest(employeeId));
      },
    });
  };

  const sortedEmployees = useMemo(() => {
    return employeesData.employees
      .filter((employee) => employee.daysWorkedInCafe !== undefined)
      .sort((a, b) => b.daysWorkedInCafe! - a.daysWorkedInCafe!);
  }, [employeesData.employees]);



  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        domLayout="autoHeight"
        rowData={sortedEmployees}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        animateRows
      />
    </div>
  );
}

export default EmployeesTable;
