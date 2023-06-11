import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { Modal } from "antd";

import { CafesContext } from "../context";
import { CafeType } from "../../../utils/types";
import { FieldConstant, resetConfirm } from "../../../utils/constant";
import {
  addCafeRequest,
  updateCafeRequest,
} from "../../../store/cafes/actions";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { isUndefinedOrEmpty, isValueChanged } from "../../../utils/helper";
import { getCafesSelector } from "../../../store/cafes/selectors";

const useFormAction = () => {
  const { cafeId, onClose, method } = useContext(CafesContext);

  const cafesData = useSelector(getCafesSelector);

  const dispatch = useDispatch();
  const { confirm } = Modal;

  const { watch, reset } = method;

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, []);

  const setFormValues = (id: string, setValue: UseFormSetValue<CafeType>) => {
    const editCafe = cafesData.cafes.find((cafe) => cafe.cafeId === id);

    if (editCafe) {
      const { cafeName, description, location, logo } = editCafe;

      setValue(FieldConstant.CAFE_NAME, cafeName);
      setValue(FieldConstant.DESCRIPTION, description);
      setValue(FieldConstant.LOCATION, location);
      setValue(FieldConstant.LOGO, logo);
    }
  };

  const handleFormSubmit: SubmitHandler<CafeType> = (values) => {
    const { cafeName, description, location, logo } = values;

    const fields = {
      [FieldConstant.CAFE_NAME]: cafeName,
      [FieldConstant.DESCRIPTION]: description,
      [FieldConstant.LOCATION]: location,
      [FieldConstant.CAFE_ID]: "",
      [FieldConstant.LOGO]: logo,
    };

    const action = cafeId
      ? updateCafeRequest({ ...fields, cafeId })
      : addCafeRequest(fields);

    dispatch(action);
    handleClose();
  };

  const onExit = () => {
    const employeeFields = watch([
      FieldConstant.CAFE_NAME,
      FieldConstant.DESCRIPTION,
      FieldConstant.LOCATION,
    ]);

    if (isValueChanged(employeeFields) && isUndefinedOrEmpty(cafeId)) {
      confirm({
        ...resetConfirm,
        icon: <ExclamationCircleFilled />,
        onOk: handleClose,
      });
    } else {
      handleClose();
    }
  };

  return {
    handleFormSubmit,
    onExit,

    cafeId,
    setFormValues,
  };
};

export default useFormAction;
