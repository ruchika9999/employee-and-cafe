import { object, string } from "yup";

import { FieldConstant } from "../../../utils/constant";

const useValidation = () => {
  const nameValidation = string()
    .required("Name is required")
    .test(
      "Cafe name must more than six",
      "Name must more than 6 characters",
      (value) => value.length >= 6
    );

  const employeeValidationSchema = {
    [FieldConstant.CAFE_NAME]: nameValidation,
    [FieldConstant.DESCRIPTION]: string().required("Description is required"),
    [FieldConstant.LOCATION]: string().required("Location is required"),
  };

  return { cafeValidation: object(employeeValidationSchema) };
};

export default useValidation;
