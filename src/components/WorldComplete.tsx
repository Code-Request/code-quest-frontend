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
            <EmojiEventsIcon color="warning" sx={{ fontSize: 60 }} />

            <Box>
                <Typography variant="h5">
                Mundo completado
                </Typography>

                <Typography color="text.secondary">
                ¡Excelente trabajo! Has terminado todas las misiones.
                </Typography>
            </Box>
            </Box>
        </CardContent>
    </Card>
  );
}