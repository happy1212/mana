import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Alert, Text, View } from 'react-native';
import { Action, MatchCard, Screen, StorageStatus } from '../../components';
import { MATCHES } from '../../content';
import { useSaved } from '../../SavedContext';
import { colors, styles as s } from '../../theme';

export default function Saved() {
  const { savedIds, isLoading, clearSaved } = useSaved();
  const matches = MATCHES.filter(match => savedIds.includes(match.id));
  function confirmClear() {
    Alert.alert('Clear your saved matches?', 'This removes saved links from this device. The videos remain on YouTube.', [{ text: 'Keep matches', style: 'cancel' }, { text: 'Clear saved', style: 'destructive', onPress: () => void clearSaved() }]);
  }
  return <Screen><View style={s.titleGroup}><Text style={s.eyebrow}>YOUR OWN MATCHDAY LIST</Text><Text accessibilityRole="header" style={s.heading}>Saved for later.</Text><Text style={s.body}>Your favourite match links, right here on this device.</Text></View><StorageStatus />
    {matches.map(match => <MatchCard match={match} key={match.id} />)}
    {!isLoading && matches.length === 0 && <View style={[s.card, s.empty]}><View style={{ padding: 22, backgroundColor: colors.raised, borderRadius: 50 }}><Ionicons name="bookmark-outline" size={35} color={colors.gold} /></View><Text style={s.sectionHeading}>Make room for the big moments.</Text><Text style={[s.body, { textAlign: 'center' }]}>Tap “Save for later” on a match to add it to your list. Your saved list is available offline.</Text><Action title="Find a match" icon="play-circle-outline" onPress={() => router.push('/watch')} /></View>}
    {matches.length > 0 && <Action title="Clear saved matches" icon="trash-outline" secondary onPress={confirmClear} />}
    <View style={s.card}><View style={s.row}><Ionicons name="phone-portrait-outline" size={22} color={colors.gold} /><Text style={[s.body, { flex: 1 }]}>Saved links stay on this device. They are not synced to an account. Watching videos needs an internet connection.</Text></View></View>
  </Screen>;
}
