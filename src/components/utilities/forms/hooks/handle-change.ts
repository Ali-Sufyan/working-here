import { setKeyValue } from "../../../../app/slices/forms/forms.type";
import { AppDispatch } from "../../../../app/store";

export function handleFormChange({
  event,
  dispatch,
}: {
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  dispatch: AppDispatch;
}) {
  if (event.target.name) {
    if (event.target.type === "file") {
      // ((event.target as HTMLInputElement) &&
      //   (event.target as HTMLInputElement).files &&
      //   (event.target as HTMLInputElement)!.files![0]) ??
      //   "",

      dispatch(
        setKeyValue({
          [event.target.name]: {
            value: event.target.value,

            isValid: true,
            showMessage: false,
            errorMessage: "",
            showPassword: false,
            validMessage: "",
          },
        })
      );
    } else {
      dispatch(
        setKeyValue({
          [event.target.name]: {
            value: event.target.value,
            isValid: true,
            showMessage: false,
            errorMessage: "",
            showPassword: false,
            validMessage: "",
          },
        })
      );
    }
  }
}
