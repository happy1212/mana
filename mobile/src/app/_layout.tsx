import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SavedProvider } from '../SavedContext';
import { colors } from '../theme';

export default function RootLayout() {
  return <SavedProvider><StatusBar style="light" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}><Stack.Screen name="(tabs)" /></Stack></SavedProvider>;
}
