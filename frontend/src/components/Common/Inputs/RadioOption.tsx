import { Form, Radio } from "antd";
import { Controller, useFormContext } from "react-hook-form";

import { EmployeeType, CafeType } from "../../../utils/types";
import { FieldConstant } from "../../../utils/constant";

interface InputPropsType {
  fieldName: string;
  name: FieldConstant;
  options: string[];
}

const RadioOption = (props: InputPropsType) => {
  const { fieldName, name, options } = props;

  const { control } = useFormContext<EmployeeType | CafeType>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange }, fieldState: { error } }) => {

        return (
          <Form.Item
            label={fieldName}
            validateStatus={error?.message ? "error" : ""}
            help={error?.message && error.message}
          >
            <Radio.Group
              name={name}
              options={options}
              onChange={(e) => onChange(e)}
              optionType="button"
              buttonStyle="solid"
              value={value}
            />
          </Form.Item>
        );
      }}
    />
  );
};

export default RadioOption;
