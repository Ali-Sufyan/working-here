import { resetAuthData } from "@/app/slices/branded/auth/auth-slices/auth.slice";
import { useAppDispatch } from "@/app/slices/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material"; // Changed from lucide-react to @mui/material

export function SignOutPage() {
  const { logout, isLoading } = useAuth0();
  const dispatch = useAppDispatch();
  const [showAnimation, setShowAnimation] = useState(true);
  
  // Minimum animation duration in milliseconds
  const minDuration = 1000;
  
  useEffect(() => {
    const startTime = Date.now();
    
    // Handle logout process
    const performLogout = () => {
      logout();
      dispatch(resetAuthData());
    };
    
    // Only proceed with logout after animation and minimum duration
    const handleLogoutWithTiming = () => {
      const elapsedTime = Date.now() - startTime;
      
      if (elapsedTime < minDuration) {
        // If minimum duration hasn't elapsed, wait for the remainder
        setTimeout(() => {
          setShowAnimation(false);
          performLogout();
        }, minDuration - elapsedTime);
      } else {
        // Minimum duration has passed
        setShowAnimation(false);
        performLogout();
      }
    };
    
    // If loading has completed, check timing
    if (!isLoading) {
      handleLogoutWithTiming();
    }
    
    // Cleanup function
    return () => {};
  }, [isLoading, logout, dispatch]);
  
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Logo Animation Container */}
      <Box
        sx={{
          width: "300px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Logo with animation */}
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 2]
            }}
            transition={{
              duration: 3,
              times: [0, 0.2, 0.8, 1],
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="/logoTransparent.svg" alt="RLOAD Logo" style={{ width: "100%", height: "auto" }} />
          </motion.div>
        )}
      </Box>
    </Box>
  );
}