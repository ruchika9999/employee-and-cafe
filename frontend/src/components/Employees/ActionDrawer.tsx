import { useContext, useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Row, Space, Divider } from "antd";
import { useSelector } from "react-redux";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

import TextInput from "../Common/Inputs/TextInput";
import InputNumber from "../Common/Inputs/NumberInput";
import SelectInput from "../Common/Inputs/SelectInput";
import RadioOption from "../Common/Inputs/RadioOption";

import useFormAction from "./hooks/useFormAction";
import { EmployeesContext } from "./context";

import { FieldConstant } from "../../utils/constant";
import { EmployeeType, ErrorObject } from "../../utils/types";
import { genderOption, getCafes, isErrorOnSubmit } from "../../utils/helper";
import { getCafesSelector } from "../../store/cafes/selectors";
import FormAlert from "../Common/FormAlert";

const ActionDrawer = () => {
  const [isError, setErrorBanner] = useState(false);
  const cafesData = useSelector(getCafesSelector);
  const { isOpen, onClose, method } = useContext(EmployeesContext);
  const { handleFormSubmit, onExit, employeeId } = useFormAction();

  const { handleSubmit, clearErrors, watch } = method;

  const { employeeName, emailAddress, gender, phoneNumber } = watch();

  const onSubmit: SubmitHandler<EmployeeType> = (values) => {
    handleFormSubmit(values);
  };

  const onError: SubmitErrorHandler<EmployeeType> = (value) => {
    setErrorBanner(isErrorOnSubmit(value as ErrorObject));
  };

  const onCloseAlert = () => {
    setErrorBanner(false);
    clearErrors();
  };

  useEffect(() => {
    setErrorBanner(false);
  }, [employeeName, emailAddress, gender, phoneNumber, isOpen]);

  return (
    <FormProvider {...method}>
      <Drawer
        title={`${employeeId ? "EDIT" : "CREATE"} EMPLOYEE`}
        width={720}
        onClose={onClose}
        open={isOpen}
        bodyStyle={{ paddingBottom: 80 }}
        maskClosable={false}
      >
        <Form layout="vertical" hideRequiredMark>
          {isError && <FormAlert onCloseAlert={onCloseAlert} />}
          <Row gutter={16}>
            <Col span={12}>
              <TextInput
                fieldName="Name"
                placeholder="Enter your full name"
                maxLength={10}
                name={FieldConstant.EMPLOYEE_NAME}
                showCount={true}
              />
            </Col>
            <Col span={12}>
              <TextInput
                fieldName="Email"
                placeholder="Enter your full email"
                name={FieldConstant.EMAIL}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputNumber
                fieldName="Phone Number"
                placeholder="Enter mobile number"
                name={FieldConstant.PHONE_NUMBER}
                maxLength={8}
              />
            </Col>
            <Col span={12}>
              <SelectInput
                fieldName="Cafe"
                placeholder="Select cafe"
                name={FieldConstant.CAFE_OPTION}
                options={getCafes(cafesData.cafes)}
              />
            </Col>
            <Col>
              <RadioOption
                options={genderOption}
                fieldName="Gender"
                name={FieldConstant.GENDER}
              />
            </Col>
          </Row>
          <Divider />
          <Row justify="space-between">
            <div />
            <Space>
              <Button onClick={onExit}>Cancel</Button>
              <Button onClick={handleSubmit(onSubmit, onError)} type="primary">
                Submit
              </Button>
            </Space>
          </Row>
        </Form>
      </Drawer>
    </FormProvider>
  );
};

export default ActionDrawer;
