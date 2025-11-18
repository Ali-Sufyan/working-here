import { DotWave, LineWobble, NewtonsCradle, Ring } from "@uiball/loaders";
import clsx from "clsx";
import { FC, memo, useEffect, useState } from "react";

import { colorScheme } from "../color-scheme";
import Button from "./buton";

interface Props {
  reload?: boolean;
  fullscreen?: boolean;
  context?: string;
  transparent?: boolean;
  color?: string; // colorScheme.primary_light | colorScheme.primary_dark | colorScheme.secondary_light | colorScheme.secondary_dark | colorScheme.error_light | colorScheme.error_dark | colorScheme.success_light | colorScheme.success_dark | colorScheme.

  className?: string;
  size?: number;
  type?: "dot" | "line" | "newton" | "ring";
  lineWeight?: number;
}

const Loading: FC<Props> = ({
  transparent = false,
  reload = false,
  fullscreen = false,
  context = "",
  color = colorScheme.primary_light,
  className = "",
  size = 40,
  type = "ring",
  lineWeight = 2,
}) => {
  const [reloadVisible, setReloadVisible] = useState(false);

  useEffect(() => {
    let inter = 0;
    if (window.AUTO_RELOAD) {
      inter = window.setTimeout(() => {
        location.reload();
      }, 5000);
    }
    return () => {
      window.AUTO_RELOAD = false;
      clearTimeout(inter);
    };
  }, []);

  useEffect(() => {
    let inter = 0;
    if (reload) {
      inter = window.setTimeout(() => {
        setReloadVisible(true);
      }, 30 * 1000);
    }
    return () => {
      clearTimeout(inter);
    };
  }, [reload]);
  function LoadingType() {
    switch (type) {
      case "dot":
        return (
          <DotWave size={fullscreen ? 100 : size} speed={2} color={color} />
        );
      case "line":
        return (
          <LineWobble
            size={fullscreen ? 100 : size}
            lineWeight={lineWeight}
            speed={2}
            color={color}
          />
        );
      case "newton":
        return (
          <NewtonsCradle
            size={fullscreen ? 100 : size}
            speed={2}
            color={color}

            
          />
        );
      default:
        return (
          <Ring
            size={fullscreen ? 100 : size}
            lineWeight={lineWeight}
            speed={2}
            color={color}
          ></Ring>
        );
    }
  }
  return (
    <div
      data-ctx={context}
      className={clsx(
        "  flex-center flex-col gap-4 ",
        transparent ? "" : "dark:bg-gray-800/80",
        fullscreen
          ? "flex w-screen h-screen backdrop-blur-[2px] absolute align-bottom justify-center items-center  "
          : "",
        className
      )}
    >
      {LoadingType()}
      {reload && (
        <Button
          className={clsx(`danger`, reloadVisible ? "visible" : "invisible")}
        >
          Reload
        </Button>
      )}
    </div>
  );
};

export default memo(Loading);
