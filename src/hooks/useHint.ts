import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

interface HintResponse {
  success: boolean;
  hint: string;
  source?: string;
  hints_used: number;
}

export function useHint() {
  const { refreshProfile } = useAuth();

  const [hint, setHint] = useState("");
  const [hintSource, setHintSource] = useState<"openai" | "fallback" | "">("");
  const [hintLevel, setHintLevel] = useState(0);

  const loadHintState = (hintsUsed: number) => {
    setHintLevel(hintsUsed);
    setHintSource("");

    if (hintsUsed > 0) {
      setHint("Ya usaste ayudas en esta misión.");
    } else {
      setHint("");
    }
  };

  const requestHint = async (
    missionId: number,
    currentLevel: number,
    code?: string
  ): Promise<string | null> => {
    if (currentLevel >= 3) {
      return null;
    }

    const nextLevel = currentLevel + 1;

    try {
      const response = await api.post<HintResponse>("/api/missions/hint", {
        mission_id: missionId,
        level: nextLevel,
        code: code ?? "",
      });

      setHint(response.data.hint);
      setHintSource(response.data.source === "openai" ? "openai" : "fallback");
      setHintLevel(response.data.hints_used);

      refreshProfile();

      return response.data.hint;
    } catch {
      return null;
    }
  };

  const resetHints = () => {
    setHint("");
    setHintSource("");
    setHintLevel(0);
  };

  return {
    hint,
    hintSource,
    hintLevel,
    requestHint,
    resetHints,
    loadHintState,
  };
}
