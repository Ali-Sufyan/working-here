import { useEffect } from "react";
import { useLazyGetSystemConfigQuery } from "../app/services/system/system.query";

export const usePrefetchHook = () => {
  const [systemSettings] = useLazyGetSystemConfigQuery();
  useEffect(() => {
    systemSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
