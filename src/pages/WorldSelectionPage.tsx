import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";

import PublicIcon from "@mui/icons-material/Public";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { LinearProgress } from "@mui/material";

import { useWorlds } from "../hooks/useWorlds";

export default function WorldSelectionPage() {
  const navigate = useNavigate();

  const {
    worlds,
    loading,
    error,
  } = useWorlds();


  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography>
          Cargando mundos...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Card
          sx={{
            borderRadius: 4,
            background:
              "linear-gradient(90deg, #2563eb, #06b6d4)",
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
                gap: 2,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: "1.75rem", sm: "3rem" } }}
                >
                  Code Quest
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Explora mundos y aprende Python
                </Typography>
              </Box>

              <RocketLaunchIcon
                sx={{
                  fontSize: { xs: 44, sm: 70 },
                  opacity: 0.9,
                  flexShrink: 0,
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* TÍTULO */}
        <Box>
          <Typography variant="h5">
            Selecciona un mundo
          </Typography>

          <Typography color="text.secondary">
            Completa cada mundo para desbloquear nuevas
            habilidades.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {worlds.map((world) => {
            const completed =
              world.completed;

            const unlocked =
              world.unlocked;

            return (
              <Card
                key={world.id}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  boxShadow: 2,
                  transition: "all 0.2s ease",
                  opacity: unlocked ? 1 : 0.65,

                  "&:hover": {
                    transform: unlocked
                      ? "translateY(-4px)"
                      : "none",
                    boxShadow: unlocked ? 6 : 2,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent:
                        "space-between",
                      gap: { xs: 2, sm: 0 },
                      alignItems: { xs: "stretch", sm: "center" },
                    }}
                  >
                    {/* INFO */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                        minWidth: 0,
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          bgcolor: completed
                            ? "#dcfce7"
                            : "#dbeafe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PublicIcon
                          color={
                            completed
                              ? "success"
                              : "primary"
                          }
                        />
                      </Box>

                      <Box>
                        <Typography>
                          Mundo {world.id}
                        </Typography>

                        <Typography variant="subtitle1">
                          {world.name}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          {completed && (
                            <>
                              <CheckCircleIcon
                                color="success"
                                fontSize="small"
                              />

                              <Typography
                                variant="body2"
                                color="success.main"
                              >
                                Completado
                              </Typography>
                            </>
                          )}

                          {!completed &&
                            unlocked && (
                              <>
                                <LockOpenIcon
                                  color="primary"
                                  fontSize="small"
                                />

                                <Typography
                                  variant="body2"
                                  color="primary"
                                >
                                  Disponible
                                </Typography>
                              </>
                            )}

                          {!unlocked && (
                            <>
                              <LockIcon
                                color="disabled"
                                fontSize="small"
                              />

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Bloqueado
                              </Typography>
                            </>
                          )}
                        </Box>

                        <Typography
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          {world.description}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 1,
                          }}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={
                              world.missions_total > 0
                                ? (world.missions_completed /
                                    world.missions_total) *
                                  100
                                : 0
                            }
                            sx={{
                              width: 120,
                              height: 8,
                              borderRadius: 5,
                            }}
                          />

                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {world.missions_completed}/
                            {world.missions_total} misiones
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* BOTÓN */}
                    <Button
                      variant="contained"
                      disabled={!unlocked}
                      endIcon={
                        unlocked
                          ? <ArrowForwardIcon />
                          : <LockIcon />
                      }
                      onClick={() =>
                        navigate(
                          `/mission/${world.id}`
                        )
                      }
                      sx={{
                        alignSelf: { xs: "stretch", sm: "center" },
                      }}
                    >
                      {unlocked
                        ? "Entrar"
                        : "Bloqueado"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}