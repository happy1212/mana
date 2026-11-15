import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Action, MatchCard, openUrl, Screen, StorageStatus } from '../../components';
import { LINKS, MATCHES } from '../../content';
import { colors, styles as s } from '../../theme';

export default function Watch() {
  const [query, setQuery] = useState('');
  const matches = MATCHES.filter(match => `${match.title} ${match.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <Screen><View style={s.titleGroup}><Text style={s.eyebrow}>STRAIGHT FROM THE BOUNDARY</Text><Text accessibilityRole="header" style={s.heading}>Watch & rewatch.</Text><Text style={s.body}>Find a replay. Save it for later. Share it with your cricket community.</Text></View>
    <View style={[s.card, { backgroundColor: '#29281B' }]}><View style={s.row}><Ionicons name="radio-outline" size={25} color={colors.gold} /><Text style={s.sectionHeading}>Catch the live action.</Text></View><Text style={s.body}>Our YouTube live page is the place to check for current broadcasts. Stream availability follows the tournament schedule.</Text><Action title="Check live coverage" icon="play" onPress={() => void openUrl(LINKS.live)} /></View>
    <View style={s.titleGroup}><Text style={s.eyebrow}>MATCH LIBRARY</Text><View style={[s.row, { borderColor: colors.border, borderWidth: 1, borderRadius: 12, backgroundColor: colors.surface, paddingHorizontal: 14 }]}><Ionicons name="search" size={20} color={colors.muted} /><TextInput value={query} onChangeText={setQuery} placeholder="Search teams or matches" placeholderTextColor={colors.muted} accessibilityLabel="Search match library" autoCorrect={false} returnKeyType="search" style={{ flex: 1, color: colors.text, minHeight: 52, fontSize: 14 }} />{query.length > 0 && <Pressable accessibilityRole="button" accessibilityLabel="Clear search" onPress={() => setQuery('')} style={{ minHeight: 44, width: 35, alignItems: 'center', justifyContent: 'center' }}><Ionicons name="close-circle" color={colors.muted} size={21} /></Pressable>}</View></View>
    <StorageStatus />
    {matches.map(match => <MatchCard key={match.id} match={match} />)}
    {matches.length === 0 && <View style={[s.card, s.empty]}><Ionicons name="search-outline" size={35} color={colors.gold} /><Text style={s.sectionHeading}>No matches found.</Text><Text style={[s.body, { textAlign: 'center' }]}>Try a team name, or explore more broadcasts on YouTube.</Text><Action title="Clear search" icon="close-outline" secondary onPress={() => setQuery('')} /></View>}
    <View style={s.card}><Text style={s.sectionHeading}>There’s more on the channel.</Text><Text style={s.body}>Explore the full video archive for more tournament coverage.</Text><Action title="Explore all channel videos" onPress={() => void openUrl(LINKS.videos)} secondary /></View>
    <Text style={s.small}>Videos open in YouTube or your browser. An internet connection is required. Saving a match stores its link, not the video.</Text>
  </Screen>;
}
