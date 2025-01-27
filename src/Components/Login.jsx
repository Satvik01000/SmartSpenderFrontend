import { Box, Button, Card, Container, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import Logo from "../util/Logo.png"; // Import the logo
import SignUp from "./SignUp";
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Login = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              p: 5,
              width: "50vw",
              maxWidth: "50vw",
              borderRadius: 7,
              backgroundColor: "black",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", alignSelf: "flex-start", mb: 3}}>
              <img src={Logo} alt="Logo" style={{ width: 90, height: 80, marginRight: 8 }} />
              <Typography variant="h3" sx={{mt:3, fontFamily:"Quicksand"}}>Login and Spend Smart</Typography>
            </Box>
            <TextField
              variant="outlined"
              required
              autoComplete="username"
              id="username"
              name="username"
              label="Username"
              autoFocus
              fullWidth
              sx={{ mb: 3, mt: 3, fontFamily:"Comic Sans Ms" }}
            />
            <TextField
              variant="outlined"
              required
              autoComplete="password"
              id="password"
              name="password"
              label="Password"
              autoFocus
              fullWidth
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              color="white"
              sx={{
                backgroundColor: "#0187e6",
                '&:hover': { backgroundColor: "#0099cc" },
                maxWidth: "70%",
                width: "40vh",
              }}
            >
              Sign In
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don't have an account? <a href="./SignUp.jsx" style={{ color: '#0187e6' }}>Sign Up</a>
            </Typography>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;