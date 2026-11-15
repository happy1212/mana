import { createContext, type PropsWithChildren, useContext } from 'react';
import { useSavedMatches } from './useSavedMatches';

const SavedContext = createContext<ReturnType<typeof useSavedMatches> | null>(null);
export function SavedProvider({ children }: PropsWithChildren) {
  const saved = useSavedMatches();
  return <SavedContext.Provider value={saved}>{children}</SavedContext.Provider>;
}
export function useSaved() {
  const value = useContext(SavedContext);
  if (!value) throw new Error('SavedProvider is missing');
  return value;
}
