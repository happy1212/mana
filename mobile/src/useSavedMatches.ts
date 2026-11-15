import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MATCHES, normalizeSavedMatchIds } from './content';

const STORAGE_KEY = '@ismailpurlive24/saved-matches/v1';
const validIds = new Set(MATCHES.map(match => match.id));

export function useSavedMatches() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentIds = useRef<string[]>([]);
  const ready = useRef(false);
  const mounted = useRef(false);
  const generation = useRef(0);
  const queue = useRef<Promise<void>>(Promise.resolve());

  // Serialize reads and writes so rapid taps cannot overwrite a later change.
  // An operation resolves on failure; the UI reports the failure through error.
  const enqueue = useCallback((operation: (active: () => boolean) => Promise<void>) => {
    const startedIn = generation.current;
    const active = () => mounted.current && generation.current === startedIn;
    const task = queue.current.then(async () => {
      if (active()) await operation(active);
    });
    queue.current = task.catch(() => undefined);
    return queue.current;
  }, []);

  const retryLoad = useCallback(() => enqueue(async active => {
    ready.current = false;
    setIsLoading(true);
    setError(null);
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (!active()) return;
      let parsed: unknown = [];
      let damaged = false;
      if (stored !== null) {
        try {
          parsed = JSON.parse(stored);
          damaged = !Array.isArray(parsed);
        } catch {
          damaged = true;
        }
      }
      const ids = normalizeSavedMatchIds(parsed);
      currentIds.current = ids;
      ready.current = true;
      setSavedIds(ids);
      if (damaged) setError('Your saved list could not be restored. You can save matches again.');
    } catch {
      if (active()) setError('Saved matches could not be loaded. Please try again.');
    } finally {
      if (active()) setIsLoading(false);
    }
  }), [enqueue]);

  useEffect(() => {
    mounted.current = true;
    generation.current += 1;
    void retryLoad();
    return () => {
      mounted.current = false;
      generation.current += 1;
    };
  }, [retryLoad]);

  const toggleSaved = useCallback((id: string) => enqueue(async active => {
    if (!ready.current) {
      setError('Load your saved matches before making changes. Please try again.');
      return;
    }
    if (!validIds.has(id)) {
      setError('This match is not available in the current library.');
      return;
    }
    const next = currentIds.current.includes(id)
      ? currentIds.current.filter(savedId => savedId !== id)
      : [...currentIds.current, id];
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      if (!active()) return;
      currentIds.current = next;
      setSavedIds(next);
      setError(null);
    } catch {
      if (active()) setError('Your change could not be saved. Please try again.');
    }
  }), [enqueue]);

  const clearSaved = useCallback(() => enqueue(async active => {
    if (!ready.current) {
      setError('Load your saved matches before clearing them. Please try again.');
      return;
    }
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      if (!active()) return;
      currentIds.current = [];
      setSavedIds([]);
      setError(null);
    } catch {
      if (active()) setError('Your saved list could not be cleared. Please try again.');
    }
  }), [enqueue]);

  return { savedIds, isLoading, error, toggleSaved, clearSaved, retryLoad };
}
