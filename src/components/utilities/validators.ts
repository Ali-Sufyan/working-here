/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,5}$/;

export const phoneRegex = /^[0-9]{10}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$\-_.])[a-zA-Z\d@#$\-_.]{8,}$/;

export const nameRegex = /^[a-zA-Z ]{2,30}$/;
export const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
export const numberRegex = /^[0-9]+$/;
export const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
export const minLengthRegex = (length: number) => new RegExp(`^.{${length},}$`);
export const maxLengthRegex = (length: number) =>
  new RegExp(`^.{0,${length}}$`);
export const requiredTester = (value: any) => !!value;
export function generateRegex({
  max,
  min,
  type,
}: {
  min?: number;
  max?: number;
  type:
    | "number"
    | "alpha"
    | "upper"
    | "lower"
    | "alphanum"
    | "special"
    | "alphanumSpecial";
}): RegExp {
  let regexPattern = "";

  switch (type) {
    case "number":
      regexPattern = "\\d";
      break;
    case "alpha":
      regexPattern = "[A-Za-z]";
      break;
    case "upper":
      regexPattern = "[A-Z]";
      break;
    case "lower":
      regexPattern = "[a-z]";
      break;
    case "alphanum":
      regexPattern = "\\w";
      break;
    case "special":
      // Add your desired special characters inside the square brackets
      regexPattern = "[!@#$%^&*]";
      break;
    case "alphanumSpecial":
      // Add your desired special characters inside the square brackets
      regexPattern = "\\w[!@#$%^&*]";
      break;
    default:
      // Custom character set
      regexPattern = `[${type}]`;
  }
  return new RegExp(`^${regexPattern}{${min ?? ""},${max ?? ""}}$`);
}

// Example usage:
