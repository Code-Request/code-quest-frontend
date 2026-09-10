import { Box, Card, CardContent, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function WorldComplete() {
  return (
    <Card
        sx={{
            borderRadius: 4,
            border: "2px solid #facc15",
            backgroundColor: "#fefce8",
        }}
        >
        <CardContent>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <EmojiEventsIcon
                color="warning"
                sx={{ fontSize: { xs: 44, sm: 60 }, flexShrink: 0 }}
              />

              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h5" sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
                  Mundo completado
                </Typography>

                <Typography color="text.secondary" variant="body2">
                  ¡Excelente trabajo! Has terminado todas las misiones.
                </Typography>
              </Box>
            </Box>
          </CardContent>
    </Card>
  );
}