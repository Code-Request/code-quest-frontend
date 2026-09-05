export interface Mission {
  id: number;
  world_id: number;
  title: string;
  description: string;
  expected_output: string;
  points: number;
}

export interface World {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
  completed: boolean;
  missions_completed: number;
  missions_total: number;
}

export interface Badge {
  key: string;
  name: string;
  description: string;
  icon: string;
  earned?: boolean;
}

export interface MissionProgress {
  mission_id: number;
  completed: boolean;
  hints_used: number;
  output: string | null;
}

export interface Profile {
  username: string;
  points: number;
  level: number;
  points_in_level: number;
  points_to_next_level: number;
  missions_completed: number;
  badges: Badge[];
  worlds: World[];
  mission_progress: MissionProgress[];
}

export interface ValidateResponse {
  success: boolean;
  message: string;
  points: number;
  user_points: number;
  level: number;
  level_up: boolean;
  earned_badges: Badge[];
  world_completed: number | null;
  world_unlocked: number | null;
}

export interface RankingEntry {
  position: number;
  username: string;
  points: number;
  level: number;
  missions_completed: number;
  worlds_completed: number;
}
