import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, Divider, Drawer, Form, Row, Space } from "antd";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

import useFormAction from "./hooks/useFormAction";

import TextInput from "../Common/Inputs/TextInput";
import TextAreaInput from "../Common/Inputs/TextAreaInput";
import ImageUpload from "../Common/Inputs/ImageUpload";

import { CafeType, ErrorObject } from "../../utils/types";
import { FieldConstant } from "../../utils/constant";
import { CafesContext } from "./context";
import SearchAddress from "../Common/Inputs/SearchAddress";
import { isErrorOnSubmit } from "../../utils/helper";
import FormAlert from "../Common/FormAlert";

const ActionDrawer = () => {
  const [isError, setErrorBanner] = useState(false);
  const { isOpen, onClose, method } = useContext(CafesContext);
  const { handleFormSubmit, onExit, cafeId } = useFormAction();

  const { handleSubmit, watch, clearErrors } = method;

  const { cafeName, description, location } = watch();

  const onSubmit: SubmitHandler<CafeType> = (values) => {
    handleFormSubmit(values);
  };

  const onError: SubmitErrorHandler<CafeType> = (value) => {
    setErrorBanner(isErrorOnSubmit(value as ErrorObject));
  };

  const onCloseAlert = useCallback(() => {
    setErrorBanner(false);
    clearErrors();
  }, []);

  useEffect(() => {
    setErrorBanner(false);
  }, [cafeName, description, location, isOpen]);

  return (
    <FormProvider {...method}>
      <Drawer
        title={`${cafeId ? "EDIT" : "CREATE"} CAFE`}
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
                fieldName="Cafe Name"
                placeholder="Enter cafe name"
                maxLength={10}
                name={FieldConstant.CAFE_NAME}
                showCount={true}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <ImageUpload fieldName="" name={FieldConstant.LOGO} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <TextAreaInput
                fieldName="Description"
                placeholder="Enter mobile description"
                name={FieldConstant.DESCRIPTION}
                maxLength={256}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <SearchAddress
                fieldName="Location"
                name={FieldConstant.LOCATION}
                placeholder="Search cafe location"
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
