import { produce } from "immer";

import { Status } from "../../../utils/constant";
import { EmployeeActions, ActionTypes } from "../types";
import { EmployeeType } from "../../../utils/types";

interface InitialStateType {
  state: Status;
  employees: EmployeeType[];
  error: string | null;
}

const initialState: InitialStateType = {
  state: Status.IDEAL,
  employees: [],
  error: null,
};

const reducer = (state = initialState, { type, payload }: EmployeeActions) =>
  produce(state, (draft) => {
    switch (type) {
      case ActionTypes.FETCH_EMPLOYEES_REQUEST:
        draft.state = Status.LOADING;
        break;
      case ActionTypes.FETCH_EMPLOYEES_SUCCESS:
        draft.state = Status.SUCCESS;
        draft.employees = payload.employees;
        draft.error = null;
        break;
      case ActionTypes.FETCH_EMPLOYEES_FAILURE:
        draft.state = Status.FAILURE;
        draft.error = payload.error;
        break;
      default:
        break;
    }
  });

export default reducer;
