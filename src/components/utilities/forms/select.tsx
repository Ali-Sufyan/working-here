/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { myIcons } from "../icons";
import { CancelPlainIcon, CheckIcon, ImportantIcon } from "../icons/util-icons";
import { capitalize, deleteFields, isImageURL, mergeCssClass } from "../utils";
import { filterInputProps } from "./fn";
import './index.css';
import { SelectInputI, SelectInputI2, SelectInputI3 } from "./input.interface";


export function SelectInput({ props }: { props: SelectInputI }) {
  const filterInput = filterInputProps<SelectInputI["inputType"]>(
    props.inputType
  );
  const { className, ...ff } = filterInput;

  const removeClassName = deleteFields(ff, ["value"]);

  // if (filterInput.className) delete removeClassName.className;
  const [focus, setFocus] = useState<boolean>(false);
  const handleFocus = (f: boolean) => {
    setFocus(f);
  };
  const [hover, setHover] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(
    String(props.inputType.value)
  );
  useEffect(() => {
    setValue(String(props.inputType.value));

  }, [props.inputType.value]);
  const handleHover = (f: boolean) => {
    setHover(f);
  };
  return (
    <div>
      <>
        <div className="pl-[16px] py-[8px]">
          <div className="flex flex-row relative left-[-20px]">
            <div
              className={mergeCssClass(
                "text-[12px]",
                props.err && props.showHelper ? "text-red-700 " : ""
              )}
            >
              {capitalize({ text: props.label })}
            </div>{" "}
            {removeClassName.required && (
              <div className="h-[16px] w-[16px] text-red-600">
                <ImportantIcon />
              </div>
            )}
          </div>

          <div className="relative">
            {props.prefix && (
              <div
                className={mergeCssClass(
                  "absolute left-[-19px] shadow-sm shadow-gray-500 active:shadow-primary  hover:shadow-primary  inset-y-0 flex  z-10 items-center rounded-l-xl p-[4px] bg-[var(--gray-0)]",
                  props.err && props.showHelper
                    ? " outline-none shadow-red-500"
                    : "focus:outline-none focus:ring-primary focus:border-primary focus:shadow-outline  border-r-0 ",
                  focus || hover
                    ? "shadow-[0px_1px_0px_0px_var(--primary),-1px_-1px_1px_0px_var(--primary)]"
                    : " border-r-0"
                )}
                onClick={() => {
                  if (props.prefix && props.prefix.click) props.prefix.click();
                }}
              >
                {props.prefix && props.prefix.element && props.prefix.element}
              </div>
            )}

            <div
              onFocus={() => handleFocus(true)}
              onBlur={() => handleFocus(false)}
              onMouseOver={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
              className={mergeCssClass(
                props.inputType.disabled
                  ? "bg-gray-200 text-gray-500 hover:border-gray-400 border-2  active:border-[var(--gray-1)]"
                  : "",
                props.err && props.showHelper
                  ? "outline-none shadow-[0.9px_1px_0px_0px_var(--error-light),-1px_-0px_1px_0px_var(--error-light)]"
                  : "",
                "select"
              )}
            >
              <motion.select
                {...removeClassName}
                value={value}
                className={mergeCssClass(className ?? "")}
                onMouseOver={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                {" "}
                <option selected disabled>
                  {props.placeholder}
                </option>
                {Object.entries(props.kv).map(([k, v], key) => (
                  <option className="" key={key} value={v}>
                    {String(k).toUpperCase()}
                  </option>
                ))}
              </motion.select>
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
            <div className="text-[12px] ">{props.helper}</div>
          </div>
        )}
        {props.showExtraInfo && (
          <div className={`flex flex-row text-[var(--primary-dark)]`}>
            {" "}
            <div className="h-[16px] w-[16px]">{props.extraInfoIcon}</div>{" "}
            <div className="text-[12px] ">{props.extraInfo}</div>
          </div>
        )}
      </>
    </div>
  );
}

