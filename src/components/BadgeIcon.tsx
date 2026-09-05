import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import BoltIcon from "@mui/icons-material/Bolt";
import DiamondIcon from "@mui/icons-material/Diamond";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SatelliteIcon from "@mui/icons-material/Satellite";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const ICONS: Record<string, ComponentType<SvgIconProps>> = {
  footprint: AccessibilityIcon,
  bolt: BoltIcon,
  crown: WorkspacePremiumIcon,
  rocket: RocketLaunchIcon,
  diamond: DiamondIcon,
  satellite: SatelliteIcon,
  database: StorageIcon,
  shield: SecurityIcon,
  gear: SettingsIcon,
  trophy: EmojiEventsIcon,
  brain: PsychologyIcon,
};

const BadgeIcon = ({
  icon,
  earned = true,
  ...props
}: SvgIconProps & { icon: string; earned?: boolean }) => {
  const Component = ICONS[icon] ?? EmojiEventsIcon;

  return (
    <Component
      {...props}
      color={earned ? props.color ?? "warning" : "disabled"}
    />
  );
};

export default BadgeIcon;
