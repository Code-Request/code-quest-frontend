import { useAuth } from "../context/AuthContext";

export function useWorldProgress(worldId?: string) {
  const { profile } = useAuth();

  const world = (profile?.worlds ?? []).find(
    (item) => item.id === Number(worldId)
  );

  const worldCompleted = world?.completed ?? false;
  const worldUnlocked = world?.unlocked ?? false;

  return {
    worldCompleted,
    worldUnlocked,
  };
}
