import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { EmployeeType } from "../../utils/types";

interface ContextType {
  showDrawer: (cafeId?: string) => void;
  isOpen: boolean;
  onClose: () => void;
  employeeId: string | undefined;
  method: UseFormReturn<EmployeeType>;
}

const initialValues = {
  showDrawer: () => {},
  isOpen: false,
  onClose: () => {},
  employeeId: undefined,
  method: {} as UseFormReturn<EmployeeType>,
};

export const EmployeesContext = createContext<ContextType>(initialValues);
