import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { Action, MatchCard, openUrl, Screen, StorageStatus } from '../../components';
import { LINKS, MATCHES } from '../../content';
import { colors, styles as s } from '../../theme';

export default function Home() {
  return <Screen>
    <View style={{ borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: colors.border }}><ImageBackground source={require('../../../assets/mobile-hero.webp')} style={{ minHeight: 465, justifyContent: 'flex-end' }} imageStyle={{ opacity: .75, width: '100%', height: '100%' }}><View style={{ backgroundColor: '#11120F55', padding: 22, gap: 14 }}><Text style={s.eyebrow}>THE HOME OF CIRCLE CRICKET</Text><Text accessibilityRole="header" style={[s.heading, { fontSize: 46, lineHeight: 48 }]}>THE GAME.{'\n'}LIVE & <Text style={{ color: colors.gold }}>LOUD.</Text></Text><Text style={[s.body, { color: colors.text, maxWidth: 280 }]}>Every boundary. Every moment. The passion of the ground, wherever you are.</Text><Action title="Watch on YouTube" icon="play" onPress={() => void openUrl(LINKS.live)} /><Text style={[s.small, { color: '#D5D0BE' }]}>Live coverage during scheduled broadcasts.</Text></View></ImageBackground></View>
    <View style={{ gap: 14 }}><Text style={s.eyebrow}>YOUR MATCHDAY, YOUR WAY</Text><View style={{ flexDirection: 'row', gap: 12 }}><Pressable accessibilityRole="button" onPress={() => router.push('/saved')} style={[s.card, { flex: 1, padding: 16 }]}><Ionicons name="bookmark-outline" color={colors.gold} size={25} /><Text style={[s.sectionHeading, { fontSize: 19 }]}>Your saved list</Text><Text style={s.small}>Keep match links close.</Text></Pressable><Pressable accessibilityRole="button" onPress={() => router.push('/gallery')} style={[s.card, { flex: 1, padding: 16 }]}><Ionicons name="images-outline" color={colors.gold} size={25} /><Text style={[s.sectionHeading, { fontSize: 19 }]}>Fan artwork</Text><Text style={s.small}>Share the cricket spirit.</Text></Pressable></View></View>
    <View style={s.between}><View style={s.titleGroup}><Text style={s.eyebrow}>FROM THE MATCH ARCHIVE</Text><Text accessibilityRole="header" style={s.sectionHeading}>Back to the boundary.</Text></View><Pressable accessibilityLabel="Browse match videos" accessibilityRole="button" style={s.iconButton} onPress={() => router.push('/watch')}><Ionicons name="arrow-forward" size={21} color={colors.gold} /></Pressable></View>
    <StorageStatus /><MatchCard match={MATCHES[0]} />
    <View style={s.card}><View style={s.row}><Ionicons name="calendar-outline" size={24} color={colors.gold} /><Text style={s.sectionHeading}>Next tournament?</Text></View><Text style={s.body}>Check the channel for fixtures, venues, and tournament announcements.</Text><Action title="See channel updates" onPress={() => void openUrl(LINKS.channel)} secondary /></View>
    <Text style={[s.eyebrow, { textAlign: 'center', color: colors.muted, letterSpacing: 1 }]}>ONE GAME. ONE COMMUNITY.</Text>
  </Screen>;
}
