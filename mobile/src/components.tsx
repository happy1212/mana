import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from 'expo-router';
import { type ComponentProps, type PropsWithChildren, useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Image, ImageBackground, Linking, Pressable, ScrollView, Share, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { type Match, LINKS } from './content';
import { useSaved } from './SavedContext';
import { colors, styles as s } from './theme';

export type IconName = ComponentProps<typeof Ionicons>['name'];
export async function openUrl(url: string) {
  try { await Linking.openURL(url); }
  catch { Alert.alert('Unable to open link', 'Please check your connection and that you have an app available to open this link.'); }
}
export async function shareMatch(match: Match) {
  try { await Share.share({ title: match.title, message: `${match.title} · Ismailpur Live24\n${match.videoUrl}` }); }
  catch { Alert.alert('Sharing unavailable', 'Please try again.'); }
}
export function Action({ title, onPress, icon = 'arrow-up-right-box-outline', secondary = false, disabled = false }: { title: string; onPress: () => void; icon?: IconName; secondary?: boolean; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [s.button, secondary && s.secondaryButton, { opacity: disabled ? .45 : pressed ? .7 : 1 }]}><Ionicons name={icon} size={18} color={secondary ? colors.gold : colors.text} /><Text style={s.buttonText}>{title}</Text></Pressable>;
}
export function Brand() {
  return <View style={s.brand} accessible accessibilityLabel="Ismailpur Live24"><Image source={require('../assets/icon.png')} style={s.brandIcon} /><View><Text style={s.brandName}>ISMAILPUR</Text><Text style={s.brandLive}>LIVE24</Text></View></View>;
}
export function Screen({ children }: PropsWithChildren) {
  const [focused, setFocused] = useState(true);
  useFocusEffect(useCallback(() => {
    setFocused(true);
    return () => setFocused(false);
  }, []));
  return <SafeAreaView style={s.screen} aria-hidden={!focused} accessibilityElementsHidden={!focused} importantForAccessibility={focused ? 'auto' : 'no-hide-descendants'} edges={['top', 'left', 'right']}><ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled"><View style={s.brandHeader}><Brand /><Pressable accessibilityLabel="Open Ismailpur Live24 YouTube channel" accessibilityRole="link" onPress={() => void openUrl(LINKS.channel)} style={s.iconButton}><Ionicons name="logo-youtube" size={23} color={colors.gold} /></Pressable></View>{children}</ScrollView></SafeAreaView>;
}
export function StorageStatus() {
  const { error, retryLoad, isLoading } = useSaved();
  if (isLoading) return <View style={s.row} accessibilityLiveRegion="polite"><ActivityIndicator color={colors.gold} /><Text style={s.small}>Loading your saved matches…</Text></View>;
  if (!error) return null;
  return <View style={s.error} accessibilityLiveRegion="polite"><Text style={s.body}>{error}</Text><Action title="Retry saved list" icon="refresh-outline" onPress={() => void retryLoad()} secondary /></View>;
}
export function MatchCard({ match }: { match: Match }) {
  const { savedIds, toggleSaved, isLoading } = useSaved();
  const saved = savedIds.includes(match.id);
  return <View style={[s.card, { padding: 0, overflow: 'hidden' }]}>
    <Pressable onPress={() => void openUrl(match.videoUrl)} accessibilityRole="link" accessibilityLabel={`Watch ${match.title} on YouTube`}>
      <ImageBackground source={require('../assets/cricket-hero.webp')} style={{ height: 165, justifyContent: 'space-between', padding: 16 }} imageStyle={{ opacity: .65, width: '100%', height: '100%' }}>
        <Text style={[s.eyebrow, { alignSelf: 'flex-start', backgroundColor: '#11120FDD', padding: 6, borderRadius: 4 }]}>{match.category.toUpperCase()}</Text>
        <View style={s.between}><Text style={[s.brandName, { fontSize: 16 }]}>ISMAILPUR <Text style={{ color: colors.gold }}>LIVE24</Text></Text><View style={{ backgroundColor: colors.gold, width: 43, height: 43, alignItems: 'center', justifyContent: 'center', borderRadius: 22 }}><Ionicons name="play" size={20} color={colors.background} /></View></View>
      </ImageBackground>
    </Pressable>
    <View style={{ padding: 18, gap: 12 }}><Text accessibilityRole="header" style={s.sectionHeading}>{match.title}</Text><Text style={s.body}>{match.description}</Text><View style={s.between}><Pressable accessibilityRole="button" accessibilityLabel={saved ? `Remove ${match.title} from saved matches` : `Save ${match.title} for later`} accessibilityState={{ selected: saved, disabled: isLoading }} disabled={isLoading} onPress={() => void toggleSaved(match.id)} style={[s.row, { minHeight: 46, paddingRight: 12 }]}><Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={21} color={colors.gold} /><Text style={s.link}>{saved ? 'Saved' : 'Save for later'}</Text></Pressable><Pressable onPress={() => void shareMatch(match)} style={s.iconButton} accessibilityLabel={`Share ${match.title}`} accessibilityRole="button"><Ionicons name="share-outline" size={20} color={colors.text} /></Pressable></View></View>
  </View>;
}
