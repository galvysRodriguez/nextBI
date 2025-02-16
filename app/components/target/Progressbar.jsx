"use client";
import React, { useState } from "react";
import { Box, LinearProgress, Tooltip, Typography } from "@mui/material";

export const ProgressBar = ({ current, target }) => {
  const [hover, setHover] = useState(false);

  // Asegúrate de que target sea mayor a 0 para evitar división por 0
  const validTarget = target > 0 ? target : 1; // Usar 1 en caso de que target sea 0 o negativo
  const percentage = Math.min((current / validTarget) * 100, 100); // Calcula el porcentaje
  const remaining = validTarget - current; // Calcula lo que falta

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
                Progreso: {percentage?.toFixed(2)}%
              </Typography>
              <Typography variant="body2">
                Monto actual: ${current?.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Meta: ${validTarget?.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Falta: ${remaining > 0 ? remaining?.toLocaleString() : 0}
              </Typography>
            </Box>
          }
          arrow
          open={hover}
        >
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 20,
              borderRadius: 5,
              width: "100%",
              cursor: "pointer",
              bgcolor: "grey.300", // Cambia el fondo (área no completada)
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#A5C1CF", // Cambia el color de la barra de progreso
              },
            }}
          />
        </Tooltip>
      </Box>
    </Box>
  );
};
