import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { contentRepository } from '../content/repository';
import { semantic, tokens } from '../design/tokens';
import { CourseCard, SelectedAnnouncement } from '../components/content';
import { ActivityAnnouncements } from '../components/activity-announcements';
import { SacramentEntries } from '../components/sacraments';
import { AppButton, Container, EmptyState, Section, SiteFooter, SiteHeader } from '../components/ui';

const heroImage = require('../../assets/content/hero/hero-image-parroquia1.png');

export default function HomeScreen() {
  const compact = useWindowDimensions().width < tokens.breakpoint.compact;
  const urgent = contentRepository.getActiveAnnouncement();
  const openCourses = contentRepository.getOpenCourses();

  return <View style={styles.screen}>
    <SiteHeader />
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={[styles.hero, compact && styles.heroCompact]}>
        <Container style={styles.heroContainer}>
          <View style={[styles.heroGrid, compact && styles.heroGridCompact]}>
            <View style={[styles.heroCopy, compact && styles.heroCopyCompact]}>
              <Text style={styles.heroEyebrow}>CATEQUESIS INFANTIL · COCULA, JALISCO</Text>
              <Text style={[styles.heroTitle, compact && styles.heroTitleCompact]}>
                Pequeños corazones,{`\n`}grandes caminos de fe.
              </Text>
              <Text style={styles.heroBody}>Un lugar para conocer a Jesús, hacer amigos y crecer juntos en el amor de Dios.</Text>
              <View style={styles.actions}>
                <AppButton label="Ver avisos" href="/avisos" />
                <AppButton label="Conoce los sacramentos" href="/sacramentos" variant="secondary" />
              </View>
            </View>
            <View style={[styles.heroArt, compact && styles.heroArtCompact]}>
              <Image source={heroImage} style={styles.heroImage} resizeMode="contain" accessibilityLabel="Ilustración de Jesús compartiendo la fe con niños" />
            </View>
          </View>
        </Container>
      </View>

      <SelectedAnnouncement notice={urgent} />
      <ActivityAnnouncements announcements={contentRepository.getActiveCommunityAnnouncements()} />

      <Section eyebrow="Caminos de fe" title="Te acompañamos en cada paso">
        <Text style={styles.sacramentDescription}>Descubre los sacramentos y cómo prepararte para recibirlos.</Text>
        <SacramentEntries />
      </Section>

      <Section eyebrow="Formación" title="Cursos disponibles" tone="warm">
        {openCourses.length ? <View style={styles.cardGrid}>{openCourses.map((course) => <CourseCard key={course.id} course={course} />)}</View> : <EmptyState title="Inscripciones por anunciar" body="Cuando inicien nuevas inscripciones, encontrarás aquí todos los requisitos." />}
        <View style={styles.sectionAction}><AppButton label="Encuentra tu centro y horario" href="/centros" variant="secondary" /></View>
      </Section>

      <Section eyebrow="Nuestra comunidad" title="Caminamos juntos en la fe">
        <Text style={styles.aboutDescription}>Acompañamos a las niñas, los niños y sus familias en un camino de fe, encuentro y comunidad.</Text>
        <View style={styles.sectionAction}><AppButton label="Conoce nuestra comunidad" href="/nosotros" variant="secondary" /></View>
      </Section>
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
  heroArtCompact: { width: '100%', maxWidth: 480, alignSelf: 'center' },
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
  aboutDescription: { ...tokens.type.body, color: semantic.screen.mutedText, maxWidth: 650 },
});
