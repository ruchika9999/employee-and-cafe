import { useEffect, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Space, Modal, Avatar, theme } from "antd";
import { AgGridReact } from "ag-grid-react";
import { AntDesignOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import { CafesContext } from "./context";
import {
  deleteCafeRequest,
  fetchCafesRequest,
} from "../../store/cafes/actions";
import { column } from "./helper";
import { deleteConfirm } from "../../utils/helper";
import { ROUTE } from "../../utils/constant";
import { CafeType } from "../../utils/types";
import { getCafesSelector } from "../../store/cafes/selectors";

const { useToken } = theme;

const EmployeesTable = () => {
  const dispatch = useDispatch();
  const { showDrawer } = useContext(CafesContext);
  const cafesData = useSelector(getCafesSelector);
  const { confirm } = Modal;

  const { token } = useToken();

  useEffect(() => {
    dispatch(fetchCafesRequest());
  }, [dispatch]);

  const logo = {
    headerName: "Logo",
    field: "logo",
    minWidth: 70,
    width: 70,
    maxWidth: 70,
    cellRendererFramework: (params: { value: string }) => {
      return (
        <>
          {params.value !== "" ? (
            <Avatar src={<img src={params.value} alt="avatar" />} />
          ) : (
            <Avatar
              style={{ backgroundColor: token.colorPrimary }}
              icon={<AntDesignOutlined />}
            />
          )}
        </>
      );
    },
  };

  const actionButton = {
    headerName: "Actions",
    field: "cafeId",
    lockPinned: true,
    pinned: "right",
    cellRendererFramework: (params: { value: string }) => {
      return (
        <Space wrap>
          <Button
            size="small"
            onClick={() => {
              showDrawer(params?.value);
            }}
          >
            EDIT
          </Button>
          <Button
            size="small"
            danger
            onClick={() => showDeleteConfirm(params?.value)}
          >
            DELETE
          </Button>
        </Space>
      );
    },
  };

  const employees = {
    headerName: "Employees",
    field: "numberOfEmployees",
    width: 120,
    maxWidth: 120,
    cellRendererFramework: (params: { value: string; data: CafeType }) => {
      const { cafeId } = params.data;

      return (
        <Link to={`${ROUTE.EMPLOYEES}/${cafeId}`} className="employees-link">
          {params.value}
        </Link>
      );
    },
  };

  const columnDefs = [logo, ...column, employees, actionButton];

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      flex: 1,
    }),
    []
  );

  const showDeleteConfirm = (cafeId: string) => {
    confirm({
      ...deleteConfirm,
      title: "Are you sure delete this cafe?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteCafeRequest(cafeId));
      },
    });
  };

  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        domLayout="autoHeight"
        rowData={[...cafesData.cafes]}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        animateRows={true}
      />
    </div>
  );
};

export default EmployeesTable;
