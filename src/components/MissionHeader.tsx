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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: { xs: 1.5, sm: 0 },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
            >
              Code Quest
            </Typography>

            <Typography variant="body2">
              Completa misiones y gana experiencia
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
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
