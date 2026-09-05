import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import BadgeIcon from "../components/BadgeIcon";
import PointCounter from "../components/PointCounter";
import { useAuth } from "../context/AuthContext";

const POINTS_PER_LEVEL = 100;

export default function ProfilePage() {
  const { profile } = useAuth();

  if (!profile) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  const xpProgress = (profile.points_in_level / POINTS_PER_LEVEL) * 100;

  const earnedBadges = profile.badges.filter((badge) => badge.earned);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Card
          sx={{
            borderRadius: 4,
            background: "linear-gradient(90deg, #2563eb, #06b6d4)",
            color: "white",
            boxShadow: 6,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h4">{profile.username}</Typography>

                <Typography variant="h6">
                  Nivel {profile.level}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <Chip
                    sx={{ color: "white", borderColor: "white" }}
                    variant="outlined"
                    label={
                      <>
                        <PointCounter value={profile.points} /> puntos
                      </>
                    }
                  />

                  <Chip
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                    label={`${profile.missions_completed} misiones`}
                  />
                </Box>
              </Box>

              <RocketLaunchIcon sx={{ fontSize: 70, opacity: 0.9 }} />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography variant="body2">
                  Progreso al nivel {profile.level + 1}
                </Typography>

                <Typography variant="body2">
                  {profile.points_in_level} / {POINTS_PER_LEVEL} XP
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={xpProgress}
                sx={{
                  height: 12,
                  borderRadius: 5,
                  bgcolor: "rgba(255,255,255,0.3)",
                }}
              />
            </Box>
          </CardContent>
        </Card>

        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Logros
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {earnedBadges.length} de {profile.badges.length} desbloqueados
          </Typography>

          <Grid container spacing={2}>
            {profile.badges.map((badge) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={badge.key}>
                <Card
                  sx={{
                    borderRadius: 3,
                    opacity: badge.earned ? 1 : 0.55,
                    border: badge.earned
                      ? "1px solid #facc15"
                      : "1px solid #e2e8f0",
                    background: badge.earned ? "#fefce8" : undefined,
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 1,
                      }}
                    >
                      <BadgeIcon
                        icon={badge.icon}
                        earned={badge.earned}
                        sx={{ fontSize: 40 }}
                      />
                    </Box>

                    <Typography sx={{ fontWeight: 600 }}>
                      {badge.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {badge.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
