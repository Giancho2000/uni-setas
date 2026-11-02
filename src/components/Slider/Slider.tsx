import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ui } from '../../data/ui';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Slide } from '../../types';
import { getImage, placeholderImage } from '../../utils/getImage';
import styles from './Slider.module.css';

interface SliderProps {
  slides: Slide[];
  /** Accessible name of the carousel region. */
  label: string;
  intervalMs?: number;
  /** Fixed content shown over every slide (project name and short objective). */
  overlay?: ReactNode;
}

const SWIPE_MIN_DISTANCE = 48;
const SWIPE_DOMINANCE = 1.5;
const IMAGE_WIDTH = 1920;
const IMAGE_HEIGHT = 800;

/** Accessible full-width carousel (WAI-ARIA APG pattern with rotation control). */
export function Slider({ slides, label, intervalMs = 6000, overlay }: SliderProps) {
  const total = slides.length;
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(reducedMotion);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(
    () => typeof document !== 'undefined' && document.hidden,
  );
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0, 1]));
  const [failed, setFailed] = useState<Set<string>>(() => new Set());
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const hasControls = total > 1;
  const isPlaying = hasControls && !userPaused && !hovered && !focusWithin && !documentHidden;

  useEffect(() => {
    if (reducedMotion) setUserPaused(true);
  }, [reducedMotion]);

  useEffect(() => {
    const onVisibility = () => setDocumentHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      const target = ((next % total) + total) % total;
      setIndex(target);
      setVisited((previous) => {
        const following = (target + 1) % total;
        if (previous.has(target) && previous.has(following)) return previous;
        return new Set(previous).add(target).add(following);
      });
    },
    [total],
  );

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = window.setTimeout(() => goTo(index + 1), intervalMs);
    return () => window.clearTimeout(timer);
  }, [isPlaying, index, intervalMs, goTo]);

  if (total === 0) return null;

  return (
    // The region delegates events from its interactive children (WAI-ARIA APG carousel):
    // hover/focus pause rotation, arrow keys move between slides and touch swipes change slide.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section
      className={styles.slider}
      aria-roledescription={ui.slider.roledescription}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusWithin(false);
        }
      }}
      onKeyDown={(event) => {
        if (!hasControls) return;
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          goTo(index + 1);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          goTo(index - 1);
        }
      }}
      onPointerDown={(event) => {
        pointerStart.current =
          event.pointerType === 'mouse' ? null : { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        const start = pointerStart.current;
        pointerStart.current = null;
        if (!start || !hasControls) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) >= SWIPE_MIN_DISTANCE && Math.abs(dx) > SWIPE_DOMINANCE * Math.abs(dy)) {
          goTo(dx < 0 ? index + 1 : index - 1);
        }
      }}
      onPointerCancel={() => {
        pointerStart.current = null;
      }}
    >
      <div className={styles.content}>
        {overlay && <div className={styles.overlay}>{overlay}</div>}

        <div className={styles.slides} aria-live={isPlaying ? 'off' : 'polite'}>
          {slides.map((slide, i) => {
            const isActive = i === index;
            const resolved = getImage('slider', slide.image);
            const showPlaceholder = resolved.isPlaceholder || failed.has(slide.id);
            const src = showPlaceholder ? placeholderImage : resolved.src;
            const mountImage = i === 0 || visited.has(i);
            return (
              <div
                key={slide.id}
                className={styles.slide}
                role="group"
                aria-roledescription={ui.slider.slideRoledescription}
                aria-label={`${i + 1} ${ui.slider.of} ${total}: ${slide.title}`}
                aria-hidden={isActive ? undefined : true}
                data-active={isActive}
                {...(isActive ? {} : { inert: '' })}
              >
                {mountImage && (
                  <img
                    className={styles.media}
                    src={src}
                    alt={showPlaceholder ? '' : slide.alt}
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                    decoding="async"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    {...(i === 0 ? { fetchpriority: 'high' } : {})}
                    onError={() => {
                      if (!showPlaceholder)
                        setFailed((previous) => new Set(previous).add(slide.id));
                    }}
                  />
                )}
                <span className={styles.shade} aria-hidden="true" />
                <div className={styles.text}>
                  <p className={styles.title}>{slide.title}</p>
                  <p className={styles.caption}>{slide.caption}</p>
                </div>
              </div>
            );
          })}
        </div>

        {hasControls && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.control}
              aria-label={userPaused ? ui.slider.play : ui.slider.pause}
              onClick={() => {
                if (userPaused) {
                  // An explicit "play" overrides the hover/focus suspension until it happens again.
                  setHovered(false);
                  setFocusWithin(false);
                }
                setUserPaused(!userPaused);
              }}
            >
              {userPaused ? (
                <Play className={styles.controlIcon} aria-hidden="true" />
              ) : (
                <Pause className={styles.controlIcon} aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              className={styles.control}
              aria-label={ui.slider.previous}
              onClick={() => goTo(index - 1)}
            >
              <ChevronLeft className={styles.controlIcon} aria-hidden="true" />
            </button>
            <ul className={styles.dots}>
              {slides.map((slide, i) => (
                <li key={slide.id}>
                  <button
                    type="button"
                    className={styles.dot}
                    aria-label={`${ui.slider.goTo} ${i + 1}: ${slide.title}`}
                    aria-current={i === index ? 'true' : undefined}
                    onClick={() => goTo(i)}
                  >
                    <span className={styles.dotMark} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles.control}
              aria-label={ui.slider.next}
              onClick={() => goTo(index + 1)}
            >
              <ChevronRight className={styles.controlIcon} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
