import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SignIn() {
  const { loginWithRedirect } = useAuth0();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  
  // Animation timing
  const animationDuration = 3; // seconds
  
  useEffect(() => {
    // Start login redirect after animation completes
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, animationDuration * 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Only redirect after animation is complete
    if (isAnimationComplete) {
      loginWithRedirect();
    }
  }, [isAnimationComplete, loginWithRedirect]);

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
        {/* First Logo - Fade in and scale up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0.8, 1, 1, 2] 
          }}
          transition={{ 
            duration: animationDuration, 
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
      </Box>
    </Box>
  );
}