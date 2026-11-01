import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  ariaLabel: string;
  selectedId: string;
  onChange: (id: string) => void;
  /** Prefix that keeps tab and panel ids unique on the page. */
  idPrefix: string;
  variant?: 'primary' | 'secondary';
}

/** WAI-ARIA tabs with automatic activation, roving tabindex and arrow/Home/End keys. */
export function Tabs({
  items,
  ariaLabel,
  selectedId,
  onChange,
  idPrefix,
  variant = 'primary',
}: TabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.id === selectedId),
  );
  const selected = items[selectedIndex];

  const select = (index: number) => {
    const item = items[index];
    if (!item) return;
    onChange(item.id);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const keyToIndex: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = keyToIndex[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
  };

  const tabId = (id: string) => `${idPrefix}-tab-${id}`;
  const panelId = (id: string) => `${idPrefix}-panel-${id}`;

  return (
    <div className={styles[variant]}>
      <div className={styles.scroller}>
        <div role="tablist" aria-label={ariaLabel} className={styles.tablist}>
          {items.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={item.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={tabId(item.id)}
                aria-selected={isSelected}
                aria-controls={panelId(item.id)}
                tabIndex={isSelected ? 0 : -1}
                className={styles.tab}
                onClick={() => onChange(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      {selected && (
        <div
          role="tabpanel"
          id={panelId(selected.id)}
          aria-labelledby={tabId(selected.id)}
          tabIndex={0}
          className={styles.panel}
        >
          {selected.content}
        </div>
      )}
    </div>
  );
}
