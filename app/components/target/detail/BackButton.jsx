import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const CustomBackButton = ({
  iconSize = "2rem", 
}) => {
    const router = useRouter();

  const handleClick = () => {
    router.back(); 
  };
  return (
    <Button
      onClick={handleClick} 
      variant="contained" 
      size="small" 
      sx={{
        width: "3rem", 
        height: "3rem",
        minWidth: "unset", 
        padding: "0", 
        backgroundColor: "#93989D",
        borderRadius: "50%", 
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        "&:hover": {
          backgroundColor: "#115293", 
        },
      }}
    >
      <ArrowBackIcon sx={{ fontSize: iconSize }} />
    </Button>
  );
};

export default CustomBackButton;