import {
  Box,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import BadgeIcon from "./BadgeIcon";
import type { Badge } from "../types";

const BadgeDialog = ({
  badges,
  open,
  onClose,
}: {
  badges: Badge[];
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        <Typography variant="h5" color="warning.main">
          ¡Logro desbloqueado!
        </Typography>

        <Typography color="text.secondary" variant="body2">
          Tu progreso no pasa desapercibido.
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {badges.map((badge) => (
            <Card
              key={badge.key}
              sx={{
                borderRadius: 3,
                border: "1px solid #facc15",
                background: "#fefce8",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      bgcolor: "#fde68a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BadgeIcon icon={badge.icon} sx={{ fontSize: 30 }} />
                  </Box>

                  <Box>
                    <Typography variant="h6">{badge.name}</Typography>

                    <Typography variant="body2" color="text.secondary">
                      {badge.description}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Box sx={{ textAlign: "center" }}>
            <Chip
              color="warning"
              label="Seguí así, Nova City te necesita"
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeDialog;
