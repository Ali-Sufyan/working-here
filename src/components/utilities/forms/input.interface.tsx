/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface InputTypeI {
  imageUrl?: string;

  type:
    | "text"
    | "password"
    | "checkbox"
    | "radio"
    | "submit"
    | "reset"
    | "button"
    | "file"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "range"
    | "search"
    | "tel"
    | "time"
    | "url"
    | "week";

  name?: string;
  placeholder?: string;
  value?: string | number | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement>;
  id?: string;
  required?: boolean;
  pattern?: string;
  minlength?: number;
  maxlength?: number;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  autocomplete?: string;
  classN?: string;
  form?: string;
  list?: string;
  checked?: boolean;
  min?: number;
  max?: number;
  step?: number;
  accept?: string;
  multiple?: boolean;
  label?: string;
  labelFor?: string;
  labelClass?: string;
  labelStyle?: string;
  labelPosition?: string;
  labelAlign?: string;
  labelWidth?: string;
  labelColon?: boolean;
  labelWrap?: boolean;
  labelTooltip?: string;
  labelTooltipPlacement?: string;
  labelDisabled?: boolean;
  wrapperColon?: boolean;
  wrapperClass?: string;
  wrapperStyle?: string;
  wrapperAlign?: string;
  wrapperWidth?: string;
}

export interface InputI {
  inputType: InputTypeI;
  label: string;

  err?: boolean;
  helper?: string;
  showHelper?: boolean;
  showExtraInfo?: boolean;
  extraInfo?: string;
  extraInfoIcon?: JSX.Element;
  prefix?: {
    element?: JSX.Element;
    click?: () => void;
  };
  suffix?: {
    element: JSX.Element;
    click?: () => void;
  };
}

export interface SelectInputI extends Omit<InputI, "inputType" | "suffix"> {
  kv: Record<string, any>;
  placeholder: string;
  inputType: Pick<
    InputTypeI,
    | "value"
    | "disabled"
    | "name"
    | "required"
    | "multiple"
    | "form"
    | "autocomplete"
  > & {
    size?: number;
    className: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  };
}

export interface SelectInputI2 extends Omit<InputI, "inputType" | "suffix"> {
  kv: { [key: string]: { value: any; description: string } };
  placeholder: string;
  inputType: Pick<
    InputTypeI,
    | "value"
    | "disabled"
    | "name"
    | "required"
    | "multiple"
    | "form"
    | "autocomplete"
  > & {
    size?: number;
    className: string;
    onChange?: ({
      key,
      value,
    }: {
      key: string;
      value: { value: any; description: string };
    }) => void;
  };
}
export interface SelectInputI3 extends Omit<InputI, "inputType" | "suffix"> {
  kv: Record<string, any>;
  placeholder: string;
  inputType: Pick<
    InputTypeI,
    | "value"
    | "disabled"
    | "name"
    | "required"
    | "multiple"
    | "form"
    | "autocomplete"
  > & {
    size?: number;
    className: string;
    onChange?: ({ key, value }: { key: string; value: any }) => void;
  };
}

export interface FileInputI extends Omit<InputI, "inputType" | "suffix"> {
  placeholder: string;
  inputType: Pick<
    InputTypeI,
    | "value"
    | "disabled"
    | "accept"
    | "name"
    | "required"
    | "multiple"
    | "form"
    | "autocomplete"
  > & {
    className: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
}
