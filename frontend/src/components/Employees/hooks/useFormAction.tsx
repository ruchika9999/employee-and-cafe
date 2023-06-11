import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { Modal } from "antd";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { EmployeeType } from "../../../utils/types";
import { EmployeesContext } from "../context";
import { FieldConstant } from "../../../utils/constant";
import {
  addEmployeeRequest,
  updateEmployee,
} from "../../../store/employees/actions";
import {
  isUndefinedOrEmpty,
  isValueChanged,
  resetConfirm,
} from "../../../utils/helper";
import { getEmployeesSelector } from "../../../store/employees/selectors";

const useFormAction = () => {
  const { employeeId, onClose, method } = useContext(EmployeesContext);
  const employeesData = useSelector(getEmployeesSelector);
  const dispatch = useDispatch();
  const { confirm } = Modal;

  const { reset, watch } = method;

  const handleClose = useCallback(() => {
    onClose();
    reset();
  }, []);

  const setFormValues = (
    id: string,
    employees: EmployeeType[],
    setValue: UseFormSetValue<EmployeeType>
  ) => {
    const employee = employees.find((employee) => employee.employeeId === id);

    if (employee) {
      const {
        employeeName,
        emailAddress,
        phoneNumber,
        cafeId,
        cafeName,
        gender,
      } = employee;

      const cafeOption = {
        value: cafeId || "",
        label: cafeName || "",
        placeName: cafeName || "",
      };

      setValue(FieldConstant.EMPLOYEE_NAME, employeeName);
      setValue(FieldConstant.EMAIL, emailAddress);
      setValue(FieldConstant.PHONE_NUMBER, phoneNumber);
      setValue(FieldConstant.CAFE_OPTION, cafeOption);
      setValue(FieldConstant.CAFE_ID, cafeId);
      setValue(FieldConstant.GENDER, gender);
    }
  };

  const handleFormSubmit: SubmitHandler<EmployeeType> = (values) => {
    const { employeeName, emailAddress, phoneNumber, gender, cafeOption } =
      values;
    const editEmployee = employeesData.employees.find(
      (employee) => employee.employeeId === employeeId
    );

    const fields = {
      [FieldConstant.EMPLOYEE_NAME]: employeeName,
      [FieldConstant.EMAIL]: emailAddress,
      [FieldConstant.PHONE_NUMBER]: phoneNumber,
      [FieldConstant.GENDER]: gender,
      [FieldConstant.CAFE_OPTION]: cafeOption,
      [FieldConstant.PRV_CAFE_ID]: editEmployee?.cafeId, // used to remove from cafe table
    };

    const action = employeeId
      ? updateEmployee({ ...fields, employeeId })
      : addEmployeeRequest(fields);

    dispatch(action);
    handleClose();
  };

  const onExit = () => {
    const employeeFields = watch([
      FieldConstant.EMPLOYEE_NAME,
      FieldConstant.EMAIL,
      FieldConstant.PHONE_NUMBER,
      FieldConstant.GENDER,
      FieldConstant.CAFE_OPTION,
    ]);

    isValueChanged(employeeFields) && isUndefinedOrEmpty(employeeId)
      ? confirm({
          ...resetConfirm,
          icon: <ExclamationCircleFilled />,
          onOk() {
            handleClose();
          },
        })
      : handleClose();
  };

  return {
    setFormValues,
    handleFormSubmit,
    handleClose,
    onExit,
    employeeId,
  };
};

export default useFormAction;
