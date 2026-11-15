import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { colors } from '../../theme';
import { type IconName } from '../../components';

const icons: Record<string, [IconName, IconName]> = { index: ['home-outline', 'home'], watch: ['play-circle-outline', 'play-circle'], saved: ['bookmark-outline', 'bookmark'], gallery: ['images-outline', 'images'], more: ['grid-outline', 'grid'] };
export default function TabLayout() {
  return <Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: colors.gold, tabBarInactiveTintColor: colors.muted, tabBarStyle: { backgroundColor: '#181A14', borderTopColor: colors.border }, tabBarLabelStyle: { fontSize: 10, fontWeight: '600' }, tabBarIcon: ({ focused }) => <Ionicons name={icons[route.name]?.[focused ? 1 : 0] ?? 'ellipse-outline'} size={22} color={focused ? colors.gold : colors.muted} /> })}><Tabs.Screen name="index" options={{ title: 'Home' }} /><Tabs.Screen name="watch" options={{ title: 'Watch' }} /><Tabs.Screen name="saved" options={{ title: 'Saved' }} /><Tabs.Screen name="gallery" options={{ title: 'Gallery' }} /><Tabs.Screen name="more" options={{ title: 'More' }} /></Tabs>;
}
