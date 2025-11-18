import { motion } from "framer-motion";
import { useState } from "react";
import { mergeCssClass, SwipeableComponent } from "../utils";
import { TabsI } from "./interface";

export function Tabs({ tabs }: { tabs: TabsI[] }) {
  const [t, setT] = useState(0); // Initialize t with 0

  return (
    <div className="mt-12">
      <div className="flex bg-[var(--gray-00)]">
        {tabs.map((tab, index) => {
          return (
            <motion.div
              onClick={() => {
                setT(tab.index); // Adjust index to make it zero-based
              }}
              key={index}
              className={mergeCssClass(
                "flex p-2 cursor-pointer",
                t === index
                  ? " text-[var(--primary)] font-semibold border-b-2  border-[var(--primary)] "
                  : "text-zinc-400 font-normal"
              )}
            >
              <div
                className={mergeCssClass(
                  "flex",
                  t === index
                    ? " text-[var(--primary)] capitalize font-bold"
                    : "text-gray-400 font-normal"
                )}
              >
                <i className="submerged_button w-6 h-6 flex flex-col items-center justify-center align-middle  mx-1 ">
                  {" "}
                  <div className="h-4 w-4 mr-2">{tab.icon}</div>
                </i>
                <div
                  className={mergeCssClass(
                    t === index
                      ? " capitalize font-bold"
                      : "text-gray-400 font-normal"
                  )}
                >
                  {tab.title}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        return (
          t === tab.index && (
            <SwipeableComponent
              key={index}
              onSwipeLeft={() => {
                //console.log("left");
                if (t === 0) return;
                else setT(t - 1);
              }}
              onSwipeRight={() => {
                //console.log("right");
                if (t === tabs.length - 1) return;
                else setT(t + 1);
              }}
            >
              {<div>{tab.component}</div>}
            </SwipeableComponent>
          )
        );
      })}
    </div>
  );
}
