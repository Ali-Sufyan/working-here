import { FC, ReactNode, Suspense } from "react";
import Loading from "../components/utilities/styles/loading";

type Props = {
  children?: ReactNode;
};

const Lazy: FC<Props> = ({ children }) => {
  return (
    <Suspense
      fallback={<Loading fullscreen={true} context="lazy" transparent />}
    >
      {children}
    </Suspense>
  );
};

export const LazyIt = Lazy;
