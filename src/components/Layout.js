import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import college1 from "../assets/images/college1.jpg";

const Layout = ({ user, logout, children }) => {
  const linkStyle = {
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
    marginLeft: "12px",
  };
  return (
    <Box
      style={{
        height: "100vh",
        overflow: "hidden",
        background: `url(${college1})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        style={{
          height: "100%",
          overflow: "hidden",
          background: "rgb(0,0,0,0.6)",
        }}
      >
        <AppBar
          position="sticky"
          style={{
            background: "transparent",
            backgroundColor: "rgb(0,0,0,0.5)",
          }}
        >
          <Toolbar>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              College Info
            </div>
            <Box sx={{ flexGrow: 1 }} />

            {user ? (
              <>
                <Link to="/colleges" style={linkStyle}>
                  <Typography>Colleges</Typography>
                </Link>
                <Link to="/students" style={linkStyle}>
                  <Typography>Students</Typography>
                </Link>
                <Link to="/dashboard" style={linkStyle}>
                  <Typography>Dashboard</Typography>
                </Link>
                <Link to="/about" style={linkStyle}>
                  <Typography>About</Typography>
                </Link>

                <Typography
                  onClick={logout}
                  style={{ marginLeft: "12px", cursor: "pointer" }}
                >
                  Logout
                </Typography>
              </>
            ) : (
              <>
                <Link to="/about" style={linkStyle}>
                  <Typography>About</Typography>
                </Link>
                <Link to="/login" style={linkStyle}>
                  <Typography>Login</Typography>
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Box style={{ height: "calc(100vh - 64px)", overflow: "auto" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
