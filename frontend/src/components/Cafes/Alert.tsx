import { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { AlertMessage, Status } from "../../utils/constant";
import {
  addEmployeeReset,
  deleteEmployeeReset,
  updateEmployeeReset,
} from "../../store/cafes/actions";
import {
  getAddCafeSelector,
  getDeleteCafeSelector,
  getUpdateCafeSelector,
} from "../../store/cafes/selectors";
import { CafeAlertMessage } from "./helper";
import { ResetAction } from "../../utils/types";

const Alert = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const addCafe = useSelector(getAddCafeSelector);
  const deleteCafe = useSelector(getDeleteCafeSelector);
  const updateCafe = useSelector(getUpdateCafeSelector);

  useEffect(() => {
    const handleStatus = (
      status: Status,
      successMessage: string,
      errorMessage: string,
      resetAction: ResetAction
    ) => {
      if (status === Status.SUCCESS) {
        messageApi.open({
          type: AlertMessage.SUCCESS,
          content: successMessage,
        });
        dispatch(resetAction());
      } else if (status === Status.FAILURE) {
        messageApi.open({
          type: AlertMessage.ERROR,
          content: errorMessage,
        });
        dispatch(resetAction());
      }
    };

    handleStatus(
      addCafe.status,
      CafeAlertMessage.SUCCESS_ADD_CAFE,
      CafeAlertMessage.ERROR_ADD_CAFE,
      addEmployeeReset
    );
    handleStatus(
      deleteCafe.status,
      CafeAlertMessage.DELETE_SUCCESS,
      CafeAlertMessage.DELETE_ERROR,
      deleteEmployeeReset
    );
    handleStatus(
      updateCafe.status,
      CafeAlertMessage.UPDATE_SUCCESS,
      CafeAlertMessage.UPDATE_ERROR,
      updateEmployeeReset
    );
  }, [addCafe.status, deleteCafe.status, updateCafe.status]);

  return <>{contextHolder}</>;
};

export default Alert;
