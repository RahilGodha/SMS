import { useNavigate } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Container, Typography ,Link} from "@mui/material";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import { LoginForm } from "../components/authentication/login";
import { Link as RouterLink } from "react-router-dom";
// ----------------------------------------------------------------------
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthentic = localStorage.getItem("userInfo");
  useEffect(() => {
    if (isAuthentic) {
      navigate("/dashboard/app", { replace: true });
    }
  }, [isAuthentic, navigate]);
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (isAuthenticated) {
      console.log("isAuthenticated", isAuthenticated)
      navigate("/dashboard/app", { replace: true });
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <RootStyle title="Login | SMS">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/register"
        >
          Get started
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi! Welcome Back
          </Typography>
          <img src="/static/icons/LOGO_in.jpeg" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to SMS
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Enter your details below.
            </Typography>
          </Stack>

          <LoginForm />
          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
