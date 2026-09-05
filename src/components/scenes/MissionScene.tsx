import React from "react";
import World1Scene from "./World1Scene";
import World2Scene from "./World2Scene";
import World3Scene from "./World3Scene";
import World4Scene from "./World4Scene";
import World5Scene from "./World5Scene";

export interface Props {
  worldId?: string;
  missionId: number;
  missionCompleted: boolean;
  missionTitle: string;
  expectedOutput: string;
}

export default function MissionScene(props: Props) {
  const scenes: Record<string, React.ComponentType<Omit<Props, "worldId">>> = {
    "1": World1Scene,
    "2": World2Scene,
    "3": World3Scene,
    "4": World4Scene,
    "5": World5Scene,
  };

  const Scene = props.worldId ? scenes[props.worldId] : null;
  if (!Scene) return null;

  return (
    <Scene
      missionId={props.missionId}
      missionCompleted={props.missionCompleted}
      missionTitle={props.missionTitle}
      expectedOutput={props.expectedOutput}
    />
  );
}