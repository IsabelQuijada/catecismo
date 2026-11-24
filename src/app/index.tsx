import { useEffect, useRef, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, ScrollViewInstance, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { contentRepository } from '../content/repository';
import { semantic, tokens } from '../design/tokens';
import { SelectedAnnouncement } from '../components/content';
import { ParishMessage } from '../components/parish-message';
import { ActivityAnnouncements } from '../components/activity-announcements';
import { SacramentEntries } from '../components/sacraments';
import { Container, Section, SiteFooter, SiteHeader } from '../components/ui';

const heroImage = require('../../assets/content/hero/hero-image-parroquia1.png');

export default function HomeScreen() {
  const { seccion } = useLocalSearchParams<{ seccion?: string }>();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const [announcementsY, setAnnouncementsY] = useState<number>();
  useEffect(() => {
    if (seccion === 'avisos' && announcementsY !== undefined) {
      scrollRef.current?.scrollTo({ y: announcementsY, animated: false });
    }
  }, [seccion, announcementsY]);
  const compact = useWindowDimensions().width < tokens.breakpoint.compact;
  const urgent = contentRepository.getActiveAnnouncement();

  return <View style={styles.screen}>
    <SiteHeader />
    <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.hero, compact && styles.heroCompact]}>
        <Container style={styles.heroContainer}>
          <View style={[styles.heroGrid, compact && styles.heroGridCompact]}>
            <View style={[styles.heroCopy, compact && styles.heroCopyCompact]}>
              <Text style={[styles.heroEyebrow, compact && styles.heroEyebrowCompact]}>{compact ? 'CATEQUESIS INFANTIL · COCULA' : 'CATEQUESIS INFANTIL · COCULA, JALISCO'}</Text>
              <Text style={[styles.heroTitle, compact && styles.heroTitleCompact]}>
                Pequeños corazones,{`\n`}grandes caminos de fe.
              </Text>
              <Text style={styles.heroBody}>Un lugar para conocer a Jesús, hacer amigos y crecer juntos en el amor de Dios.</Text>
              <View style={styles.actions}>
                <Link href="/avisos" asChild><Pressable style={styles.heroPrimaryButton}><Text style={styles.heroPrimaryLabel}>Ver avisos  →</Text></Pressable></Link>
              </View>
            </View>
            <View style={[styles.heroArt, compact && styles.heroArtCompact]}>
              <Image source={heroImage} style={styles.heroImage} resizeMode="contain" accessibilityLabel="Ilustración de Jesús compartiendo la fe con niños" />
            </View>
          </View>
        </Container>
      </View>

      <SelectedAnnouncement notice={urgent} />
      <View onLayout={(event) => setAnnouncementsY(event.nativeEvent.layout.y)}>
        <ActivityAnnouncements announcements={contentRepository.getActiveCommunityAnnouncements()} />
      </View>

      <Section eyebrow="Caminos de fe" title="Te acompañamos en cada paso">
        <Text style={styles.sacramentDescription}>Descubre los sacramentos y cómo prepararte para recibirlos.</Text>
        <SacramentEntries />
      </Section>

      <ParishMessage />

      <SiteFooter />
    </ScrollView>
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: tokens.layout.fill, backgroundColor: semantic.screen.background },
  scrollContent: { flexGrow: tokens.layout.fill },
  hero: { backgroundColor: semantic.surface.dark, paddingVertical: tokens.space.xxl, overflow: 'hidden' },
  heroCompact: { paddingVertical: tokens.space.xl },
  heroGridCompact: { flexDirection: 'column', alignItems: 'stretch', gap: tokens.space.lg },
  heroCopyCompact: { width: '100%' }, heroTitleCompact: { fontSize: 36, lineHeight: 43 },
  heroArtCompact: { width: '100%', maxWidth: 480, alignSelf: 'center', borderRadius: tokens.radius.lg },
  heroEyebrowCompact: { fontSize: 11, lineHeight: 16, marginBottom: tokens.space.sm },
  heroPrimaryButton: { minHeight: 48, paddingHorizontal: 20, borderRadius: tokens.radius.pill, backgroundColor: tokens.color.goldSoft, justifyContent: 'center' },
  heroPrimaryLabel: { ...tokens.type.label, color: tokens.color.navyDeep },
  heroContainer: { maxWidth: tokens.size.heroContent },
  heroGrid: { flexDirection: tokens.layout.row, alignItems: tokens.layout.center, justifyContent: tokens.layout.between, gap: tokens.space.xxl },
  heroCopy: { width: tokens.size.heroText },
  heroEyebrow: { ...tokens.type.eyebrow, color: tokens.color.goldSoft, marginBottom: tokens.space.md },
  heroTitle: { ...tokens.type.display, color: semantic.action.onAction, marginBottom: tokens.space.md },
  heroBody: { ...tokens.type.body, color: tokens.color.blueSoft, maxWidth: tokens.size.heroText, marginBottom: tokens.space.lg },
  actions: { flexDirection: tokens.layout.row, flexWrap: tokens.layout.wrap, gap: tokens.space.sm },
  heroArt: { width: tokens.size.heroArtWidth, aspectRatio: tokens.ratio.heroImage, borderRadius: tokens.radius.xl, backgroundColor: semantic.surface.dark, overflow: 'hidden' },
  heroImage: { width: tokens.layout.full, height: tokens.layout.full },
  cardGrid: { flexDirection: tokens.layout.row, flexWrap: tokens.layout.wrap, gap: tokens.space.lg },
  pathGrid: { flexDirection: tokens.layout.row, gap: tokens.space.lg },
  path: { flex: tokens.layout.fill, padding: tokens.space.lg, borderTopColor: tokens.color.gold, borderTopWidth: tokens.space.xxs, backgroundColor: semantic.surface.base },
  pathNumber: { fontSize: tokens.size.iconLg, color: tokens.color.gold, marginBottom: tokens.space.md },
  pathTitle: { ...tokens.type.title, color: semantic.screen.text, marginBottom: tokens.space.xs },
  pathBody: { ...tokens.type.body, color: semantic.screen.mutedText },
  sacramentDescription: { ...tokens.type.body, color: semantic.screen.mutedText, marginTop: -24, marginBottom: tokens.space.sm },
  sectionAction: { marginTop: tokens.space.lg },
});
