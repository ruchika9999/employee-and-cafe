import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

import { EmployeeType, CafeType } from "../../../utils/types";
import { FieldConstant } from "../../../utils/constant";

interface InputPropsType {
  fieldName: string;
  placeholder?: string;
  maxLength?: number;
  name: FieldConstant;
}

const TextAreaInput = (props: InputPropsType) => {
  const { fieldName, placeholder, maxLength, name } = props;
  const { control } = useFormContext<EmployeeType | CafeType>();

  const { TextArea } = Input;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { name, onBlur, value, onChange },
        fieldState: { error },
      }) => {
        return (
          <Form.Item
            label={fieldName}
            validateStatus={error?.message ? "error" : ""}
            help={error?.message && error.message}
          >
            <TextArea
              name={name}
              value={value as string}
              onChange={(e) => onChange(e)}
              placeholder={placeholder}
              maxLength={maxLength}
              autoSize={{ minRows: 3, maxRows: 5 }}
              showCount
            />
          </Form.Item>
        );
      }}
    />
  );
};

export default TextAreaInput;
