/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormsReducerI {
  [key: string]: {
    value?: any;
    errorMessage?: string;
    validMessage?: string;
    isValid?: boolean;
    showMessage?: boolean;
    showPassword?: boolean;
  };
}
