import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import type { RankingEntry } from "../types";

const MEDALS = ["#fbbf24", "#94a3b8", "#b45309"];

export default function RankingPage() {
  const { profile } = useAuth();
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<RankingEntry[]>("/api/user/ranking")
      .then((response) => setRanking(response.data))
      .catch(() => setRanking([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <EmojiEventsIcon color="warning" sx={{ fontSize: 40 }} />

        <Box>
          <Typography variant="h4">Ranking</Typography>

          <Typography color="text.secondary">
            Los mejores operadores de Nova City.
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Typography>Cargando ranking...</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                <TableCell>#</TableCell>
                <TableCell>Operador</TableCell>
                <TableCell align="center">Nivel</TableCell>
                <TableCell align="center">Puntos</TableCell>
                <TableCell align="center">Misiones</TableCell>
                <TableCell align="center">Mundos</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ranking.map((entry) => {
                const isMe = entry.username === profile?.username;

                return (
                  <TableRow
                    key={entry.username}
                    sx={{
                      bgcolor: isMe ? "#e0f2fe" : undefined,
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {entry.position <= 3 && (
                          <EmojiEventsIcon
                            sx={{
                              color: MEDALS[entry.position - 1],
                              fontSize: 20,
                            }}
                          />
                        )}

                        {entry.position}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontWeight: isMe ? 700 : 400 }}>
                        {entry.username}
                        {isMe && " (vos)"}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">{entry.level}</TableCell>

                    <TableCell align="center">{entry.points}</TableCell>

                    <TableCell align="center">
                      {entry.missions_completed}
                    </TableCell>

                    <TableCell align="center">
                      {entry.worlds_completed}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
