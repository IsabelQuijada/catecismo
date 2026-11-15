import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { AppButton } from '../components/ui';
import { StandardPage } from '../components/page';
import { semantic, tokens } from '../design/tokens';
import { siteSettings } from '../content/repository';
export default function ContactScreen() {
  const compact = useWindowDimensions().width < tokens.breakpoint.compact;
  return <StandardPage eyebrow="Estamos para acompañarte" title="Contacto" body={siteSettings.contactIntro}>
    <View style={[styles.card, compact && styles.cardCompact]}>
      <Text style={styles.label}>ATENCIÓN PARROQUIAL</Text>
      <Text style={styles.title}>{siteSettings.parishName}</Text>
      <Text style={styles.body}>{siteSettings.city}</Text>
      <Text style={styles.body}>Recibirás orientación sobre cursos, requisitos e inscripciones vigentes.</Text>
      <AppButton label={siteSettings.contactLabel} href={siteSettings.messengerUrl} />
    </View>
  </StandardPage>;
}
const styles = StyleSheet.create({ cardCompact: { padding: tokens.space.lg, marginBottom: tokens.space.xxl }, card: { backgroundColor: semantic.surface.base, borderRadius: tokens.radius.lg, padding: tokens.space.xxl, marginBottom: tokens.space.hero, ...tokens.shadow.card }, label: { ...tokens.type.eyebrow, color: tokens.color.wine, marginBottom: tokens.space.sm }, title: { ...tokens.type.title, color: semantic.screen.text, marginBottom: tokens.space.sm }, body: { ...tokens.type.body, color: semantic.screen.mutedText, marginBottom: tokens.space.md } });
