import type { PillarIcon as PillarIconKey } from '../../types';
import { AppIcon } from '../AppIcon/AppIcon';

interface PillarIconProps {
  icon: PillarIconKey;
  className?: string;
}

export function PillarIcon({ icon, className }: PillarIconProps) {
  return <AppIcon name={icon} className={className} />;
}