export function SelectInput2({ props }: { props: SelectInputI2 }) {
  const filterInput = filterInputProps<SelectInputI2["inputType"]>(
    props.inputType
  );

  const { className, ...removeClassName } = filterInput;
  // if (filterInput.className) delete removeClassName.className;
  const [picked, setPicked] = useState<string | undefined>(
    String(props.inputType.value)
  );
  useEffect(() => {
    setPicked(String(props.inputType.value));
  }, [props.inputType.value]);
  return (
    <>
      {" "}
      <div>
        <>
          <div className=" py-[4px] ">
            <div className="flex flex-row relative    ">
              <div
                className={mergeCssClass(
                  props.err && props.showHelper ? "text-red-700 " : "",'text-[12px]',
                )}
              >
                {capitalize({ text: props.label })}
              </div>{" "}
              {removeClassName.required && (
                <div className="h-[16px] w-[24px] text-red-600">
                  <ImportantIcon />
                </div>
              )}
            </div>

            <div className="relative ">
              <div
                className={mergeCssClass(
                  props.inputType.disabled
                    ? "bg-gray-200 text-gray-500 hover:border-gray-400 border-2 my-1 active:border-[var(--gray-1)]"
                    : "",
                  props.err && props.showHelper ? " border-red-600" : "",
                  ""
                )}
              >
                <Grid
                  container
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  xs={12}
                  sm={12}
                  lg={12}
                  md={12}
                  xl={12}
                  className=""
                >
                  {Object.entries(props.kv).map(([k, v], key) => (
                    <Grid xs={12} sm={12} lg={4} md={6} xl={4} className="px-1">
                      <Paper
                        sx={{
                          height: 120,
                          borderRadius: 2,
                        }}
                        elevation={0}
                        className={mergeCssClass(
                          className,
                          "my-3   ",
                          picked && picked === v.value
                            ? "shadow-[1px_1px_2px_2px_var(--primary),-1px_-1px_0px_0px_var(--primary-lightest)] "
                            : "shadow-[1px_1px_0px_0px_var(--gray-3),-1px_-1px_0px_0px_var(--gray-3)]"
                        )}
                        key={key}
                        onClick={() => {
                          setPicked(v.value);
                          if(props.inputType.onChange){
                            props.inputType.onChange({ key: k, value: v });}
                        }}
                      >
                        <Box
                          sx={{
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "normal",
                            "& .icon": {
                              color: (theme) =>
                                theme.palette.mode === "dark"
                                  ? "inherit"
                                  : "#dc2440",
                            },
                          }}
                        >
                          {" "}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              px: 1,

                              my: 1,
                            }}
                          >
                            {" "}
                            <Box
                              sx={{
                                display: "flex",

                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "start",
                              }}
                            >
                              {" "}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "start",
                                  alignItems: "center",
                                }}
                              >
                                {" "}
                                <Box
                                  sx={{ fontWeight: "600" }}
                                  className="flex flex-row align-middle items-center sm:text-[12px] md:text-[12px] lg:text-12px] xl:text-[12px] 2xl:text-[12px]   text-[var(--dark-0)]"
                                >
                                  {props.prefix && (
                                    <div
                                      className={mergeCssClass(
                                        "  inset-y-0 flex  items-center rounded-l-xl p-[4px] ",
                                        props.err && props.showHelper
                                          ? " border-red-600"
                                          : "focus:outline-none focus:ring-primary focus:border-primary focus:shadow-outline  "
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
                                  <div className="capitalize text-primary-darkest">
                                    {k}
                                  </div>
                                </Box>
                              </Box>
                              <Box
                                color={""}
                                className="flex flex-row align-middle items-center"
                              >
                                <div className=" pl-2 text-[12px] font-[500] text-primary-darkest">
                                  {v.description}
                                </div>
                              </Box>
                            </Box>
                            <Box className="custom_submerged_gray p-[2px] min-w-[30px] max-h-[30px] max-w-[30px] min-h-[30px] ">
                              {picked && picked === v.value && (
                                <div className="text-primary w-10 h-10 flex flex-col items-center">
                                  <myIcons.IconTick />
                                </div>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
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
              <div className="text-[12px] ">{props.helper}</div>
            </div>
          )}
          {props.showExtraInfo && (
            <div className={`flex flex-row text-[var(--primary-dark)]`}>
              {" "}
              <div className="h-[16px] w-[16px]">
                {props.extraInfoIcon}
              </div>{" "}
              <div className="text-[12px] ">{props.extraInfo}</div>
            </div>
          )}
        </>
      </div>
    </>
  );
}




export function SelectInput3 ({ props }: { props: SelectInputI3 }) {
  const filterInput = filterInputProps<SelectInputI3["inputType"]>(
    props.inputType
  );
  const { className, ...ff } = filterInput;

  const removeClassName = deleteFields(ff, ["value"]);

  const [selectPlaceholder, setSelectPlaceholder] = useState<string>(
    props.placeholder
  );

  const [focus, setFocus] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [searchTerm, _setSearchTerm] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<
    { [key: string]: string }
  >(props.kv);
  const [value, setValue] = useState<string | undefined>(
    String(props.inputType.value)
  );

  useEffect(() => {
    setValue(String(props.inputType.value));
    setSelectPlaceholder(props.placeholder);
  }, [props.inputType.value, props.placeholder, value]);

  useEffect(() => {
    setFilteredOptions(
      Object.fromEntries(
        Object.entries(props.kv).filter(([key]) =>
          key.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm, props.kv]);

  const handleFocus = (f: boolean) => {
    setFocus(f);
  };

  const handleHover = (f: boolean) => {
    setHover(f);
  };
  function handleOpenSelect (d: boolean, val?: string) {
    if (val) setSelectPlaceholder(val)
    setOpenSelect(d)
  }
    return (
      <div>
        <div className="">
          <div className="flex flex-row relative left-[-24px]">
            <div
              className={mergeCssClass(
                "text-[12px]",
                props.err && props.showHelper ? "text-red-700 " : ""
              )}
            >
              {capitalize({ text: props.label })}
            </div>{" "}
            {removeClassName.required && (
              <div className="h-[16px] w-[16px] text-red-600">
                <ImportantIcon />
              </div>
            )}
          </div>

          <div className="relative">
            {props.prefix && (
              <div
                className={mergeCssClass(
                  "absolute left-[-19px] shadow-gray-500 active:shadow-primary  hover:shadow-primary  inset-y-0 flex  z-10 items-center rounded-l-xl p-[4px] bg-[var(--gray-0)]",
                  props.err && props.showHelper
                    ? " outline-none shadow-[0.9px_1px_0px_0px_var(--error-light),-1px_-0px_1px_0px_var(--error-light)]"
                    : "focus:outline-none focus:ring-primary focus:border-primary focus:shadow-outline  border-r-0 ",
                  focus || hover
                    ? "shadow-primary "
                    : " border-r-0"
                )}
                onClick={() => {
                  if (props.prefix && props.prefix.click) props.prefix.click();
                }}
              >
                {props.prefix && props.prefix.element && props.prefix.element}
              </div>
            )}
            <div
              onFocus={() => handleFocus(true)}
              onBlur={() => handleFocus(false)}
              onMouseOver={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
              onClick={() => {
                setOpenSelect(!openSelect);
              }}
              className={mergeCssClass(
                props.inputType.disabled
                  ? "bg-gray-200 text-gray-500 hover:border-gray-400 border-2  active:border-[var(--gray-1)]"
                  : "",
                props.err && props.showHelper
                  ? "outline-none shadow-[0.9px_1px_0px_0px_var(--error-light),-1px_-0px_1px_0px_var(--error-light)]"
                  : "",
                "select"
              )}
            >
              <div className="px-4 text-center mt-2">
                {value?? selectPlaceholder}
              </div>
            </div>{" "}
            {openSelect && (
              <Selectmodal
                selected={handleOpenSelect}
                children={
                  <SelectChildren
                    filteredOptions={filteredOptions}
                    click={({ key, value }) => {

                      setValue(key);
                      props.inputType.onChange &&
                        props.inputType.onChange({ key, value });
                    }}
                    closeSelect={handleOpenSelect}
                  />
                }
              />
            )}
          </div>
        </div>

        {props.showHelper && (
          <div
            className={`flex flex-row ${
              props.err ? "text-red-700 " : "text-green-700"
            }`}
          >
            <div className="h-[22px] w-[22px]">
              {props.err ? <CancelPlainIcon /> : <CheckIcon />}
            </div>
            <div className="text-[12px] ">{props.helper}</div>
          </div>
        )}
        {props.showExtraInfo && (
          <div className={`flex flex-row text-[var(--primary-dark)]`}>
            <div className="h-[16px] w-[16px]">{props.extraInfoIcon}</div>
            <div className="text-[12px] ">{props.extraInfo}</div>
          </div>
        )}
      </div>
    );
  

}






  const Selectmodal: React.FC<
    { children: JSX.Element, selected: (d: boolean) => void }
  > = ({ children, selected }) => {

    return (
      <>
        <div className=" custom-elevated-paper modal-container-x z-[100] h-[300px] overflow-y-scroll">
          <span className="close-icon-x" onClick={() => { selected(false) }}>
            &times;
          </span>{" "}
          <div className="overflow-auto">{children}</div>
        </div>
      </>
    );
  };


  const SelectChildren = ({ filteredOptions, click, closeSelect }: { filteredOptions: Record<string, any>, click?: ({ key, value }: { key: string, value: any }) => void, closeSelect: (d: boolean, val?: string) => void }) => {
  
    const [data, setData] = useState<Record<string, any>>(filteredOptions);

    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
      setData(filteredOptions);
    }, [filteredOptions]);

    function filtering (d: string) {
      setSearchTerm(d);
      const filtered = Object.fromEntries(
        Object.entries(filteredOptions).filter(([key, value]) => {
          const keyMatches = key.toLowerCase().includes(d.toLowerCase());
          const valueMatches = checkValueMatches(value, d);
          return keyMatches || valueMatches;
        })
      );
      setData(filtered);
    }

    function checkValueMatches (value: any, searchTerm: string): boolean {
      if (typeof value === "object" && value !== null) {
        return Object.values(value).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    }

  
    return (
      <div className="mt-12 flex flex-col place-items-center">
        <div className="px-6 w-full">
          <div className="relative  w-full ">
            <input
              name="filter_search"
              value={searchTerm}
              type="search"
              className="select-search"
              placeholder="  Search ..."
              aria-controls="users_table"
              spellCheck={false}
              data-ms-editor="true"
              onChange={(e) => {
                filtering(e.currentTarget.value);
              }}
            />

            <div className="absolute right-0 inset-y-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-3 text-gray-400 hover:text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center place-items-center">
          {Object.entries(data).map(([k, v], key) => (
            <>
              <div className="border-[0.5px] border-gray-50 w-[90%]"> </div>
              <div
                className="my-2 cursor-pointer rounded-md hover:bg-primary transition-all hover:text-white p-2  w-[90%] flex flex-row place-items-center justify-center "
                key={key}
                onClick={() => {
      

                  closeSelect(false, typeof v === "object" ? v.value : v);
                  click && click({ key: k, value: v })
                }}
              >
                {typeof v === "object" ? (
                  <div className="flex flex-row place-items-center justify-between">
                    {Object.entries(v).map(([_, v], ky) => {
                      return isImageURL(String(v)) ? (
                        <img
                          key={ky}
                          className="max-w-[24px] max-h-[24px]"
                          src="v"
                        />
                      ) : (
                        <div>{String(v)} </div>
                      );
                    })}
                  </div>
                ) : (
                  String(k).toUpperCase()
                )}
              </div>
            </>
          ))}
        </div>
      </div>
    );
  }

