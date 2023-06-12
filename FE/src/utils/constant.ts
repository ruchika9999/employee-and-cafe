import { ModalFuncProps } from "antd";
import z from "zod";

export const GOOGLE_MAP_API_KEY = "AIzaSyAUDllPJzvIBlJJ1xuCDXFiuesBsEgXLuw";

export enum ROUTE {
  CAFES = "/cafes",
  EMPLOYEES = "/employees",
  BAD_ROUTE = "*",
}

export const EMPTY = "";

export const enum Status {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  LOADING = "LOADING",
  IDEAL = "IDEAL",
}

const defaultCafe = { value: "", label: "", placeName: "" };

export enum FieldConstant {
  EMPLOYEE_ID = "employeeId",
  EMPLOYEE_NAME = "employeeName",
  EMAIL = "emailAddress",
  PHONE_NUMBER = "phoneNumber",
  DAYS_WORKED_IN_CAFE = "daysWorkedInCafe",
  CAFE_NAME = "cafeName",
  CAFE_OPTION = "cafeOption",
  GENDER = "gender",
  DESCRIPTION = "description",
  LOCATION = "location",
  NUMBER_OF_EMPLOYEES = "numberOfEmployees",
  CAFE_ID = "cafeId",
  LOGO = "logo",
  PRV_CAFE_ID = "prvCafeId",
  START_DATE = "startDate",
}

export enum GenderOptions {
  MALE = "Male",
  FEMALE = "Female",
}
export const deleteConfirm: ModalFuncProps = {
  okText: "Yes",
  okType: "danger",
  cancelText: "No",
  content: "This action cannot be undone.",
};

export const resetConfirm: ModalFuncProps = {
  title: "Do you want to discard changes?",
  content: "You have unsaved changes that will be discarded.",
  okText: "Yes",
  okType: "danger",
  cancelText: "No",
};

export const gender = Object.keys(GenderOptions).filter((item) => {
  return isNaN(Number(item));
});

export const employeeSchema = z.object({
  [FieldConstant.EMPLOYEE_ID]: z.string().optional(),
  [FieldConstant.EMPLOYEE_NAME]: z
    .string()
    .max(10)
    .min(6)
    .or(z.string().default("")),
  [FieldConstant.EMAIL]: z.string(),
  [FieldConstant.PHONE_NUMBER]: z.number().max(8).or(z.string().default("")),
  [FieldConstant.DAYS_WORKED_IN_CAFE]: z.number().default(0).optional(),
      // FieldConstant.DAYS_WORKED_IN_CAFE this one generate for testing purpose
      // will be removed later
  [FieldConstant.CAFE_OPTION]: z
    .object({
      value: z.string(),
      label: z.string(),
      placeName: z.string(),
    })
    .default(defaultCafe),
  [FieldConstant.CAFE_NAME]: z.string().optional(),
  [FieldConstant.GENDER]: z.enum(["Male", "Female"]).or(z.string().default("")),
  [FieldConstant.CAFE_ID]: z.string().optional(),
  [FieldConstant.PRV_CAFE_ID]: z.string().optional(),
  [FieldConstant.START_DATE]: z.string().optional(),
});

export const getDefaultEmployeeForm = () => {
  return employeeSchema.parse({
    [FieldConstant.EMPLOYEE_ID]: "",
    [FieldConstant.EMPLOYEE_NAME]: "",
    [FieldConstant.EMAIL]: "",
    [FieldConstant.PHONE_NUMBER]: "",
    [FieldConstant.DAYS_WORKED_IN_CAFE]: 0,
    [FieldConstant.CAFE_OPTION]: defaultCafe,
    [FieldConstant.GENDER]: "",
    [FieldConstant.CAFE_ID]: "",
    [FieldConstant.CAFE_NAME]: "",
    [FieldConstant.PRV_CAFE_ID]: "",
  });
};

export const cafeSchema = z.object({
  [FieldConstant.CAFE_NAME]: z
    .string()
    .max(10)
    .min(6)
    .or(z.string().default("")),
  [FieldConstant.DESCRIPTION]: z.string().max(256),
  [FieldConstant.LOCATION]: z.string(),
  [FieldConstant.NUMBER_OF_EMPLOYEES]: z.number().optional(),
  [FieldConstant.CAFE_ID]: z.string().or(z.string().default("")),
  [FieldConstant.LOGO]: z.string().optional(),
});

export const getDefaultCafeForm = () => {
  return cafeSchema.parse({
    [FieldConstant.CAFE_NAME]: "",
    [FieldConstant.DESCRIPTION]: "",
    [FieldConstant.LOCATION]: "",
    [FieldConstant.NUMBER_OF_EMPLOYEES]: 0,
    [FieldConstant.CAFE_ID]: "",
    [FieldConstant.LOGO]: "",
  });
};

export const searchSchema = z.object({
  [FieldConstant.LOCATION]: z.string(),
});

export const enum AlertMessage {
  SUCCESS = "success",
  ERROR = "error",
}
