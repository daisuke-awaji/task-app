import React, { useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  Link,
  CssBaseline,
  Avatar,
  makeStyles,
  Container,
  Grid,
  Box,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { Visibility, VisibilityOff, Person, VpnKey } from "@material-ui/icons";
import { toClickable } from "./toClickable";
import { Copyright } from "./Copyright";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../CognitoAuthProvider";

type Inputs = {
  username: string;
  password: string;
  submit: string;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleLogin: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

export function LoginPage() {
  const classes = useStyles();

  const { login } = useAuth();

  const [visiblePassword, setPasswordVisible] = useState(false);
  const handleClick = () => setPasswordVisible(!visiblePassword);

  const { handleSubmit, control, errors } = useForm<Inputs>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const history = useHistory();
  const location = useLocation();

  const onSubmit = (data: Inputs) => {
    login(data.username, data.password);
    const { from }: any = location.state || {
      from: { pathname: "/" },
    };
    history.replace(from);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VpnKey />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <Controller
              as={
                <TextField
                  label="ユーザ名"
                  error={!!errors.username}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  helperText={errors.username?.message || ""}
                  autoComplete="username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              }
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: "必須です。" }}
            />
            <Controller
              as={
                <TextField
                  label="パスワード"
                  error={!!errors.password}
                  variant="outlined"
                  margin="normal" // or dense
                  fullWidth
                  required
                  helperText={errors.password?.message || ""}
                  type={visiblePassword ? "default" : "password"}
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {visiblePassword
                          ? toClickable(VisibilityOff, handleClick)
                          : toClickable(Visibility, handleClick)}
                      </InputAdornment>
                    ),
                  }}
                />
              }
              name="password"
              control={control}
              // Reactのフォームコンポーネントは、
              // 割り当てられているStateの値がnullかundefinedになると、uncontrolledになってしまうので注意
              // https://github.com/react-hook-form/react-hook-form-website/issues/133
              defaultValue=""
              rules={{ required: "必須です。" }}
            />
            <Controller
              as={
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              }
              name="submit"
              control={control}
              defaultValue=""
              onClick={handleSubmit(onSubmit)}
            />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
