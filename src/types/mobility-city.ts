export type MobilityArea = "sensors" | "cameras" | "insights";

export type MobilityView = "overview" | MobilityArea;

export type MobilityModelStatus = "idle" | "loading" | "ready" | "error";

export interface MobilityCityVisualProps {
  activeArea?: MobilityArea | null;
  initialView?: MobilityView;
  lockedArea?: MobilityArea | null;
  onAreaHover?: (area: MobilityArea | null) => void;
  onAreaSelect?: (area: MobilityArea) => void;
  onReturnToOverview?: () => void;
  interactive?: boolean;
  visualMode?: "image" | "video" | "3d";
  showDetails?: boolean;
  showMarkers?: boolean;
  className?: string;
}
