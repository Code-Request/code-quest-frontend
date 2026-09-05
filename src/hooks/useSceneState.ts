import { useState } from "react";

interface SceneState {
  missionId: number;
  activated: boolean;
  justActivated: boolean;
}

export function useSceneState(missionCompleted: boolean, missionId: number, expectedOutput: string) {
  const [state, setState] = useState<SceneState>({
    missionId,
    activated: false,
    justActivated: false,
  });

  const derived = state.missionId !== missionId
    ? { activated: false, justActivated: false }
    : { activated: state.activated, justActivated: state.justActivated };

  const activate = () => {
    setState({ missionId, activated: true, justActivated: true });
    setTimeout(() => {
      setState((prev) => ({ ...prev, justActivated: false }));
    }, 3000);
  };

  if (missionCompleted && !derived.activated) {
    activate();
  }

  if (state.missionId !== missionId) {
    setState({ missionId, activated: false, justActivated: false });
  }

  return { ...derived, expectedOutput };
}