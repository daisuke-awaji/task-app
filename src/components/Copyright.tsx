import React from "react";
import { Typography, Link } from "@material-ui/core";
export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        tasks
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
