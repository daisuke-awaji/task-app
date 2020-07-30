import React from "react";
import {
  Button,
  TextField,
  InputAdornment,
  makeStyles,
  Container,
  Box,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { MobileFriendly } from "@material-ui/icons";
import { Copyright } from "../components/Copyright";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../cognito/CognitoAuthProvider";
import { SignInIconWithText } from "../components/IconWithText";

type Inputs = {
  username: string;
  code: string;
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

export function ConfirmSignUpPage() {
  const classes = useStyles();

  const { handleSubmit, control, errors, setError } = useForm<Inputs>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { isAuthenticated, confirmSignUp, error, user } = useAuth();

  const history = useHistory();
  const location = useLocation();
  React.useEffect(() => {
    if (error) {
      setError("code", { message: error.message, type: error.name });
    }
    if (isAuthenticated) {
      const { from }: any = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
  }, [error, isAuthenticated, setError, location, history]);

  const onSubmit = async (data: Inputs) => {
    const result = await confirmSignUp({
      username: user,
      code: data.code,
    });
    if (result === "SUCCESS") history.push("/profile");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <SignInIconWithText text="Enter the verification code" />
        <form className={classes.form}>
          <Controller
            as={
              <TextField
                label="verification code"
                error={!!errors.code}
                variant="outlined"
                margin="normal" // or dense
                fullWidth
                required
                helperText={errors.code?.message || ""}
                autoComplete="current-code"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MobileFriendly />
                    </InputAdornment>
                  ),
                }}
              />
            }
            name="code"
            control={control}
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
                Verify
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
