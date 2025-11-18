import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetNotificationByIdQuery } from "../../../../../app/services/notifications/notification.query";
import { INotification } from "../../../../../app/services/notifications/notification.types";
import { useLazyGetUserQuery } from "../../../../../app/services/users/user.query";
import { UserI } from "../../../../../app/slices/branded/user/user.types";
import { Crud } from "../../../../utilities/crud/gen/components";
import {
  CRUCategoriesI,
  CRUHeadingI,
  CruI,
} from "../../../../utilities/crud/gen/interface.gen";
import { myIcons } from "../../../../utilities/icons";
import Loading from "../../../../utilities/styles/loading";

export const NotificationCategories: CRUCategoriesI[] = [
  { key: "user", name: "user" },
  { key: "details", name: "details" },

  { key: "message", name: "message Details" },
];
export const NotificationHeadings: CRUHeadingI[] = [
  {
    key: "userId",
    name: "User ID",
    formType: "obj",
    isToggle: false,
    placeholder: "",
    prefixIcons: <myIcons.IconCardImage />,
    category: "user", // Assuming user ID relates to the order
    child: [
      {
        key: "firstName",
        name: "First Name",
        formType: "text",
        isToggle: false,

        placeholder: "",
        prefixIcons: <myIcons.UserBold />,
        category: "user",
      },
      {
        key: "lastName",
        name: "Last Name",
        formType: "text",
        isToggle: false,

        placeholder: "",
        prefixIcons: <myIcons.UserBold />,
        category: "user",
      },
      {
        key: "email",
        name: "Email",
        formType: "text",
        isToggle: false,

        placeholder: "",
        prefixIcons: <myIcons.UserBold />,
        category: "user",
      },
    ],
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
    key: "createdAt",
    name: "Created At",
    formType: "date",
    isToggle: false,
    placeholder: "0.00",
    prefixIcons: <myIcons.MessageIcon />,
    category: "details", // Amount relates to the financial aspect
  },
  {
    key: "title",
    name: "Title",
    formType: "number",
    isToggle: false,
    placeholder: "0.00",
    prefixIcons: <myIcons.MessageIcon />,
    category: "details", // Credit amount also relates to the financial aspect
  },

  {
    key: "viewed",
    name: "is viewed",
    formType: "toggle",
    isToggle: true,
    placeholder: "0.00",
    prefixIcons: <myIcons.MessageIcon />,
    category: "details", // Credit amount also relates to the financial aspect
  },
  {
    key: "body",
    name: "message",
    formType: "text",
    isToggle: false,
    placeholder: "0.00",
    isRawHtml: true,
    prefixIcons: <myIcons.MessageIcon />,
    category: "message", // Credit amount also relates to the financial aspect
  },
];

export function ViewNotification() {
  const { notificationId } = useParams<{ notificationId: string }>();
  const { data, isLoading, isError, isSuccess, error } =
    useGetNotificationByIdQuery(notificationId!);

  const [d, setD] = useState<
    Omit<INotification, "userId"> & { userId: Partial<UserI> | undefined }
  >();

  const [user, status] = useLazyGetUserQuery();

  useEffect(() => {
    async function getter() {
      if (isSuccess) {
        const userx = (await user(data.userId)) ?? "";

        setD({
          ...data,

          userId: userx.data,
        });
      }
    }
    getter();
  }, [data, isSuccess, user]);

  const dat: CruI = {
    type: "VIEW",
    headings: NotificationHeadings,
    categories: NotificationCategories,
    data: isSuccess && status.isSuccess ? d! : {},
    name: "notification",
    icon: <myIcons.MessageIcon />,
    id: isSuccess ? data.id : "",
    showButton: {
      deleteButton: true,
    },
  };

  return (
    <>
      {(isLoading || status.isLoading) && (
        <div>
          <Loading transparent={true} fullscreen />
        </div>
      )}
      {isError && <div>Error: {error.message}</div>}
      {isSuccess && status.isSuccess && d && <Crud data={dat} />}
    </>
  );
}
