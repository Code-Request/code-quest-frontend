import { AppBar, Box, Button, Chip, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import { useAuth } from "../context/AuthContext";
import PointCounter from "./PointCounter";

const Navbar = () => {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();

  if (!profile) {
    return null;
  }

  return (
    <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, #2563eb, #06b6d4)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <RocketLaunchIcon />

          <Typography variant="h6" component="div">
            Code Quest
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Mundos
          </Button>

          <Button color="inherit" onClick={() => navigate("/ranking")}>
            Ranking
          </Button>

          <Button color="inherit" onClick={() => navigate("/profile")}>
            Perfil
          </Button>

          <Chip
            color="warning"
            label={
              <>
                Nivel {profile.level} ·{" "}
                <PointCounter value={profile.points} /> pts
              </>
            }
          />

          <Typography sx={{ ml: 1 }}>{profile.username}</Typography>

          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Cambiar jugador
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
