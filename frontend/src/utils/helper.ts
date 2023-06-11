import { ModalFuncProps } from "antd";

import { EMPTY, GenderOptions } from "./constant";
import { CafeType } from "./types";

export const gender = Object.values(GenderOptions).filter((item) => {
  return isNaN(Number(item));
});

export const isValueChanged = (array: unknown[]): boolean => {
  return array.some((item) => {
    if (typeof item === "object") {
      return Object.values(item as string[]).some((value) => {
        return value !== "";
      });
    }
    return item !== "";
  });
};

export const isUndefinedOrEmpty = (v: string | undefined | number) => {
  return v === undefined || v === EMPTY;
};

export const getCafes = (cafes: CafeType[]) => {
  return cafes.map((cafe) => {
    return {
      value: cafe?.cafeId,
      label: cafe?.cafeName,
      placeName: cafe?.cafeName,
    };
  });
};

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
