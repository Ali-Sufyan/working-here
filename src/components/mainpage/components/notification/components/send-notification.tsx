/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import {
    useSendNotificationMutation,
    useSendNotificationViaEmailMutation,
} from "../../../../../app/services/notifications/notification.query";
import { INotification } from "../../../../../app/services/notifications/notification.types";
import { Crud } from "../../../../utilities/crud/gen/components";
import {
    CRUCategoriesI,
    CRUHeadingI,
    CruI,
} from "../../../../utilities/crud/gen/interface.gen";
import { myIcons } from "../../../../utilities/icons";
import { deleteFields } from "../../../../utilities/utils";
import { emailRegex } from "../../../../utilities/validators";

export const NotificationCategories: CRUCategoriesI[] = [
  { key: "user", name: "user" },
  { key: "details", name: "details" },
  { key: "type", name: "type" },

  { key: "message", name: "message Details" },
];
export const NotificationHeadings: CRUHeadingI[] = [
  {
    key: "userId",
    name: "email or user Id",
    formType: "text",
    isToggle: false,
    required:true,
    placeholder: "",
    prefixIcons: <myIcons.UserBold />,
    category: "user", // Assuming user ID relates to the order
  },

  {
    key: "type",
    name: "Type",
    formType: "text",
    isToggle: false,
    placeholder: "",
    prefixIcons: <myIcons.MessageIcon />,
    category: "details", // PIN relates to security
  },
  {
    key: "nType",
    name: "message channel",
    formType: "select2",
    isToggle: false,
    placeholder: "",
    kv: {
      email: {
        value: "email",
        description: "this only sends email to the users mail",
      },
      notification: {
        value: "notification",
        description: "this only notifications to the user",
      },
      both: {
        value: "both",
        description: "this both notifications and email",
      },
    },
    prefixIcons: <myIcons.MessageIcon />,
    category: "type", // PIN relates to security
  },

  {
    key: "title",
    name: "Title",
    formType: "text",
    isToggle: false,
    placeholder: "0.00",
    prefixIcons: <myIcons.MessageIcon />,
    category: "details", // Credit amount also relates to the financial aspect
  },

  {
    key: "body",
    name: "message",
    formType: "textarea2",
    isToggle: false,
    placeholder: "0.00",
    prefixIcons: <myIcons.MessageIcon />,
    category: "message", // Credit amount also relates to the financial aspect
  },
];

export function SendNotification() {
  const [send, { isLoading: isL, isSuccess: isS, isError: isE, error: e }] =
    useSendNotificationMutation();
  const [sendEmail, { isLoading, isError, isSuccess, error }] =
    useSendNotificationViaEmailMutation();
  async function create(data: any) {
    //console.log(data);

    if (emailRegex.test(data.userId)) {
      const da = deleteFields<INotification>(data, ["userId"]);
      const f = da as Omit<INotification, "userId">;

      await sendEmail({
        userEmail: data.userId as string,
        ...f,
      });
    } else if (data.userId.match(/^[0-9a-fA-F]{24}$/)) {
      await send(data);
    } else {
      toast.error("the userId is not a valid email or userId of the user");
    }

    return isE || isError
      ? "isError"
      : isS || isSuccess
      ? "isSuccess"
      : isL || isLoading
      ? "isLoading"
      : "none";
  }

  const dat: CruI = {
    type: "CREATE",
    headings: NotificationHeadings,
    categories: NotificationCategories,
    data: {},
    name: "notification",
    icon: <myIcons.MessageIcon />,
    create: {
      create: create,
      createStatus:
        isE || isError
          ? "error"
          : isS || isSuccess
          ? "success"
          : isL || isLoading
          ? "loading"
          : "none",
      errorMessage: String(
        (error && error?.data?.message) ?? (e && e?.data?.message)
      ),
    },
    id: "",
    buttonName:"send",
    showButton: {
      createButton: true,
    },
  };

  return <>{<Crud data={dat} />}</>;
}
