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
  IconButton,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CloseIcon from "@mui/icons-material/Close";

import WorldComplete from "../components/WorldComplete";
import ProgressBar from "../components/ProgressBar";
import MissionHeader from "../components/MissionHeader";
import MissionEditor from "../components/MissionEditor";
import BadgeDialog from "../components/BadgeDialog";
import MissionScene from "../components/scenes/MissionScene";
import GatoByteAvatar from "../components/GatoByteAvatar";

import { useMission } from "../hooks/useMission";
import { useWorldProgress } from "../hooks/useWorldProgress";
import { useHint } from "../hooks/useHint";
import type { Badge } from "../types";

export default function MissionPage() {
  const { worldId } = useParams();
  const navigate = useNavigate();

  const {
    mission,
    missions,
    currentIndex,
    code,
    setCode,
    result,
    resultType,
    missionCompleted,
    completedOutput,
    hintsUsed,
    points,
    level,
    submitting,
    executeMission,
    nextMission,
    skipMission,
  } = useMission(worldId);

  const {
    worldCompleted,
  } = useWorldProgress(worldId);

  const {
    hint,
    hintSource,
    hintLevel,
    loading: hintLoading,
    requestHint,
    loadHintState,
  } = useHint();

  const [badgesEarned, setBadgesEarned] = useState<Badge[]>([]);
  const [badgeDialogOpen, setBadgeDialogOpen] = useState(false);
  const [hintCollapsed, setHintCollapsed] = useState(false);
  const [prevHint, setPrevHint] = useState<string | null>(null);

  if (prevHint !== hint) {
    setPrevHint(hint);
    setHintCollapsed(false);
  }

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

  const handleSkip = () => {
    skipMission();
  };

  return (
    <Container maxWidth="md">
<Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            py: { xs: 2, sm: 4 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                startIcon={<ArrowBackIcon />}
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{ whiteSpace: "nowrap" }}
              >
                Volver a mundos
              </Button>
            </Box>
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
                    gap: 3,
                  }}
                >
                  <ProgressBar
                    index={currentIndex}
                    total={missions.length}
                  />

                  <Typography
                    variant="h4"
                    sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
                  >
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
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", sm: "center" },
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<LightbulbIcon />}
                    onClick={() =>
                      requestHint(mission.id, hintLevel, code)
                    }
                    disabled={hintLevel >= 3 || hintLoading || submitting}
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                  >
                    {hintLoading
                      ? "Consultando a Gato Byte..."
                      : hintLevel >= 3
                        ? "Ayudas agotadas"
                        : "Pedir ayuda"}
                  </Button>

                  {hintLevel > 0 && (
                    <Chip
                      color="warning"
                      label={`Ayuda ${hintLevel}/3`}
                      sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }}
                    />
                  )}
                </Box>

                {hint && (
                  <Box
                    sx={{
                      position: "fixed",
                      right: { xs: 12, sm: 24 },
                      bottom: { xs: 12, sm: 24 },
                      zIndex: 1300,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 1,
                    }}
                  >
                    {!hintCollapsed && (
                      <Box
                        sx={{
                          position: "relative",
                          bgcolor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: "16px 16px 4px 16px",
                          boxShadow: 4,
                          p: { xs: 1.5, sm: 2 },
                          maxWidth: { xs: "calc(100vw - 100px)", sm: 380 },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            bottom: -7,
                            right: 18,
                            width: 14,
                            height: 14,
                            bgcolor: "background.paper",
                            borderRight: "1px solid",
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
                            pr: 4,
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

                        <IconButton
                          aria-label="Contraer ayuda"
                          size="small"
                          onClick={() => setHintCollapsed(true)}
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}

                    <IconButton
                      aria-label={hintCollapsed ? "Ver ayuda" : "Contraer ayuda"}
                      onClick={() =>
                        setHintCollapsed((collapsed) => !collapsed)
                      }
                      sx={{
                        p: 0,
                        "&:hover": { opacity: 0.85 },
                      }}
                    >
                      <GatoByteAvatar size={64} />
                    </IconButton>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    justifyContent: "flex-end",
                    gap: 1,
                  }}
                >
                  {hintLevel >= 3 && !missionCompleted && (
                    <Button
                      variant="outlined"
                      color="warning"
                      startIcon={<SkipNextIcon />}
                      onClick={handleSkip}
                      disabled={submitting}
                      sx={{ width: { xs: "100%", sm: "auto" } }}
                    >
                      Saltar misión
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={handleRun}
                    disabled={missionCompleted || submitting}
                    sx={{ width: { xs: "100%", sm: "auto" } }}
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
                          sx={{ width: { xs: "100%", sm: "auto" } }}
                        >
                          Siguiente misión
                        </Button>
                      </Box>
                    )}

                {result && !submitting && (
                  <Alert
                    severity={
                      resultType === "success"
                        ? "success"
                        : "error"
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
