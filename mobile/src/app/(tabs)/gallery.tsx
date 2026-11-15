import Ionicons from '@expo/vector-icons/Ionicons';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Linking, Modal, Platform, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Action, Screen } from '../../components';
import { colors, styles as s } from '../../theme';

const artwork = [
  { id: 'poster', title: 'The ground is calling.', category: 'POSTER', source: require('../../../assets/share-poster.png') as number, mimeType: 'image/png', uti: 'public.png', ratio: 1080 / 1350 },
  { id: 'wallpaper', title: 'Made for the game.', category: 'PLAYER ARTWORK', source: require('../../../assets/cricket-wallpaper.jpg') as number, mimeType: 'image/jpeg', uti: 'public.jpeg', ratio: 1672 / 941 },
];
type Artwork = typeof artwork[number];
export default function Gallery() {
  const [selected, setSelected] = useState<Artwork | null>(null);
  const [busy, setBusy] = useState(false);
  async function share(item: Artwork) {
    if (busy) return;
    setBusy(true);
    try {
      const asset = Asset.fromModule(item.source);
      if (Platform.OS === 'web') { await Linking.openURL(asset.uri); return; }
      if (!(await Sharing.isAvailableAsync())) { Alert.alert('Sharing unavailable', 'Your device does not currently support sharing files.'); return; }
      await asset.downloadAsync();
      if (!asset.localUri) throw new Error('Image unavailable');
      await Sharing.shareAsync(asset.localUri, { mimeType: item.mimeType, UTI: item.uti, dialogTitle: `${item.title} · Ismailpur Live24` });
    } catch { Alert.alert('Unable to share artwork', 'Please try again.'); }
    finally { setBusy(false); }
  }
  return <Screen><View style={s.titleGroup}><Text style={s.eyebrow}>BEYOND THE BOUNDARY</Text><Text accessibilityRole="header" style={s.heading}>Wear your passion.</Text><Text style={s.body}>Ismailpur Live24 brand artwork. Open a poster or wallpaper, then use your device’s share menu.</Text></View>
    {artwork.map(item => <View key={item.id} style={[s.card, { padding: 0, overflow: 'hidden' }]}><Pressable accessibilityRole="button" accessibilityLabel={`View ${item.title}`} onPress={() => setSelected(item)}><Image source={item.source} style={{ width: '100%', aspectRatio: item.ratio, maxHeight: 420, backgroundColor: colors.raised }} resizeMode="cover" /></Pressable><View style={{ padding: 18, gap: 12 }}><Text style={s.eyebrow}>{item.category}</Text><Text style={s.sectionHeading}>{item.title}</Text><Action title={Platform.OS === 'web' ? 'Open image' : 'Share artwork'} icon="share-outline" secondary disabled={busy} onPress={() => void share(item)} /></View></View>)}
    <Text style={s.small}>Artwork is bundled with the app. Sharing is handled by your device and the app you select. No photo-library permission is needed.</Text>
    <Modal visible={selected !== null} transparent={false} animationType="fade" onRequestClose={() => setSelected(null)}><SafeAreaView style={[s.screen, { padding: 20, gap: 20 }]}><View style={s.between}><Text style={[s.sectionHeading, { flex: 1 }]}>{selected?.title}</Text><Pressable accessibilityRole="button" accessibilityLabel="Close artwork" onPress={() => setSelected(null)} style={s.iconButton}><Ionicons name="close" size={22} color={colors.text} /></Pressable></View>{selected && <Image source={selected.source} resizeMode="contain" style={{ width: '100%', flex: 1 }} accessibilityLabel={selected.title} />}{busy ? <ActivityIndicator color={colors.gold} /> : selected && <Action title={Platform.OS === 'web' ? 'Open image' : 'Share artwork'} icon="share-outline" onPress={() => void share(selected)} />}</SafeAreaView></Modal>
  </Screen>;
}
