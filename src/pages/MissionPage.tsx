import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

import WorldComplete from "../components/WorldComplete";
import ProgressBar from "../components/ProgressBar";
import MissionHeader from "../components/MissionHeader";
import MissionEditor from "../components/MissionEditor";
import BadgeDialog from "../components/BadgeDialog";
import MissionScene from "../components/scenes/MissionScene";
import GatoByteAvatar from "../components/GatoByteAvatar";

import { useAuth } from "../context/AuthContext";
import { useMission } from "../hooks/useMission";
import { useWorldProgress } from "../hooks/useWorldProgress";
import { useHint } from "../hooks/useHint";
import type { Badge } from "../types";

export default function MissionPage() {
  const { worldId } = useParams();
  const navigate = useNavigate();
  const { clearProgress } = useAuth();

  const {
    mission,
    missions,
    currentIndex,
    code,
    setCode,
    result,
    missionCompleted,
    completedOutput,
    hintsUsed,
    points,
    level,
    submitting,
    executeMission,
    nextMission,
  } = useMission(worldId);

  const {
    worldCompleted,
  } = useWorldProgress(worldId);

  const {
    hint,
    hintSource,
    hintLevel,
    requestHint,
    loadHintState,
  } = useHint();

  const [badgesEarned, setBadgesEarned] = useState<Badge[]>([]);
  const [badgeDialogOpen, setBadgeDialogOpen] = useState(false);

  useEffect(() => {
    if (mission) {
      loadHintState(hintsUsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mission?.id]);

  if (!mission) {
    return <p>Cargando...</p>;
  }

  const handleRun = async () => {
    const response = await executeMission();

    if (response?.earned_badges?.length) {
      setBadgesEarned(response.earned_badges);
      setBadgeDialogOpen(true);
    }
  };

  const handleNext = () => {
    if (currentIndex === missions.length - 1) {
      return;
    }

    nextMission();
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          py: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Volver a mundos
          </Button>

          <Button
            color="error"
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={() => {
              clearProgress();
              window.location.reload();
            }}
          >
            Reset
          </Button>
        </Box>

        <MissionHeader points={points} level={level} />

        <MissionScene
          worldId={worldId!}
          missionId={mission.id}
          missionCompleted={missionCompleted}
          missionTitle={mission.title}
          expectedOutput={completedOutput}
        />

        {!worldCompleted && (
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <ProgressBar
                  index={currentIndex}
                  total={missions.length}
                />

                <Typography variant="h4">
                  {mission.title}
                </Typography>

                <Typography color="text.secondary">
                  {mission.description}
                </Typography>

                <MissionEditor
                  code={code}
                  setCode={setCode}
                  onRun={handleRun}
                  disabled={missionCompleted || submitting}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<LightbulbIcon />}
                    onClick={() =>
                      requestHint(mission.id, hintLevel, code)
                    }
                    disabled={hintLevel >= 3}
                  >
                    {hintLevel >= 3
                      ? "Ayudas agotadas"
                      : "Pedir ayuda"}
                  </Button>

                  {hintLevel > 0 && (
                    <Chip
                      color="warning"
                      label={`Ayuda ${hintLevel}/3`}
                    />
                  )}
                </Box>

                {hint && (
                  <Box
                    sx={{
                      position: "fixed",
                      right: 24,
                      bottom: 24,
                      zIndex: 1300,
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 1,
                      maxWidth: { xs: "80vw", sm: 380 },
                    }}
                  >
                    <Box sx={{ flexShrink: 0, mb: 2 }}>
                      <GatoByteAvatar size={84} />
                    </Box>

                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        position: "relative",
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "16px 16px 16px 4px",
                        boxShadow: 4,
                        p: 2,
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: -7,
                          bottom: 18,
                          width: 14,
                          height: 14,
                          bgcolor: "background.paper",
                          borderLeft: "1px solid",
                          borderBottom: "1px solid",
                          borderColor: "divider",
                          transform: "rotate(45deg)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          Gato Byte
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          · Ayuda {hintLevel} de 3
                          {hintSource === "openai"
                            ? " · IA"
                            : hintSource === "fallback"
                              ? " · Pista del juego"
                              : ""}
                        </Typography>
                      </Box>

                      <Typography variant="body2">{hint}</Typography>
                    </Box>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={handleRun}
                    disabled={missionCompleted || submitting}
                  >
                    {submitting ? "Validando..." : "Ejecutar"}
                  </Button>
                </Box>

                {missionCompleted &&
                  currentIndex < missions.length - 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        endIcon={<NavigateNextIcon />}
                        onClick={handleNext}
                      >
                        Siguiente misión
                      </Button>
                    </Box>
                  )}

                {result && (
                  <Alert
                    severity={
                      missionCompleted
                        ? "success"
                        : "info"
                    }
                  >
                    {result}
                  </Alert>
                )}

                {missionCompleted && (
                  <Chip
                    color="success"
                    label={`+${mission.points} puntos`}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        )}

        {worldCompleted && (
          <WorldComplete />
        )}
      </Box>

      <BadgeDialog
        badges={badgesEarned}
        open={badgeDialogOpen}
        onClose={() => setBadgeDialogOpen(false)}
      />
    </Container>
  );
}
