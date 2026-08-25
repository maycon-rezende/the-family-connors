import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = '@hellsings/agent-profile-v1';
export type AgentDivision = 'CAMPO' | 'INTELIGÊNCIA' | 'SUPORTE';
export type AgentProfile = {
  callsign: string;
  division: AgentDivision;
  registry: string;
  createdAt: string;
};
type AgentProfileContextValue = {
  profile: AgentProfile | null;
  loading: boolean;
  createProfile(callsign: string, division: AgentDivision): Promise<AgentProfile>;
  clearProfile(): Promise<void>;
};
const AgentProfileContext = createContext<AgentProfileContextValue | null>(null);

function makeRegistry() {
  return `HLS-${Date.now().toString(36).slice(-5).toUpperCase()}`;
}

export function AgentProfileProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState<AgentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => value && setProfile(JSON.parse(value)))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, []);
  const value = useMemo<AgentProfileContextValue>(
    () => ({
      profile,
      loading,
      async createProfile(callsign, division) {
        const next: AgentProfile = {
          callsign: callsign.trim().toUpperCase(),
          division,
          registry: profile?.registry ?? makeRegistry(),
          createdAt: profile?.createdAt ?? new Date().toISOString(),
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setProfile(next);
        return next;
      },
      async clearProfile() {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setProfile(null);
      },
    }),
    [loading, profile]
  );
  return <AgentProfileContext.Provider value={value}>{children}</AgentProfileContext.Provider>;
}

export function useAgentProfile() {
  const context = useContext(AgentProfileContext);
  if (!context) throw new Error('useAgentProfile must be used inside AgentProfileProvider');
  return context;
}
