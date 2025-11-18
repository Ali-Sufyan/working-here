import { useAuth0 } from "@auth0/auth0-react";
import { SVGProps, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../app/slices/hooks";
import ArrowRight from "../../../../assets/icons/arrow.right.svg";
import Info from "../../../../assets/icons/info.svg";
import User from "../../../../assets/icons/user.svg";
import { colorScheme } from "../../../utilities/color-scheme";
import Loading from "../../../utilities/styles/loading";
import {
  capitalize,
  clearLocalUserData,
  getInitialsAvatar,
} from "../../../utilities/utils";

export default function ProfileDropDown() {
  const [menuActive, setMenuActive] = useState(false);
  const selector = useAppSelector((state) => state.auth.user);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstname = capitalize({ text: selector?.given_name ?? "John" });
  const lastname = capitalize({ text: selector?.family_name ?? "Doe" });
  const { logout, isLoading } = useAuth0();
  const navigate = useNavigate();

  async function logOut() {
    logout({});
    return;
  }

  const profile: {
    name: string | JSX.Element;
    icon: SVGProps<SVGSVGElement>;
    click: () => void;
  }[] = [
    {
      name: "My Profile",
      icon: User,
      click() {
        navigate("/settings");
      },
    },
    {
      name: "Help",
      icon: Info,
      click() {},
    },
    {
      name: isLoading ? (
        <Loading size={20} transparent={true} type={"line"} />
      ) : (
        "Logout"
      ),
      icon: ArrowRight,
      async click() {
        await logOut();
        clearLocalUserData();
        window.location.reload();
      },
    },
  ];

  const menuToggle = () => setMenuActive((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-8">
      <div
        className="profile cursor-pointer"
        onClick={menuToggle}
        aria-label="Toggle Profile Menu"
      >
        <img
          src={
            selector?.picture
              ? selector?.picture
              : getInitialsAvatar({
                  initials: `${firstname[0]}${lastname[0]}`,
                  size: 32,
                  initial_size: 20,
                  background: colorScheme.gray_0,
                  foreground: colorScheme.accent_1,
                })
          }
          alt="Avatar"
          height={32}
          width={32}
          className="rounded-full border border-gray-300 hover:shadow-md transition-all"
        />
      </div>

      <div
        ref={menuRef}
        className={`menu ${
          menuActive ? "block" : "hidden"
        } absolute bg-white shadow-lg rounded-md mt-2 right-0 min-w-[200px] z-10`}
      >
        <h5 className="text-center text-gray-700 font-semibold py-3 border-b border-gray-200">
          {`${firstname} ${lastname}`}
        </h5>
        <ul className="flex flex-col">
          {profile.map((v, k) => (
            <li
              key={k}
              onClick={v.click}
              className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 transition-all"
            >
              <img
                src={v.icon as string}
                alt={v.name as string}
                className="w-5 h-5 mr-3 opacity-70 hover:opacity-100 transition-all"
              />
              <span className="text-gray-800 font-medium">{v.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
