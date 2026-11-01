import { Coins, Leaf, Recycle, Sprout, type LucideIcon } from 'lucide-react';
import type { PillarIcon as PillarIconKey } from '../../types';

const ICONS: Record<PillarIconKey, LucideIcon> = {
  leaf: Leaf,
  coins: Coins,
  sprout: Sprout,
  recycle: Recycle,
};

interface PillarIconProps {
  icon: PillarIconKey;
  className?: string;
}

export function PillarIcon({ icon, className }: PillarIconProps) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden="true" />;
}
