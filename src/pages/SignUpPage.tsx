import React, { useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  makeStyles,
  Container,
  Box,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { Visibility, VisibilityOff, Person, Email } from "@material-ui/icons";
import { toClickable } from "../components/toClickable";
import { Copyright } from "../components/Copyright";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../cognito/AuthContext";
import { SignInIconWithText } from "../components/IconWithText";

type Inputs = {
  username: string;
  email: string;
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignUpPage() {
  const classes = useStyles();

  const [visiblePassword, setPasswordVisible] = useState(false);
  const handleClick = () => setPasswordVisible(!visiblePassword);

  const { handleSubmit, control, errors, setError } = useForm<Inputs>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { isAuthenticated, signUp, error } = useAuth();

  const history = useHistory();
  const location = useLocation();
  React.useEffect(() => {
    if (error) {
      setError("username", { message: error.message, type: error.name });
      setError("email", { message: error.message, type: error.name });
      setError("password", { message: error.message, type: error.name });
    }
    if (isAuthenticated) {
      const { from }: any = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
  }, [error, isAuthenticated, setError, location, history]);

  const onSubmit = async (data: Inputs) => {
    const user = await signUp({
      username: data.username,
      password: data.password,
      attributes: {
        email: data.email,
      },
    });
    if (user) history.push("/confirm");
  };

  if (isAuthenticated) return null;
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <SignInIconWithText text="Sign Up" />
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
                label="メールアドレス"
                error={!!errors.email}
                variant="outlined"
                margin="normal" // or dense
                fullWidth
                required
                helperText={errors.email?.message || ""}
                type={visiblePassword ? "default" : "email"}
                autoComplete="current-email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            }
            name="email"
            control={control}
            // Reactのフォームコンポーネントは、
            // 割り当てられているStateの値がnullかundefinedになると、uncontrolledになってしまうので注意
            // https://github.com/react-hook-form/react-hook-form-website/issues/133
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
                Sign Up
              </Button>
            }
            name="submit"
            control={control}
            defaultValue=""
            onClick={handleSubmit(onSubmit)}
          />
        </form>{" "}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
