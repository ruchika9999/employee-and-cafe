import { useCallback, useState } from "react";
import { Button, Col, Row } from "antd";
import { useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";

import CafesTable from "./CafesTable";
import ActionDrawer from "./ActionDrawer";
import SearchCafe from "./SearchCafe";

import { CafeType } from "../../utils/types";
import { getDefaultCafeForm } from "../../utils/constant";

import { CafesContext } from "./context";
import useFormAction from "./hooks/useFormAction";
import useValidation from "./hooks/useValidation";
import AlertHolder from "./Alert";

const Employees = () => {
  const [isOpen, setOpen] = useState(false);
  const [cafeId, setCafeId] = useState<string | undefined>(undefined);

  const { setFormValues } = useFormAction();
  const { cafeValidation } = useValidation();

  const method = useForm<CafeType>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: getDefaultCafeForm(),
    resolver: yupResolver(cafeValidation),
  });

  const showDrawer = (id?: string) => {
    setCafeId(id);
    if (id) setFormValues(id, method.setValue);
    setOpen(true);
  };

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <CafesContext.Provider
      value={{ showDrawer, onClose, isOpen, cafeId, method }}
    >
      <Row justify="space-between" className="mb-10">
        <Col>
          <SearchCafe />
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => showDrawer()}
            icon={<PlusOutlined />}
          >
            New Cafe
          </Button>
        </Col>
      </Row>
      <CafesTable />
      {/* conditional rendering of ActionDrawer for prevent unnecessary rerendering */}
      {isOpen && <ActionDrawer />}
      <AlertHolder />
    </CafesContext.Provider>
  );
};

export default Employees;
