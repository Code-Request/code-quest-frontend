import { useEffect, useState } from "react";
import api from "../services/api";
import type { World } from "../types";

export function useWorlds() {
  const [worlds, setWorlds] = useState<World[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<World[]>("/api/worlds")
      .then((response) => {
        setWorlds(response.data);
      })
      .catch(() => {
        setError("Error al cargar mundos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    worlds,
    loading,
    error,
  };
}
