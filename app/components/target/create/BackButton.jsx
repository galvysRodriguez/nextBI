import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CustomBackButton = ({
  onClick,
  iconSize = "2.2rem", // Tamaño personalizado del ícono
}) => {
  return (
    <Button
      onClick={onClick} // Función que se ejecuta al hacer clic
      variant="contained" // Estilo del botón
      size="small" // Tamaño del botón (puedes ajustar según tu preferencia)
      sx={{
        width: "4rem", // Ancho fijo del botón para que sea cuadrado
        height: "4rem", // Alto fijo del botón
        minWidth: "unset", // Evita que Material-UI aplique un ancho mínimo
        padding: "0", // Sin relleno extra
        backgroundColor: "#93989D", // Color de fondo
        borderRadius: "50%", // Botón circular
        display: "flex", // Activa Flexbox
        justifyContent: "center", // Centra horizontalmente
        alignItems: "center", // Centra verticalmente
        "&:hover": {
          backgroundColor: "#115293", // Color al pasar el cursor
        },
      }}
    >
      {/* Ícono personalizado */}
      <ArrowBackIcon sx={{ fontSize: iconSize }} />
    </Button>
  );
};

export default CustomBackButton;
