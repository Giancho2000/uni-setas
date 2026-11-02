import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { installMatchMedia, setReducedMotion } from './matchMedia';

installMatchMedia();

afterEach(() => {
  cleanup();
  setReducedMotion(false);
});
