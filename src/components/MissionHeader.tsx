import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

import PointCounter from "./PointCounter";

const MissionHeader = ({
  points,
  level,
}: {
  points: number;
  level: number;
}) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        background: "linear-gradient(to right, #2563eb, #06b6d4)",
        color: "white",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h4">Code Quest</Typography>

            <Typography variant="body2">
              Completa misiones y gana experiencia
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              sx={{ color: "white", borderColor: "white" }}
              variant="outlined"
              label={`Nivel ${level}`}
            />

            <Chip
              color="warning"
              label={
                <>
                  <PointCounter value={points} /> puntos
                </>
              }
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MissionHeader;
