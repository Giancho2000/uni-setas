import { useRef, type KeyboardEvent } from 'react';
import { Check } from 'lucide-react';
import type { SdgFilterValue } from '../../types';
import styles from './SdgFilter.module.css';

export interface SdgFilterOption {
  value: SdgFilterValue;
  label: string;
}

interface SdgFilterProps {
  label: string;
  value: SdgFilterValue;
  options: SdgFilterOption[];
  onChange: (value: SdgFilterValue) => void;
  /** Id of the element whose content the filter controls. */
  controlsId: string;
}

/** Single-choice level filter following the ARIA radio group pattern (roving tabindex + arrows). */
export function SdgFilter({ label, value, options, onChange, controlsId }: SdgFilterProps) {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    buttonsRef.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = options.length - 1;
    const targets: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
  };

  return (
    <div role="radiogroup" aria-label={label} className={styles.group}>
      {options.map((option, index) => {
        const isChecked = option.value === value;
        return (
          <button
            key={option.value}
            ref={(element) => {
              buttonsRef.current[index] = element;
            }}
            type="button"
            role="radio"
            aria-checked={isChecked}
            aria-controls={controlsId}
            tabIndex={isChecked ? 0 : -1}
            className={styles.option}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {isChecked && <Check className={styles.icon} aria-hidden="true" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
