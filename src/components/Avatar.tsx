import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../context/auth/index";

const Avatar = (): JSX.Element => {
  const { user, logout } = useAuth();
  return (
    <Stack spacing={1} p={2} alignItems="center" textAlign="center">
      <Typography
        component="span"
        sx={{
          textTransform: "capitalize",
        }}
      >
        {user.nombre}
      </Typography>
      <Typography
        variant="caption"
        component="span"
        color="primary.main"
        sx={{
          width: "fit-content",
          borderRadius: "20px",
          padding: "2px 6px",
          border: "2px solid transparent",
          borderColor: "primary.main",
          textTransform: "uppercase",
          wordWrap: "wrap",
        }}
      >
        {user.rol}
      </Typography>
      <Button onClick={logout} variant="outlined" color="error">
        salir
      </Button>
    </Stack>
  );
};

export default Avatar;
