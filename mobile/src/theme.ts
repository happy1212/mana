import { Platform, StyleSheet } from 'react-native';

export const colors = {
  background: '#11120F', surface: '#1D1F19', raised: '#272A21',
  text: '#F2EDE1', muted: '#AFB09F', gold: '#E2BD68', red: '#D92C28',
  border: '#3B3D30', pale: '#DCC17D',
};
export const headingFont = Platform.select({ android: 'sans-serif-condensed', default: undefined });
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36, gap: 22, width: '100%', maxWidth: 780, alignSelf: 'center' },
  brandHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingVertical: 2 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandIcon: { width: 45, height: 45, borderRadius: 12 },
  brandName: { color: colors.text, fontSize: 19, fontWeight: '900', fontStyle: 'italic', letterSpacing: -.4 },
  brandLive: { color: colors.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  eyebrow: { color: colors.gold, fontSize: 10, letterSpacing: 1.8, fontWeight: '700', lineHeight: 16 },
  heading: { color: colors.text, fontSize: 34, lineHeight: 38, letterSpacing: -.7, fontWeight: '900', fontFamily: headingFont },
  sectionHeading: { color: colors.text, fontSize: 24, lineHeight: 29, fontWeight: '800', fontFamily: headingFont },
  body: { color: colors.muted, fontSize: 14, lineHeight: 22 },
  small: { color: colors.muted, fontSize: 12, lineHeight: 19 },
  titleGroup: { gap: 8 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 20, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  rule: { height: 1, backgroundColor: colors.border },
  button: { minHeight: 50, borderRadius: 11, backgroundColor: colors.red, paddingHorizontal: 18, paddingVertical: 13, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  secondaryButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  buttonText: { color: colors.text, fontSize: 13, lineHeight: 20, fontWeight: '700', letterSpacing: .3 },
  iconButton: { width: 46, minHeight: 46, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  link: { color: colors.gold, fontSize: 13, fontWeight: '600', lineHeight: 21 },
  empty: { alignItems: 'center', paddingVertical: 35, gap: 16 },
  error: { backgroundColor: '#3B241D', borderWidth: 1, borderColor: '#A35E41', borderRadius: 12, padding: 15, gap: 10 },
});
