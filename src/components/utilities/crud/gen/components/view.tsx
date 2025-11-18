/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Typography } from "@mui/material";

import { ImageAvatar } from "../../../styles/image/imageAvatar";
import StyledToggle from "../../../styles/toggle";
import { convertDateFormat } from "../../../time-magic";
import {
  capitalize,
  parseNotification,
  RenderHtml,
  splitByUppercase,
} from "../../../utils";
import { crudFormT } from "../interface.gen";

export function ViewCrud({ data }: { data: crudFormT }) {
  const name = data.name.toLowerCase().trim();
  const fieldName = name.split(" ").join("-") + "-form";

  const field: Record<string, any> = {};
  const requiredField: Record<string, string> = {};

  data.headings.forEach((heading) => {
    if (heading.formType === "obj" && heading.child) {
      heading.child.forEach((el) => {
        const va = splitByUppercase(String(el.key)).join("-");
        field[String(el.key)] = `${fieldName}-${va}`;
        if (el.required) {
          requiredField[String(el.key)] = `${fieldName}-${va}`;
        }
      });
    } else {
      const val = splitByUppercase(String(heading.key)).join("-");
      field[String(heading.key)] = `${fieldName}-${val}`;
      if (heading.required) {
        requiredField[String(heading.key)] = `${fieldName}-${val}`;
      }
    }
  });

  return (
    <>
      {data.categories.map((category) => {
        return (
          <div className=" rounded-lg shadow-[1px_1px_0px_0px_hsla(280,70%,80%,0.2),-1px_-1px_0px_0px_hsla(280,70%,80%,0.09)] m-2 p-2">
            <Typography
              sx={{
                display: "flex",
                justifyContent: "start",
                placeItems: "flex-start",
                fontWeight: "500",
                fontSize: "16px",
              }}
              className=" sm:px-6 md:px-6 lg:px-8 xl:px-8 2xl:px-8 text-gray-500"
            >
              {capitalize({ text: category.name })}
            </Typography>
            <Grid
              container
              justifyContent="flex-start"
              alignItems="flex-start"
              xs={12}
              sm={12}
              lg={12}
              md={12}
              xl={12}
            >
              {data.headings
                .filter(
                  (head) =>
                    head.category === category.key && head.show !== false
                )
                .sort((a, b) => {
                  // Sort by isToggle, with true values coming first
                  if (a.isToggle && !b.isToggle) {
                    return -1; // true comes first
                  } else if (!a.isToggle && b.isToggle) {
                    return 1; // true comes first
                  } else {
                    return 0; // No change in order
                  }
                })
                .map((hd) => {
                  const isRawHtml = hd.isRawHtml ? hd.isRawHtml : false;
                  return (
                    <>
                      {hd.formType === "image" && (
                        <Grid
                          xs={6}
                          sm={12}
                          lg={4}
                          md={6}
                          xl={4}
                          className="flex flex-row sm:pl-2 xl:pl-8 2xl:8  lg:pl-8 align-middle items-center my-2"
                        >
                          <div
                            className={
                              "h-6 w-6 mx-1 text-[hsla(27,73%,70%,0.4)] "
                            }
                          >
                            {hd.prefixIcons}
                          </div>
                          <div>
                            {" "}
                            <ImageAvatar
                              height={40}
                              imageUrl={data.data[String(hd.key)]}
                              round={false}
                              showView={true}
                            />
                            <div className="flex flex-row align-bottom text-[12px] font-normal text-[var(--primary-dark)]">
                              {hd.name}
                            </div>
                          </div>
                        </Grid>
                      )}
                      {hd.isToggle && (
                        <Grid
                          xs={12}
                          sm={12}
                          lg={4}
                          md={6}
                          xl={4}
                          className="flex flex-row align-middle justify-between pl-2 items-start my-2  mx-1 py-2 rounded-lg border-2 "
                        >
                          {" "}
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "start",
                              placeItems: "center",
                              fontWeight: "500",
                              fontSize: "14px",
                            }}
                            className="px-8 text-[var(--primary-dark)]"
                          >
                            {hd.name}
                          </Typography>{" "}
                          <div className="">
                            <StyledToggle
                              checked={Boolean(data.data[String(hd.key)])}
                            />
                          </div>
                        </Grid>
                      )}
                      {hd.formType !== "image" &&
                        hd.formType !== "obj" &&
                        hd.formType !== "date" &&
                        !hd.isToggle && (
                          <Grid
                            xs={6}
                            sm={6}
                            lg={4}
                            md={6}
                            xl={4}
                            className="flex flex-row sm:pl-2 xl:pl-8 2xl:8  lg:pl-8 align-middle items-center my-2"
                          >
                            <div
                              className={
                                "h-6 w-6 mx-1 text-[hsla(27,73%,70%,0.4)] "
                              }
                            >
                              {hd.prefixIcons}
                            </div>
                            <div>
                              <div className="text-[14px] text-[var(--primary-darkest)]  font-semibold">
                                {" "}
                                {isRawHtml ? (
                                  <RenderHtml
                                    jsonData={parseNotification(
                                      String(data.data[String(hd.key)])
                                    )}
                                  />
                                ) : (
                                  capitalize({
                                    text: String(data.data[String(hd.key)]) ?? "",
                                  })
                                )}
                              </div>
                              <div className="flex flex-row align-bottom text-[12px] font-normal text-[var(--primary-dark)]">
                                <div>{hd.name}</div>
                              </div>{" "}
                            </div>
                          </Grid>
                        )}
                      {hd.formType === "date" && (
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          lg={4}
                          md={6}
                          xl={4}
                          className="flex flex-row sm:pl-2 xl:pl-8 2xl:8  lg:pl-8 align-middle items-center my-2"
                        >
                          <div
                            className={
                              "h-6 w-6 mx-1 text-[hsla(27,73%,70%,0.4)] "
                            }
                          >
                            {hd.prefixIcons}
                          </div>
                          <div>
                            <div className="text-[14px] text-[var(--primary-darkest)]  font-semibold">
                              {convertDateFormat(String(data.data[String(hd.key)]))}
                            </div>
                            <div className="flex flex-row align-bottom text-[12px] font-normal text-[var(--primary-dark)]">
                              <div>{hd.name}</div>
                            </div>{" "}
                          </div>
                        </Grid>
                      )}
                      {hd.formType === "obj" &&
                        hd.child &&
                        hd.child.map((ch) => {
                          return (
                            <>
                              {ch.formType === "image" && (
                                <Grid
                                  item
                                  xs={6}
                                  sm={6}
                                  lg={4}
                                  md={6}
                                  xl={4}
                                  className="pl-8 flex flex-col align-middle items-middle my-2"
                                >
                                  <ImageAvatar
                                    height={30}
                                    imageUrl={data.data[String(hd.key)][ch.key]}
                                    round={false}
                                    showView={true}
                                  />
                                  <div className="flex flex-row  align-bottom text-[14px] text-[var(--primary-dark)]">
                                    <div className={"h-5 w-5 mr-1 "}>
                                      {ch.prefixIcons}
                                    </div>
                                    <div>{ch.name}</div>
                                  </div>
                                </Grid>
                              )}
                              {ch.isToggle && (
                                <Grid
                                  xs={12}
                                  sm={12}
                                  lg={4}
                                  md={6}
                                  xl={4}
                                  className="flex flex-row align-middle justify-between pl-2 items-start my-2  mx-1 py-2 rounded-lg border-2"
                                >
                                  {" "}
                                  <Typography
                                    sx={{
                                      display: "flex",
                                      justifyContent: "start",
                                      placeItems: "center",
                                      fontWeight: "500",
                                      fontSize: "20px",
                                    }}
                                    className="px-8 text-[var(--primary-dark)]"
                                  >
                                    {ch.name}
                                  </Typography>{" "}
                                  <div className="">
                                    <StyledToggle
                                      checked={Boolean(
                                        data.data[String(hd.key)][ch.key]
                                      )}
                                    />
                                  </div>
                                </Grid>
                              )}
                              {ch.formType !== "image" &&
                                ch.formType !== "obj" &&
                                ch.formType !== "date" &&
                                !ch.isToggle && (
                                  <Grid
                                    item
                                    xs={6}
                                    sm={6}
                                    lg={4}
                                    md={6}
                                    xl={4}
                                    className="flex flex-row pl-8 align-middle items-center my-2"
                                  >
                                    <div
                                      className={
                                        "h-6 w-6 mx-1 text-[hsla(27,73%,70%,0.4)] "
                                      }
                                    >
                                      {ch.prefixIcons}
                                    </div>
                                    <div>
                                      <div className="text-[14px] text-[var(--primary-darkest)]  font-semibold">
                                        {ch.isRawHtml ? (
                                          <RenderHtml
                                            jsonData={
                                              parseNotification(
                                                String(
                                                  data.data[String(hd.key)][ch.key]
                                                )
                                              )["jsonData"]
                                            }
                                            metaData={
                                              parseNotification(
                                                String(
                                                  data.data[String(hd.key)][ch.key]
                                                )
                                              )["metaData"]
                                            }
                                            subject={
                                              parseNotification(
                                                String(
                                                  data.data[String(hd.key)][ch.key]
                                                )
                                              )["subject"]
                                            }
                                          />
                                        ) : (
                                          capitalize({
                                            text:
                                              String(
                                                data.data[String(hd.key)][ch.key]
                                              ) ?? "",
                                          })
                                        )}
                                      </div>
                                      <div className="flex flex-row align-bottom text-[12px] font-normal text-[var(--primary-dark)]">
                                        <div>{ch.name}</div>
                                      </div>{" "}
                                    </div>
                                  </Grid>
                                )}
                              {ch.formType === "date" && (
                                <Grid
                                  xs={6}
                                  sm={6}
                                  lg={4}
                                  md={6}
                                  xl={4}
                                  className="flex flex-col pl-2 align-middle items-start my-2"
                                >
                                  <div
                                    className={
                                      "h-6 w-6 mx-1 text-[hsla(27,73%,70%,0.4)] "
                                    }
                                  >
                                    {ch.prefixIcons}
                                  </div>
                                  <div>
                                    <div className="text-[14px] text-[var(--primary-darkest)]  font-semibold">
                                      {convertDateFormat(
                                        String(data.data[String(hd.key)][ch.key])
                                      )}
                                    </div>
                                    <div className="flex flex-row align-bottom text-[12px] font-normal text-[var(--primary-dark)]">
                                      <div>{ch.name}</div>
                                    </div>{" "}
                                  </div>
                                </Grid>
                              )}
                            </>
                          );
                        })}
                    </>
                  );
                })}
            </Grid>
            <div className="p-4 "></div>
          </div>
        );
      })}
    </>
  );
}



