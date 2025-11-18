import { successToast } from "@/components/utilities/toaster";
import { useAuth0 } from "@auth0/auth0-react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton } from "@mui/material";
import { Check } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useGetAllUsersNotificationQuery,
  useLazyGetAllUsersNotificationQuery,
  useViewNotificationMutation,
} from "../../../../app/services/notifications/notification.query";
import { useAppDispatch, useAppSelector } from "../../../../app/slices/hooks";
import { openSomeModal } from "../../../../app/slices/modal/modal.types";
import {
  MessageIcon,
  MessageOpenIcon,
} from "../../../utilities/icons/util-icons";
import AllCustomModal from "../../../utilities/modal/allModal";
import Loading from "../../../utilities/styles/loading";
import { parseDateTime } from "../../../utilities/time-magic";
import {
  parseNotification,
  RenderHtml,
} from "../../../utilities/utils";
import { INotification } from "../../../../app/services/notifications/notification.types";

export default function NotificationDropDown() {
  const [menuActive, setMenuActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true); // Default to true to show red dot

  const [fetchNotifications] = useLazyGetAllUsersNotificationQuery();
  const data = useAppSelector((state) => state.notification.notification);

  const dispatch = useAppDispatch();
  const { getIdTokenClaims, isAuthenticated } = useAuth0();
  
  // Memoize the fetch function to prevent recreating it on every render
  const loadNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const tokenClaims = await getIdTokenClaims();
      if (tokenClaims) {
        await fetchNotifications();
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchNotifications, getIdTokenClaims, isAuthenticated]);

  // Check if there are unread notifications whenever data changes
  useEffect(() => {
    if (data && data.length > 0) {
      setHasUnread(data.some(notification => !notification.viewed));
    }
  }, [data]);

  // Handle menu toggle and fetch notifications if needed
  const menuToggle = () => {
    // First toggle the menu visibility for immediate feedback
    setMenuActive(!menuActive);
    
    // Then fetch notifications if opening the menu
    if (!menuActive && isAuthenticated) {
      loadNotifications();
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="action p-2">
      <div className="profile mt-1" onClick={menuToggle}>
        <IconButton color="inherit">
          <Badge
            variant="dot"
            invisible={!hasUnread}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#f44336",
                color: "#ffffff"
              }
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </div>
      <div
        ref={dropdownRef}
        className={`menu ${
          menuActive ? "block" : "hidden"
        } absolute bg-white right-[20px] flex flex-col elevated-paper max-w-[300px] max-h-[400px] overflow-auto z-50 animate-in fade-in duration-150`}
      >
        <h5 className="text-center text-[16px] px-2 font-semibold text-gray-700 py-2 sticky top-0 bg-white">
          Notifications
        </h5>
        
        <ul>
          {isLoading ? (
            <li className="py-8 px-4">
              <div className="flex flex-col items-center justify-center">
                <Loading transparent={true} size={28} />
                <p className="text-gray-500 text-sm mt-2">Loading notifications...</p>
              </div>
            </li>
          ) : data && data.length > 0 ? (
            data
              .slice()
              .sort((a, b) => {
                // Show unread notifications first, then sort by date (newest first)
                if (a.viewed !== b.viewed) {
                  return a.viewed ? 1 : -1;
                }
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
              })
              .map((notification, index) => (
                  <div key={index}>
                    <AllCustomModal
                      modalId={`show-notification-details-${index}`}
                      children={<NotificationDetail notification={notification} />}
                    />
                    <li
                      onClick={() => {
                        dispatch(openSomeModal(`show-notification-details-${index}`));
                      }}
                      className={`flex cursor-pointer items-center py-4 px-2 border-b border-gray-200 hover:bg-gray-100 ${
                        !notification.viewed ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="max-w-20 mr-2 text-primary">
                        <div className={`w-[16px] h-[16px] text-accent-1 ${notification.viewed ? "opacity-50" : ""}`}>
                          {notification.viewed ? <MessageOpenIcon /> : <MessageIcon />}
                        </div>
                      </div>
                      <div className="inline-block flex-1 min-w-0">
                        <div className={`text-gray-800 text-[12px] ${!notification.viewed ? "font-bold" : "font-semibold"}`}>
                          {notification.title}
                        </div>
                        <div className="text-gray-600 text-[12px] truncate">
                          {notification.body.length > 100
                            ? notification.body.substring(0, 100) + "..."
                            : notification.body}
                        </div>
                        <div className="text-primary-dark text-[10px] flex justify-between mt-1">
                          <div>{parseDateTime(String(notification.createdAt)).time}</div>
                          <div>{parseDateTime(String(notification.createdAt)).date}</div>
                        </div>
                      </div>
                    </li>
                  </div>
                ))
          ) : (
            <li className="py-8 px-4 text-center text-gray-500">
              <div className="mb-2">
                <NotificationsIcon sx={{ fontSize: 40, opacity: 0.3 }} />
              </div>
              <p>No notifications to display</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

// Renamed from AffirmPay to NotificationDetail for clarity
const NotificationDetail = ({ notification }: { notification: INotification }) => {
  const { refetch } = useGetAllUsersNotificationQuery();
  const [markAsRead, { isLoading, isSuccess }] = useViewNotificationMutation();

  useEffect(() => {
    if (isSuccess) {
      successToast("Marked as read");
      refetch();
    }
  }, [isSuccess, refetch]);

  const heading = parseNotification(notification.body)["subject"];
  const body = parseNotification(notification.body)["jsonData"];
  const metaData = parseNotification(notification.body)["metaData"];
  
  async function submit() {
    await markAsRead(notification.id);
  }
  
  return (
    <div className="w-full rounded-[20px] shadow flex-col justify-center items-center gap-6 inline-flex p-4">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="flex justify-center align-middle text-center items-center">
          <div className="text-zinc-800 text-xl font-bold mb-2">
            {notification.title}
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 rounded-md border w-full bg-gray-50">
        <div className="justify-start items-center gap-3 block">
          {heading && (
            <div className="text-base font-medium text-gray-800 mb-2">
              {heading}
            </div>
          )}
          
          <div className="text-sm text-gray-700 mb-3">
            {typeof body === "string" ? (
              <div>{body}</div>
            ) : (
              <RenderHtml jsonData={body} />
            )}
          </div>
          
          {metaData && (
            <div className="text-xs text-gray-500 mt-2">
              {metaData}
            </div>
          )}
        </div>
      </div>
      
      <div className="text-xs text-gray-500 self-end">
        {parseDateTime(String(notification.createdAt)).date} {parseDateTime(String(notification.createdAt)).time}
      </div>
      
      {!notification.viewed && (
        <div className="flex justify-end w-full mt-2">
          <button
            onClick={submit}
            disabled={isLoading}
            className="custom-button btn-secondary flex items-center"
          >
            <span className="text-sm">Mark as read</span>
            <i className="custom_submerged_gray w-[28px] h-[28px] ml-2">
              {isLoading ? (
                <Loading transparent={true} size={20} />
              ) : (
                <Check className="h-5 w-5" strokeWidth={2} />
              )}
            </i>
          </button>
        </div>
      )}
    </div>
  );
};