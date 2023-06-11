import { object, string } from "yup";
import { FieldConstant } from "../../../utils/constant";

import "yup-phone-lite";

const useValidation = () => {
  const mobileValidation = string()
    .phone("SG", "Please enter a valid phone number")
    .required("A phone number is required");

  const nameValidation = string()
    .required("Name is required")
    .test(
      "employee name length is more than six",
      "Name must more than 6 characters",
      (value) => value.length >= 6
    );

  const employeeValidationSchema = {
    [FieldConstant.EMPLOYEE_NAME]: nameValidation,
    [FieldConstant.EMAIL]: string()
      .required("Email is required")
      .email("Must be a valid email"),
    [FieldConstant.PHONE_NUMBER]: mobileValidation,
    [FieldConstant.GENDER]: string().required("Gender is required"),
  };

  return { employeeValidation: object(employeeValidationSchema) };
};

export default useValidation;
