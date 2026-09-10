import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import { useAuth } from "../context/AuthContext";
import PointCounter from "./PointCounter";

const Navbar = () => {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!profile) {
    return null;
  }

  const go = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, #2563eb, #06b6d4)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <RocketLaunchIcon />

          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
          >
            Code Quest
          </Typography>
        </Box>

        {/* Navegación en escritorio */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
          <Button color="inherit" onClick={() => go("/")}>
            Mundos
          </Button>

          <Button color="inherit" onClick={() => go("/ranking")}>
            Ranking
          </Button>

          <Button color="inherit" onClick={() => go("/profile")}>
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

        {/* Botón de menú en móvil */}
        <IconButton
          color="inherit"
          aria-label="Abrir menú"
          edge="end"
          onClick={() => setMenuOpen(true)}
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Menú lateral para móvil */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        <Box sx={{ width: 260, py: 2 }}>
          <Box sx={{ px: 2, mb: 1 }}>
            <Typography variant="h6">Code Quest</Typography>

            <Typography variant="body2" color="text.secondary">
              {profile.username} · Nivel {profile.level} ·{" "}
              <PointCounter value={profile.points} /> pts
            </Typography>
          </Box>

          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => go("/")}>
                <ListItemText primary="Mundos" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => go("/ranking")}>
                <ListItemText primary="Ranking" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => go("/profile")}>
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          <Box sx={{ px: 2, pt: 1 }}>
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
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
