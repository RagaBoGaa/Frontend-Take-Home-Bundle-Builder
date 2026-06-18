import type { BundleState } from '../types';

const STORAGE_KEY = 'bundleBuilder_savedState';

export function saveState(state: BundleState): void {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.error('Failed to save state to localStorage:', e);
  }
}


export function loadState(): BundleState | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return null;
    return JSON.parse(serialized) as BundleState;
  } catch (e) {
    console.error('Failed to load state from localStorage:', e);
    return null;
  }
}


export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear state from localStorage:', e);
  }
}
