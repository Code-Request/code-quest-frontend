import { TextField } from "@mui/material";

const MissionEditor = ({
  code,
  setCode,
}: {
  code: string;
  setCode: (v: string) => void;
  onRun: () => void;
  disabled: boolean;
}) => {
  return (
    <>
      <TextField
        multiline
        minRows={10}
        fullWidth
        label="Escribe tu código aquí"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </>
  );
}

export default MissionEditor
