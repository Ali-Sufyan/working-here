import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Loading from "@/components/utilities/styles/loading";

export default function Auth0ReadyProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, user, error } = useAuth0();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log("🧠 Auth0 Ready:", { isLoading, isAuthenticated, user, error });
    if (!isLoading && (isAuthenticated || !error)) {
      // small debounce to ensure auth0 context stabilizes
      const t = setTimeout(() => setReady(true), 150);
      return () => clearTimeout(t);
    } else {
      setReady(false);
    }
  }, [isLoading, isAuthenticated, user, error]);

  if (!ready) return <Loading fullscreen transparent />;
  return <>{children}</>;
}
