import { LoginOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const { register, watch } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const login = watch("login");
  const password = watch("password");

  const myCredentials = {
    email: login,
    password: password,
  };

  const authenticateUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      await auth.authenticate(credentials.email, credentials.password);
      if (!credentials) {
        return console.log("Forneça um usuário e senha");
      }

      navigate("/");
    } catch (err) {
      console.log("invalid email or password");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <Grid item xs={3}>
        <Container>
          <FormControl fullWidth margin="dense" sx={{ marginBottom: 1 }}>
            <Typography variant="h5" textAlign="center" color="GrayText">
              Login
            </Typography>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <TextField
              autoComplete="username"
              placeholder="Digite o seu usuário"
              {...register("login")}
            />
          </FormControl>
          <FormControl fullWidth margin="dense" sx={{ marginBottom: 3 }}>
            <TextField
              type="password"
              autoComplete="current-password"
              placeholder="Digite a sua senha"
              {...register("password")}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => authenticateUser(myCredentials)}
              endIcon={<LoginOutlined />}
            >
              Entrar
            </Button>
          </FormControl>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Login;
