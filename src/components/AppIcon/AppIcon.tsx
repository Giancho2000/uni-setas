import {
  BadgeCheck,
  Camera,
  Coins,
  Handshake,
  Leaf,
  MapPin,
  Package,
  Presentation,
  Recycle,
  Sprout,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { IconKey } from '../../types';

const ICONS: Record<IconKey, LucideIcon> = {
  leaf: Leaf,
  coins: Coins,
  sprout: Sprout,
  recycle: Recycle,
  users: Users,
  handshake: Handshake,
  target: Target,
  package: Package,
  'map-pin': MapPin,
  presentation: Presentation,
  camera: Camera,
  badge: BadgeCheck,
};

interface AppIconProps {
  name: IconKey;
  className?: string;
}

/** Decorative icon: always hidden from assistive technology. */
export function AppIcon({ name, className }: AppIconProps) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" focusable="false" />;
}
