import { Box, LinearProgress, Typography } from "@mui/material";

const ProgressBar = ({
  index,
  total,
}: {
  index: number;
  total: number;
}) => {
  return (
    <Box>
      <Typography variant="body2">
        Misión {index + 1} de {total}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={((index + 1) / total) * 100}
        sx={{ height: 12, borderRadius: 5, mt: 1 }}
      />
    </Box>
  );
}

export default ProgressBar
