import { useEffect, useMemo, useRef, useState } from "react";
import api from "../services/api";
import type { Mission, MissionProgress, ValidateResponse } from "../types";
import { useAuth } from "../context/AuthContext";

function initialIndex(
  missions: Mission[],
  progressMap: Map<number, MissionProgress>,
): number {
  const firstUncompleted = missions.findIndex(
    (mission) => !progressMap.get(mission.id)?.completed,
  );

  if (firstUncompleted >= 0) {
    return firstUncompleted;
  }

  return Math.max(0, missions.length - 1);
}

export function useMission(worldId?: string) {
  const { profile, refreshProfile } = useAuth();

  const [missions, setMissions] = useState<Mission[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedWorldId, setLoadedWorldId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const progressMap = useMemo(
    () =>
      new Map(
        (profile?.mission_progress ?? []).map((item) => [
          item.mission_id,
          item,
        ])
      ),
    [profile?.mission_progress],
  );

  const profileRef = useRef(profile);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  const mission =
    loadedWorldId === worldId ? missions[currentIndex] : undefined;

  const missionProgress = mission ? progressMap.get(mission.id) : undefined;

  const missionCompleted = missionProgress?.completed ?? false;
  const completedOutput = missionProgress?.output ?? "";
  const hintsUsed = missionProgress?.hints_used ?? 0;

  useEffect(() => {
    if (!worldId) return;

    api
      .get<Mission[]>(`/api/worlds/${worldId}/missions`)
      .then((res) => {
        const progress = profileRef.current?.mission_progress ?? [];
        const map = new Map(progress.map((item) => [item.mission_id, item]));

        setMissions(res.data);
        setLoadedWorldId(worldId);
        setCurrentIndex(initialIndex(res.data, map));
      })
      .catch(() => setResult("Error al cargar las misiones"));
  }, [worldId]);

  const executeMission = async (): Promise<ValidateResponse | null> => {
    if (missionCompleted || !mission || submitting) return null;

    setSubmitting(true);

    try {
      const res = await api.post<ValidateResponse>("/api/missions/validate", {
        mission_id: mission.id,
        code,
      });

      setResult(res.data.message ?? "");

      if (res.data.success) {
        refreshProfile();
        return res.data;
      }
    } catch {
      setResult("Error al conectar con el servidor");
    } finally {
      setSubmitting(false);
    }

    return null;
  };

  const nextMission = () => {
    if (!missionCompleted) return false;

    if (currentIndex < missions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCode("");
      setResult("");
    }

    return true;
  };

  return {
    mission,
    missions,
    currentIndex,
    code,
    setCode,
    result,
    missionCompleted,
    completedOutput,
    hintsUsed,
    points: profile?.points ?? 0,
    level: profile?.level ?? 1,
    submitting,
    executeMission,
    nextMission,
  };
}
