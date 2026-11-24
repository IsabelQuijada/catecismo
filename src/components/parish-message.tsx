import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { tokens } from '../design/tokens';
import { AppButton, Container } from './ui';

const parishImage = require('../../assets/content/mensaje-parroco/parroco.png');

export function ParishMessage() {
  const width = useWindowDimensions().width;
  const compact = width < tokens.breakpoint.wide;
  const mobile = width < 768;
  const [expanded, setExpanded] = useState(false);

  return <View style={[styles.section, compact && styles.sectionCompact, mobile && styles.sectionMobile]}>
    <Container>
      <View style={[styles.layout, compact && styles.layoutCompact, mobile && styles.layoutMobile]}>
        <Image source={parishImage} style={[styles.image, compact && styles.imageCompact, mobile && styles.imageMobile]} resizeMode="cover" accessibilityLabel="Retrato del párroco" />
        <View style={styles.copy}>
          <Text style={styles.eyebrow}>MENSAJE DEL PÁRROCO</Text>
          <View style={[styles.accent, mobile && styles.accentMobile]} />
          <Text accessibilityRole="header" style={[styles.title, compact && styles.titleCompact, mobile && styles.titleMobile]}>Una comunidad que camina en la fe</Text>
          <Text numberOfLines={mobile && !expanded ? 3 : undefined} style={[styles.body, mobile && styles.bodyMobile]}>Queridas familias, la catequesis es un camino de encuentro con Jesús que nos ayuda a crecer en la fe, fortalecer nuestros valores y vivir como una gran familia de Dios.</Text>
          {(!mobile || expanded) && <Text style={[styles.body, mobile && styles.bodyMobile]}>Los invito a participar con alegría, acompañando a sus hijos e hijas en esta hermosa misión.</Text>}
          {mobile && <Pressable accessibilityRole="button" accessibilityState={{ expanded }} onPress={() => setExpanded(!expanded)} style={styles.readMore}><Text style={styles.readMoreText}>{expanded ? 'Leer menos ↑' : 'Leer mensaje completo ↓'}</Text></Pressable>}
          <View style={styles.footer}>
            <View style={styles.signature}>
              <Text style={styles.signatureTitle}>Párroco</Text>
              <Text style={styles.signatureSubtitle}>Parroquia San Miguel Arcángel</Text>
            </View>
            <AppButton label="Conoce nuestra comunidad" href="/nosotros" variant="secondary" />
          </View>
        </View>
      </View>
    </Container>
  </View>;
}

const styles = StyleSheet.create({
  section: { backgroundColor: tokens.color.sand, paddingVertical: 40 },
  sectionCompact: { paddingVertical: 32 },
  sectionMobile: { paddingVertical: 24 },
  layoutMobile: { gap: 18 },
  imageMobile: { aspectRatio: 2, maxHeight: 220 },
  accentMobile: { marginTop: 10, marginBottom: 12, width: 48 },
  titleMobile: { fontSize: 25, lineHeight: 31, marginBottom: 12 },
  bodyMobile: { fontSize: 16, lineHeight: 23, marginBottom: 8 },
  readMore: { alignSelf: 'flex-start', minHeight: 44, justifyContent: 'center' },
  readMoreText: { color: tokens.color.navyDeep, fontSize: 16, fontWeight: '700' },
  layout: { flexDirection: 'row', alignItems: 'center', gap: 40 },
  layoutCompact: { flexDirection: 'column', alignItems: 'stretch', gap: 28 },
  image: { width: '29%', aspectRatio: 1, maxHeight: 330, borderRadius: tokens.radius.lg },
  imageCompact: { width: '100%', aspectRatio: 1.5, maxHeight: 300 },
  copy: { flex: 1 },
  eyebrow: { ...tokens.type.eyebrow, color: tokens.color.wine },
  accent: { width: 64, height: 4, backgroundColor: tokens.color.gold, marginTop: 16, marginBottom: 20 },
  title: { ...tokens.type.title, fontSize: 36, lineHeight: 43, color: tokens.color.navyDeep, marginBottom: 20 },
  titleCompact: { fontSize: 30, lineHeight: 37 },
  body: { ...tokens.type.body, color: tokens.color.muted, marginBottom: 16 },
  footer: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginTop: 12 },
  signature: { borderLeftWidth: 2, borderLeftColor: tokens.color.gold, paddingLeft: 16 },
  signatureTitle: { ...tokens.type.bodyStrong, color: tokens.color.navyDeep },
  signatureSubtitle: { ...tokens.type.body, color: tokens.color.muted },
});
