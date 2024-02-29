import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import agent from "../../../api/agent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  function handleApiErrors(errors: any) {
    console.log(errors);
    if (errors && Array.isArray(errors)) {
      errors.forEach((error: string, index: number) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }
  const navigate = useNavigate();
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit((data) =>
              agent.Auth.register(data)
                .then(() => {
                  navigate("/login");
                  toast.success("Registration successful - you can now login");
                })
                .catch((error) => handleApiErrors(error))
            )}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  error={!!errors.username}
                  helperText={errors?.username?.message as string}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  {...register("lokacija", {
                    required: "Location is required",
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  {...register("email", {
                    required: "Email is required",

                    pattern: {
                      value:
                        /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                      message: "Not a valid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors?.email?.message as string}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is requierd",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                      message: "Password does not meet complexity requirements",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors?.password?.message as string}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="inherit"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
