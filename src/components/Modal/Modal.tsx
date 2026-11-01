import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { ui } from '../../data/ui';
import { useFocusTrap } from './useFocusTrap';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /** Optional content rendered above the title (e.g. a badge). */
  eyebrow?: ReactNode;
  children: ReactNode;
}

const SCROLL_LOCK_CLASS = 'scroll-locked';

export function Modal({ isOpen, onClose, title, eyebrow, children }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pointerDownOnBackdrop = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useFocusTrap(panelRef, isOpen);

  // Open/close side effects: focus, scroll lock, inert background, Escape.
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const { body } = document;
    const appRoot = document.getElementById('root');
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousPaddingRight = body.style.paddingRight;

    body.classList.add(SCROLL_LOCK_CLASS);
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    appRoot?.setAttribute('inert', '');
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.classList.remove(SCROLL_LOCK_CLASS);
      body.style.paddingRight = previousPaddingRight;
      appRoot?.removeAttribute('inert');
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    pointerDownOnBackdrop.current = event.target === event.currentTarget;
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (pointerDownOnBackdrop.current && event.target === event.currentTarget) onClose();
    pointerDownOnBackdrop.current = false;
  };

  return createPortal(
    // The backdrop is a pointer-only convenience; keyboard users close with Escape or the button.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={styles.backdrop}
      data-testid="modal-backdrop"
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className={styles.header}>
          <div className={styles.heading}>
            {eyebrow}
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            aria-label={ui.close}
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
