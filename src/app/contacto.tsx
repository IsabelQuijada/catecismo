import { createElement } from 'react';
import { Link } from 'expo-router';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Container, SiteFooter, SiteHeader } from '../components/ui';
import { semantic, tokens } from '../design/tokens';

const parishImage = require('../../assets/content/contacto/contacto-parroquia.png');
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=16+de+Septiembre+s%2Fn%2C+Centro%2C+48500+Cocula%2C+Jalisco%2C+Mexico';
const mapEmbedUrl = 'https://maps.google.com/maps?q=16%20de%20Septiembre%20Centro%20Cocula%20Jalisco%20Mexico&output=embed';
const watermark = require('../../assets/content/sacramentos/sacramentos-marca-agua.png');

export default function ContactScreen() {
  const compact = useWindowDimensions().width < 768;
  return <View style={styles.screen}><SiteHeader /><ScrollView>
    <View style={[styles.page, compact && styles.pageCompact]}>
      {!compact ? <Image source={watermark} style={styles.watermark} resizeMode="contain" pointerEvents="none" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" /> : null}
      <Container><View style={styles.heading}>
          <Text style={styles.eyebrow}>ESTAMOS PARA ACOMPAÑARTE</Text>{!compact && <View style={styles.accent} />}
          <Text accessibilityRole="header" aria-level={1} style={[styles.pageTitle, compact && styles.pageTitleCompact]}>Contacto</Text>
          <Text style={[styles.intro, compact && styles.introCompact]}>{compact ? 'Estamos aquí para ayudarte con cursos, inscripciones y requisitos.' : 'Para dudas sobre cursos, inscripciones y requisitos, acércate a la Notaría Parroquial de la Parroquia San Miguel Arcángel.'}</Text>
        </View>
        {compact && <View style={[styles.photoFrame, styles.photoFrameCompact, styles.mobilePhoto]}><Image source={parishImage} style={styles.fill} resizeMode="cover" accessibilityLabel="Vista de la parroquia en Cocula" /></View>}
        <View style={[styles.layout, compact && styles.layoutCompact]}>
          <View style={[styles.card, compact && styles.cardCompact]}>
            <View style={styles.parishHeading}>{!compact && <Text style={styles.parishSymbol} accessibilityElementsHidden>✝</Text>}<View style={[styles.parishCopy, compact && styles.parishCopyCompact]}><Text accessibilityRole="header" aria-level={2} style={[styles.parishTitle, compact && styles.parishTitleCompact]}>Notaría Parroquial</Text><Text style={[styles.body, compact && styles.bodyCompact]}>Parroquia San Miguel Arcángel</Text></View></View>
            {compact ? <>
              <ContactSection title="Teléfonos"><View style={styles.mobilePhones}><Link href="tel:+523777732115" asChild><Pressable accessibilityRole="link" accessibilityLabel="Llamar al 377 773 2115" style={styles.phoneLink}><Text style={styles.mobileLink}>377 773 2115</Text></Pressable></Link><Link href="tel:+523777734516" asChild><Pressable accessibilityRole="link" accessibilityLabel="Llamar al 377 773 4516" style={styles.phoneLink}><Text style={styles.mobileLink}>377 773 4516</Text></Pressable></Link></View></ContactSection>
              <ContactSection title="Horario de atención"><Text style={[styles.body, styles.bodyCompact]}>Lunes, martes, miércoles y viernes</Text><Text style={styles.scheduleTime}>10:00 a. m. – 2:00 p. m. y 4:00 – 7:00 p. m.</Text><Text style={[styles.body, styles.bodyCompact, styles.secondDay]}>Jueves y sábados</Text><Text style={styles.scheduleTime}>10:00 a. m. – 2:00 p. m.</Text></ContactSection>
              <ContactSection title="Cómo llegar" last><Text style={[styles.body, styles.bodyCompact]}>16 de Septiembre s/n, Centro, 48500 Cocula, Jal., México</Text><Link href={mapsUrl} asChild><Pressable accessibilityRole="link" style={styles.mobileMapLink}><Text style={styles.mobileLink}>Abrir en Google Maps ↗</Text></Pressable></Link></ContactSection>
            </> : <>
            <ContactSection title="Dirección"><Text style={styles.body}>16 de Septiembre s/n, Centro, 48500 Cocula, Jal., México</Text></ContactSection>
            <ContactSection title="Teléfonos"><View style={styles.phones}><Link href="tel:+523777732115" style={styles.link}>+52 377 773 2115</Link><Link href="tel:+523777734516" style={styles.link}>+52 377 773 4516</Link></View></ContactSection>
            <ContactSection title="Horario de atención" last><Text style={styles.body}>Lunes, martes, miércoles y viernes: 10:00 a. m. – 2:00 p. m. y 4:00 – 7:00 p. m.</Text><Text style={[styles.body, styles.secondDay]}>Jueves y sábados: 10:00 a. m. – 2:00 p. m.</Text></ContactSection>
            </>}
          </View>
        {!compact && <View style={styles.photoFrame}><Image source={parishImage} style={styles.fill} resizeMode="cover" accessibilityLabel="Vista de la parroquia en Cocula" /></View>}
      </View>
      {!compact && <View style={styles.mapSection}>
        <Text accessibilityRole="header" aria-level={2} style={styles.mapTitle}>Cómo llegar</Text>
        <View style={styles.mapFrame}>
          {Platform.OS === 'web' ? createElement('iframe', { src: mapEmbedUrl, title: 'Mapa de la parroquia en Cocula', loading: 'lazy', style: { width: '100%', height: 280, border: 0, display: 'block' } }) : <View style={styles.mapFallback}><Text style={styles.body}>16 de Septiembre s/n, Centro, Cocula, Jalisco</Text></View>}
          <Link href={mapsUrl} asChild><Pressable accessibilityRole="link" style={styles.mapLink}><Text style={styles.link}>Abrir en Google Maps ↗</Text></Pressable></Link>
        </View>
      </View>}</Container>
    </View>
    <SiteFooter />
  </ScrollView></View>;
}

function ContactSection({ title, children, last = false }: { title: string; children: React.ReactNode; last?: boolean }) {
  return <View style={[styles.contactSection, last && styles.contactSectionLast]}><Text accessibilityRole="header" aria-level={3} style={styles.rowTitle}>{title}</Text>{children}</View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: semantic.screen.background }, page: { position: 'relative', overflow: 'hidden', paddingTop: tokens.space.xxl, paddingBottom: tokens.space.hero }, pageCompact: { paddingTop: tokens.space.xl, paddingBottom: tokens.space.xxl },
  watermark: { position: 'absolute', right: 0, bottom: 0, width: '45%', height: 200, opacity: 0.3 }, heading: { maxWidth: 700 }, layout: { flexDirection: 'row', alignItems: 'stretch', gap: tokens.space.lg }, layoutCompact: { flexDirection: 'column', gap: tokens.space.lg },
  eyebrow: { ...tokens.type.eyebrow, color: tokens.color.wine, marginBottom: tokens.space.sm }, accent: { width: 42, height: 3, backgroundColor: tokens.color.gold, marginBottom: tokens.space.md }, pageTitle: { ...tokens.type.display, color: tokens.color.navyDeep, marginBottom: tokens.space.sm }, pageTitleCompact: { fontSize: 36, lineHeight: 42 }, intro: { ...tokens.type.body, color: semantic.screen.mutedText, maxWidth: 580, marginBottom: tokens.space.lg },
  card: { flex: 1, minWidth: 0, backgroundColor: tokens.color.white, borderRadius: tokens.radius.md, padding: tokens.space.xl }, cardCompact: { padding: tokens.space.lg }, parishHeading: { flexDirection: 'row', alignItems: 'center', gap: tokens.space.md, marginBottom: tokens.space.md }, parishSymbol: { color: tokens.color.gold, fontSize: 38, width: 48, textAlign: 'center' }, parishCopy: { flex: 1, borderLeftWidth: 2, borderLeftColor: tokens.color.gold, paddingLeft: tokens.space.md }, parishTitle: { ...tokens.type.title, fontSize: 24, lineHeight: 30, color: tokens.color.navyDeep },
  contactSection: { paddingVertical: tokens.space.md, borderBottomWidth: 1, borderBottomColor: tokens.color.line }, contactSectionLast: { borderBottomWidth: 0, paddingBottom: 0 }, rowTitle: { ...tokens.type.bodyStrong, color: tokens.color.navyDeep, marginBottom: tokens.space.xxs }, body: { ...tokens.type.body, color: semantic.screen.mutedText }, phones: { flexDirection: 'row', flexWrap: 'wrap', columnGap: tokens.space.lg, rowGap: tokens.space.xs }, link: { ...tokens.type.bodyStrong, color: tokens.color.blue }, secondDay: { marginTop: tokens.space.xs },
  mapSection: { marginTop: tokens.space.xxl }, mapTitle: { ...tokens.type.title, color: tokens.color.navyDeep, marginBottom: tokens.space.md }, mapFrame: { borderRadius: tokens.radius.md, overflow: 'hidden', borderWidth: 1, borderColor: tokens.color.line, backgroundColor: tokens.color.white }, mapFallback: { minHeight: 100, justifyContent: 'center', padding: tokens.space.lg, backgroundColor: tokens.color.blueSoft }, mapLink: { minHeight: 48, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: tokens.space.md },
  photoFrame: { width: '40%', maxWidth: 420, borderRadius: tokens.radius.md, overflow: 'hidden' }, photoFrameCompact: { width: '100%', maxWidth: 420, alignSelf: 'center', aspectRatio: 16 / 7 }, mobilePhoto: { marginBottom: tokens.space.lg }, fill: { width: '100%', height: '100%' },
  introCompact: { fontSize: 16, lineHeight: 24, marginBottom: tokens.space.md }, parishCopyCompact: { borderLeftWidth: 0, paddingLeft: 0 }, parishTitleCompact: { fontSize: 21, lineHeight: 27 }, bodyCompact: { fontSize: 15, lineHeight: 22 },
  mobilePhones: { alignItems: 'flex-start' }, phoneLink: { minHeight: 44, justifyContent: 'center' }, mobileLink: { ...tokens.type.bodyStrong, color: tokens.color.blue, fontSize: 15 }, scheduleTime: { ...tokens.type.bodyStrong, color: tokens.color.navyDeep, fontSize: 15, lineHeight: 22 }, mobileMapLink: { minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' },
});
