import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

import { EmployeeType, CafeType } from "../../../utils/types";
import { FieldConstant } from "../../../utils/constant";

type SelectOptions = { label: string; value: string; placeName: string };

const { Option } = Select;
interface InputPropsType {
  fieldName: string;
  placeholder?: string;
  name: FieldConstant;
  options: SelectOptions[];
}

const SelectInput = (props: InputPropsType) => {
  const { fieldName, placeholder, name, options } = props;

  const { control, setValue } = useFormContext<EmployeeType | CafeType>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange }, fieldState: { error } }) => {
        return (
          <Form.Item
            name={name}
            label={fieldName}
            validateStatus={error?.message ? "error" : ""}
            help={error?.message && error.message}
          >
            <Select
              placeholder={placeholder}
              onChange={(value) => {
                onChange(value);
                const selectedOption = options.find(
                  (option) => option.value === value
                );
                setValue(
                  FieldConstant.CAFE_OPTION,
                  selectedOption ?? { value: "", label: "", placeName: "" }
                );
              }}
              value={value}
              allowClear
            >
              {options.map((option) => (
                <Option key={option.label} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <div />
          </Form.Item>
        );
      }}
    />
  );
};

export default SelectInput;
