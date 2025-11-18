/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import { myIcons } from "../icons";
import { CancelPlainIcon, CheckIcon, ImportantIcon } from "../icons/util-icons";
import { mergeCssClass } from "../utils";
import "./index.css";
import { InputI, InputTypeI } from "./input.interface";

export function Input({ props }: { props: InputI }) {

   

const [imageUrl, setImageUrl] = useState<string>("https://new.robyhub.com/public/assets/admin-module/img/media/upload-file.png");
  
  useEffect(() => { 
    if (props.inputType.imageUrl && props.inputType.imageUrl !== "") {
   setImageUrl(props.inputType.imageUrl)
    }
  }, [props.inputType.imageUrl]);

  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragging(true);

  };

  const handleDragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragging(false);

  };

  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragging(true);

   
  };

  const {
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    id,
    classN,
    required = false,
    pattern,
    minlength,
    maxlength,
    disabled,
    readonly,
    autofocus,
    autocomplete,
    form,
    list,
    min,
    max,
    step,
    accept,
    checked,
    multiple = false,
    label,
    labelFor,
    labelClass,
    labelStyle,
    labelPosition = "before",
    labelAlign = "left",
    labelWidth = "auto",
    labelColon = true,
    labelWrap = true,
    labelTooltip,
    labelTooltipPlacement = "top",
    labelDisabled = false,
    wrapperColon = true,
    wrapperClass,
    wrapperStyle,
    wrapperAlign = "left",
    wrapperWidth = "auto",
  } = props.inputType;
  // ... (previous code)

  const filterInputProps = (obj: InputTypeI): Partial<InputTypeI> => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_key, value]) => value !== undefined)
    );
  };
  const theProps: Omit<Partial<InputTypeI>, "onDrop"> = filterInputProps({
    type,
    value,
    onChange,

    name,
    id,
    required,
    pattern,
    minlength,
    maxlength,
    disabled,
    readonly,
    autofocus,
    autocomplete,
    form,
    list,
    min,
    max,
    placeholder,
    checked,
    step,
    accept,
    multiple,
    label,
    labelFor,
    labelClass,
    labelStyle,
    labelPosition,
    labelAlign,
    labelWidth,
    labelColon,
    labelWrap,
    labelTooltip,
    labelTooltipPlacement,
    labelDisabled,
    wrapperColon,
    wrapperClass,
    wrapperStyle,
    wrapperAlign,
    wrapperWidth,
  });

  // ... (rest of your code)

  const [focus, setFocus] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const handleFocus = (f: boolean) => {
    setFocus(f);
  };
  const handleHover = (f: boolean) => {
    setHover(f);
  };
  function InputType(
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
      | "week"
  ) {
    switch (type) {
      case "email":
      case "password":
      case "number":
      case "text":
      case "date": {
        return (
          <>
            <div className="pl-[20px] md:pl-[20px] lg:pl-[24px] xl:pl-[20px] py-[4px]">
              <div className="flex flex-row relative left-[-24px]">
                <div
                  className={mergeCssClass(
                    `text-[12px] capitalize pl-[-4px] `,
                    focus ? "text-primary-dark" : "",
                    props.err && props.showHelper ? "text-red-700 " : ""
                  )}
                >
                  {props.label}
                </div>{" "}
                {theProps.required && (
                  <div className="h-[16px] w-[16px] text-red-600">
                    <ImportantIcon />
                  </div>
                )}
              </div>

              <div className="relative">
                {props.prefix && (
                  <div
                    className={mergeCssClass(
                      "absolute  left-[-26px]   inset-y-0 flex   items-center rounded-l-xl p-[4px] bg-gray-100",
                      props.err && props.showHelper
                        ? " shadow-error shadow-sm"
                        : "focus:outline-none shadow-sm focus:shadow-primary   ",
                      focus || hover
                        ? "shadow-primary"
                        : "shadow-gray-500 border-r-0"
                    )}
                    onClick={() => {
                      if (props.prefix && props.prefix.click)
                        props.prefix.click();
                    }}
                  >
                    {props.prefix &&
                      props.prefix.element &&
                      props.prefix.element}
                  </div>
                )}
                <input
                  {...theProps}
                  onFocus={() => handleFocus(true)}
                  onMouseOver={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                  onBlur={() => handleFocus(false)}
                  className={mergeCssClass(
                    `appearance-none shadow-sm  shadow-gray-500 active:shadow-primary hover:shadow-primary  transition-colors rounded-lg rounded-l-none w-full py-3 px-2 text-gray-800 leading-tight `,
                    props.inputType.disabled
                      ? "bg-gray-200 text-gray-500 hover:border-gray-400  active:border-gray-400"
                      : "",
                    props.err && props.showHelper
                      ? "outline-none shadow-red-500"
                      : "focus:outline-none focus:shadow-primary  ",
                    classN ?? ""
                  )}
                />

                {props.suffix && (
                  <div
                    className={mergeCssClass(
                      "absolute  inset-y-0 flex right-0  items-center rounded-l-xl p-[4px]",
                 /*      props.err && props.showHelper
                        ? " shadow-[0.9px_1px_0px_0px_var(--error-light),-1px_-0px_1px_0px_var(--error-light)]"
                        : "focus:outline-none focus:shadow-[0.9px_1px_0px_0px_var(--primary),-1px_-0px_1px_0px_var(--primary)]  focus:shadow-[0.9px_1px_0px_0px_var(--primary),-1px_-0px_1px_0px_var(--primary)]-r-0 ",
                      focus || hover
                        ? "shadow-[0.9px_1px_0px_0px_var(--primary),-1px_-0px_1px_0px_var(--primary)]"
                        : "shadow-[0.9px_1px_0px_0px_var(--gray-3),-1px_-0px_1px_0px_var(--gray-3)] border-r-0"
                     */)}
                    onClick={
                      props.suffix && props.suffix.click && props.suffix.click
                    }
                  >
                    {props.suffix &&
                      props.suffix.element &&
                      props.suffix.element}
                  </div>
                )}
              </div>
            </div>

            {props.showHelper && (
              <div
                className={`flex flex-row " ${
                  props.err ? "text-red-700 " : "text-green-700"
                }`}
              >
                {" "}
                <div className="h-[16px] w-[16px]">
                  {props.err ? <CancelPlainIcon /> : <CheckIcon />}
                </div>{" "}
                <div className="text-[12px] ">{props.helper}</div>
              </div>
            )}
            {props.showExtraInfo && (
              <div className={`flex flex-row text-primary-dark`}>
                {" "}
                <div className="h-[16px] w-[16px]">
                  {props.extraInfoIcon}
                </div>{" "}
                <div className="text-[12px] ">{props.extraInfo}</div>
              </div>
            )}
          </>
        );
      }

      case "checkbox": {
        return (
          <>
            <div className="px-[28px] mt-10 ">
              <div className="shadow-sm flex flex-row align-top items-end justify-between           place-items-baseline py-[6px]  shadow-gray-300 active:shadow-primary hover:shadow-primary  transition-colors rounded-lg w-full  px-2 text-gray-800 leading-tight mt-7 ">
                <div className="flex flex-row ">
                  <div className="relative">
                    {" "}
                    {props.prefix && (
                      <div
                        className={mergeCssClass(
                          "absolute left-[-24px] lg:left-[-16px]  inset-y-0 flex   items-center rounded-l-xl p-[4px] bg-gray-500",
                          props.err && props.showHelper
                            ? " shadow-red-500"
                            : "focus:outline-none  focus:shadow-primary ",
                          focus || hover ? "shadow-primary" : "shadow-primary"
                        )}
                        onClick={() => {
                          if (props.prefix && props.prefix.click)
                            props.prefix.click();
                        }}
                      >
                        {props.prefix &&
                          props.prefix.element &&
                          props.prefix.element}
                      </div>
                    )}
                    <div className="text-[12px] capitalize px-1">
                      {props.label}
                    </div>
                  </div>{" "}
                  {theProps.required && (
                    <div className="h-[24px] w-[24px] text-red-600">
                      <ImportantIcon />
                    </div>
                  )}
                </div>

                <div className="relative h-[24px] w-[24px]">
                  <div className="flex items-center">
                    <input
                      {...theProps}
                      className={`
                      
                            peer relative h-5 w-5 cursor-pointer 
        appearance-none rounded-md border 
        border-gray-300 bg-white 
        transition-all duration-300 
        checked:border-primary checked:bg-primary 
        hover:border-primary hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-primary/50
                      `}
                    />{" "}
                    <svg
                      className="
        absolute pointer-events-none hidden 
        peer-checked:block 
        h-5 w-5 text-white
      "
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              {props.showHelper && (
                <div
                  className={`flex flex-row " ${
                    props.err ? "text-red-700 " : "text-green-700"
                  }`}
                >
                  {" "}
                  <div className="h-[22px] w-[22px]">
                    {props.err ? <CancelPlainIcon /> : <CheckIcon />}
                  </div>{" "}
                  <div className="text-[16px] ">{props.helper}</div>
                </div>
              )}
            </div>
          </>
        );
      }

      case "file": {
        return (
          <>
            <div className="pl-[4px] md:pl-[4px] lg:pl-[8px] xl:pl-[4px] py-[4px] flex flex-col  ">
              <div className="flex flex-row  ">
                <div
                  className={mergeCssClass(
                    `text-[12px] capitalize pl-[-4px]  `,
                    focus ? "text-primary-dark" : "",
                    props.err && props.showHelper ? "text-red-700 " : ""
                  )}
                >
          
                  {props.label}
                </div>{" "}
                {theProps.required && (
                  <div className="h-[16px] w-[16px] text-red-600">
                    <ImportantIcon />
                  </div>
                )}
              </div>

              <div className="">
                <div
                  className={mergeCssClass(
                    "upload-file",
                    dragging ? "dragging pool" : ""
                  )}
                  onDrop={props.inputType.onDrop}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onMouseLeave={() => setDragging(false)}
                >
                  <div
                    className={mergeCssClass(
                      dragging ? "water-drop" : ""
                    )}
                  ></div>
                  <div
                    className={mergeCssClass(dragging && "ripple" )}
                  ></div>
                  <input
                    type="file"
                    {...theProps}
                    className={mergeCssClass(
                      ` upload-file__input appearance-none  active:shadow-[0.9px_1px_0px_0px_var(--primary),-1px_-0px_1px_0px_var(--primary)]  hover:shadow-[0.9px_1px_0px_0px_var(--primary),-1px_-0px_1px_0px_var(--primary)] transition-colors  `,
                      props.inputType.disabled
                        ? "bg-gray-200 text-gray-500 hover:border-gray-400 border-2  active:border-gray-400"
                        : "",
                      props.err && props.showHelper
                        ? " border-red-600"
                        : "focus:outline-none focus:ring-primary focus:border-primary focus:shadow-outline",
                      classN ?? ""
                    )}
                    name="profile_image"
                  />
                  <div className="upload-file__img">
                    <img src={imageUrl} alt="" />
                  </div>
                  <span className="upload-file__edit">
                    <span className=" text-primary-dark h-6 w-6">
                      {<myIcons.Icon008Quill />}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {props.showHelper && (
              <div
                className={`flex flex-row " ${
                  props.err ? "text-red-700 " : "text-green-700"
                }`}
              >
                {" "}
                <div className="h-[22px] w-[22px]">
                  {props.err ? <CancelPlainIcon /> : <CheckIcon />}
                </div>{" "}
                <div className="text-[16px] ">{props.helper}</div>
              </div>
            )}
            {props.showExtraInfo && (
              <div className={`flex flex-row text-primary-dark`}>
                {" "}
                <div className="h-[22px] w-[22px]">
                  {props.extraInfoIcon}
                </div>{" "}
                <div className="text-[16px] ">{props.extraInfo}</div>
              </div>
            )}
          </>
        );
      }
      default:
        return <input {...theProps} />;
    }
  }

  return <>{InputType(theProps.type ?? "text")}</>;
}
