import { Form, InputNumber } from "antd";
import { Controller, useFormContext } from "react-hook-form";

import { EmployeeType, CafeType } from "../../../utils/types";
import { FieldConstant } from "../../../utils/constant";

interface InputPropsType {
  fieldName: string;
  placeholder?: string;
  maxLength?: number;
  name: FieldConstant;
}

const NumberInput = (props: InputPropsType) => {
  const { fieldName, placeholder, maxLength, name } = props;

  const {
    control,
  } = useFormContext<EmployeeType | CafeType>();


  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange }, fieldState: { error } }) => (
        <Form.Item
          label={fieldName}
          validateStatus={error?.message ? "error" : ""}
          help={error?.message && error.message}
        >
          <InputNumber
            style={{ width: "100%" }}
            name={name}
            value={value as number}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(e) => onChange(e)}
          />
        </Form.Item>
      )}
    />
  );
};

export default NumberInput;
