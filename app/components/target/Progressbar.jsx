"use client";
import React, { useState } from "react";
import { Box, LinearProgress, Tooltip, Typography } from "@mui/material";

export const ProgressBar = ({ current, optimal, lack, progress }) => {
  const [hover, setHover] = useState(false);


  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Tooltip
          title={
            <Box>
              <Typography variant="body2">
                Progreso: {progress?.toFixed(2)}%
              </Typography>
              <Typography variant="body2">
                Resultado obtenido: {current?.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Resultado esperado: {optimal?.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Falta: {lack?.toFixed(2)}
              </Typography>
            </Box>
          }
          arrow
          open={hover}
        >
          <LinearProgress
            variant="determinate"
            value={progress >= 100 ? 100 : progress}
            sx={{
              height: 20,
              borderRadius: 5,
              width: "100%",
              cursor: "pointer",
              bgcolor: "grey.300",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#A5C1CF", 
              },
            }}
          />
        </Tooltip>
      </Box>
    </Box>
  );
};
