import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";

import EmployeesTable from "./EmployeesTable";
import ActionDrawer from "./ActionDrawer";
import Alert from "./Alert";

import { EmployeesContext } from "./context";
import { getEmployeesSelector } from "../../store/employees/selectors";
import { fetchEmployeesRequest } from "../../store/employees/actions";
import { getCafesSelector } from "../../store/cafes/selectors";

import { EmployeeType } from "../../utils/types";
import { getDefaultEmployeeForm } from "../../utils/constant";

import useValidation from "./hooks/useValidation";
import useFormAction from "./hooks/useFormAction";

const { Title } = Typography;
interface CafeSummaryType {
  name: string;
  numberOfEmployees: string;
}

const Employees = () => {
  const employeesData = useSelector(getEmployeesSelector);
  const cafeData = useSelector(getCafesSelector);
  const [isOpen, setOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState<string | undefined>();
  const [cafeDetails, setCafeDetails] = useState<CafeSummaryType>({
    name: "",
    numberOfEmployees: "",
  });

  const { setFormValues } = useFormAction();
  const { employeeValidation } = useValidation();

  const method = useForm<EmployeeType>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: getDefaultEmployeeForm(),
    resolver: yupResolver(employeeValidation),
  });

  const dispatch = useDispatch();
  const { cafeId: selectedCafeId } = useParams();

  const showDrawer = (id?: string) => {
    setEmployeeId(id);
    // set form values if id is present to edit employee
    if (id) setFormValues(id, employeesData.employees, method.setValue);
    method.clearErrors();
    setOpen(true);
  };

  useEffect(() => {
    const cafe = cafeData.cafes.find(({ cafeId }) => cafeId === selectedCafeId);

    if (cafe) {
      setCafeDetails({
        name: cafe.cafeName,
        numberOfEmployees: String(cafe.numberOfEmployees),
      });
    }

    dispatch(fetchEmployeesRequest(selectedCafeId));
  }, [selectedCafeId]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const employeeCount = selectedCafeId
    ? cafeDetails.numberOfEmployees
    : String(employeesData.employees.length);

  return (
    <EmployeesContext.Provider
      value={{ showDrawer, isOpen, onClose, employeeId, method }}
    >
      <Row justify="space-between" className="mb-10">
        <Col>
          <Title level={5}>
            {cafeDetails.name} Employees ({employeeCount})
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => showDrawer()}
            icon={<PlusOutlined />}
          >
            New Employee
          </Button>
        </Col>
      </Row>
      <EmployeesTable />
      {/* conditional rendering of ActionDrawer to prevent unnecessary rerendering */}
      {isOpen && <ActionDrawer />}
      <Alert />
    </EmployeesContext.Provider>
  );
};

export default Employees;
