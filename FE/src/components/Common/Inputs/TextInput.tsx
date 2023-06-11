import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

import { EmployeeType, CafeType } from "../../../utils/types";
import { FieldConstant } from "../../../utils/constant";

interface InputPropsType {
  fieldName: string;
  placeholder?: string;
  maxLength?: number;
  name: FieldConstant;
  showCount?: boolean;
}

const TextInput = (props: InputPropsType) => {
  const { fieldName, placeholder, maxLength, name, showCount } = props;

  const { control } = useFormContext<EmployeeType | CafeType>();

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
          <Input
            showCount={showCount}
            name={name}
            value={value as string}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(e) => onChange(e)}
          />
        </Form.Item>
      )}
    />
  );
};

export default TextInput;
