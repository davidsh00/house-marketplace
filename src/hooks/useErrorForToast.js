import React from "react";

export const useErrorForToast = (error) => {
  return error
    .toString()
    .substring(error.toString().lastIndexOf("(") + 1)
    .replace(").", "");
};
