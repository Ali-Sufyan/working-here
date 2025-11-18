import { setKeyValue } from "../../../../app/slices/forms/forms.type";
import { AppDispatch } from "../../../../app/store";

interface KeyFieldsI {
  [key: string]: {
    value?: string | number;
    errorMessage?: string;
    validMessage?: string;
    isValid?: boolean;
    showMessage?: boolean;
    showPassword?: boolean;
  };
}

/**
 * The function `validateFormKeys` iterates through key-value pairs, validates the form fields, and
 * dispatches error messages if necessary.
 * @param {KeyFieldsI} keys - The `keys` parameter in the `validateFormKeys` function is an object that
 * contains key-value pairs representing form fields. Each key is a field name, and each value is an
 * object with properties like `value`, `isValid`, etc. The function iterates over these key-value
 * pairs to validate
 * @param {AppDispatch} dispatch - The `dispatch` parameter in the `validateFormKeys` function is a
 * function that is used to dispatch actions to the Redux store. It is typically provided by the
 * `useDispatch` hook in a React component and is used to update the state in the Redux store by
 * dispatching actions.
 * @returns The function `validateFormKeys` returns a boolean value, either `true` or `false`, based on
 * the validation logic performed on the keys provided as input.
 */
export function validateFormKeys(
  keys: KeyFieldsI,
  dispatch: AppDispatch
): boolean {
  let it = true;

  Object.entries(keys).forEach((key) => {
    const [name, value] = key;
    // //console.log(name, value);

    const fieldName = name
      ? name.split("form")[1].split("-").join(" ").trim()
      : "";
    if (value === undefined) {
      dispatch(
        setKeyValue({
          [name]: {
            errorMessage: `${fieldName} field is required`,
            isValid: false,
            showMessage: true,
          },
        })
      );
      it = false;
    } else if (value.value === "" || !value.isValid) {
    
      
      dispatch(
        setKeyValue({
          [name]: {
            errorMessage:
              value && value.value
                ? `sorry chief seems like  ${value.value}\n is not a valid ${fieldName}`
                : `${fieldName} field is required`,
            isValid: false,
            showMessage: true,
          },
        })
      );
      setTimeout(() => { 
   dispatch(
     setKeyValue({
       [name]: {
         
         showMessage: false,
       },
     })
   );
      },2000)
      it = false;
    } else {
      //   //console.log("here");
      dispatch(
        setKeyValue({
          [name]: {
            errorMessage: "",
            isValid: true,

            showMessage: false,
          },
        })
      );
      it = true;
    }
  });
  return it;
}

// validate([password, email])
