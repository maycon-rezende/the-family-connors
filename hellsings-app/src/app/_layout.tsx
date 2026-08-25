import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AgentProfileProvider } from '@/context/agent-profile';

export default function RootLayout() {
  return (
    <AgentProfileProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#030504' },
        }}
      />
    </AgentProfileProvider>
  );
}
