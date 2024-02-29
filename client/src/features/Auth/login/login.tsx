import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/store";
import { loginIn } from "../authSlice";

const defaultTheme = createTheme();

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const dispatch = useAppDispatch();
  const submit = async (data: FieldValues) => {
    const user = await dispatch(loginIn(data));
    reset();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "info" }}>
            <LockOutlinedIcon color="inherit" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              fullWidth
              margin="normal"
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register("username", {
                required: "Username is required",
              })}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is requierd",
              })}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="inherit"
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
