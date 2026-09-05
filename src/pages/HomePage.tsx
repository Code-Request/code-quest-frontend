import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { profile, join } = useAuth();

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (profile) {
      navigate("/");
    }
  }, [profile, navigate]);

  const handleSubmit = async () => {
    setError("");
    setSubmitting(true);

    try {
      await join(username.trim());
      navigate("/");
    } catch (e) {
      const detail = (e as { response?: { data?: { detail?: string } } })
        .response?.data?.detail;

      setError(detail ?? "Ocurrió un error. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          textAlign: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
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
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <RocketLaunchIcon sx={{ fontSize: 70, opacity: 0.9 }} />

              <Typography variant="h3">Code Quest</Typography>

              <Typography variant="h6">
                Explora mundos y aprende Python
              </Typography>

              <Typography variant="body2">
                Completa misiones, gana experiencia, desbloquea logros y
                compite en el ranking.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ width: "100%", borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Ingresa el nombre del jugador
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Nombre"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />

              {error && <Alert severity="error">{error}</Alert>}

              <Button
                variant="contained"
                size="large"
                disabled={submitting || !username.trim()}
                onClick={handleSubmit}
              >
                Jugar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
