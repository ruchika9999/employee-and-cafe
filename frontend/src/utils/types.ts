import { z } from "zod";
import { AnyAction } from "redux";

import { cafeSchema, employeeSchema, searchSchema } from "./constant";

export type CafeType = z.infer<typeof cafeSchema>;

export type EmployeeType = z.infer<typeof employeeSchema>;

export type CafeLocationType = z.infer<typeof searchSchema>;

export type ResetAction = () => AnyAction;
