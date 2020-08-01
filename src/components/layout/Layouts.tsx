import React from "react";
import { Header } from "../Header";
import { Links } from "../../Links";
import { createStyles, makeStyles, Theme, Container } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: "20px",
      // backgroundColor: "#e1e4e8",
      // height: "100vh",
    },
  })
);

export const DashboardLayout = ({ children }: any) => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Header />

      <Container maxWidth="xl">
        <Links />
      </Container>

      <Container maxWidth="xl">
        <div className={classes.main}>{children}</div>
      </Container>
    </Container>
  );
};
export const NormalLayout = ({ children }: any) => (
  <Container maxWidth="lg">
    <Header />
    {children}
  </Container>
);
