import { Image, ImageSourcePropType, Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { AppButton, Container, SiteFooter, SiteHeader } from '../components/ui';
import { semantic, tokens } from '../design/tokens';

const parishImage = require('../../assets/content/nosotros/hero-cocula.png');
const missionImage = require('../../assets/content/nosotros/nuestra-mision.png');
const communityImage = require('../../assets/content/nosotros/quines-hacen-posible.png');
const centerImage = require('../../assets/content/nosotros/caminamos-juntos.png');
const watermark = require('../../assets/content/sacramentos/sacramentos-marca-agua.png');

export default function AboutScreen() {
  const compact = useWindowDimensions().width < 768;
  return <View style={styles.screen}><SiteHeader /><ScrollView>
    <View style={[styles.hero, compact && styles.heroCompact]}>
      {!compact ? <><Image source={parishImage} style={styles.heroBackground} resizeMode="cover" accessibilityLabel="Vista de Cocula y su parroquia" /><View pointerEvents="none" style={styles.heroFade} /></> : null}
      <Container><View style={[styles.heroCopy, compact && styles.heroCopyCompact]}>
        <View style={styles.heroEyebrow}><Text style={styles.eyebrow}>NUESTRA COMUNIDAD</Text><View style={styles.heroAccent} /></View>
        <Text accessibilityRole="header" aria-level={1} style={[styles.title, compact && styles.titleCompact]}>Una comunidad{compact ? ' ' : '\n'}que crece en la fe</Text>
        <Text style={styles.lead}>Acompañamos a niñas, niños y familias de Cocula en su encuentro con Jesús.</Text>
      </View>
      {compact ? <View style={styles.heroImageCompact}><Image source={parishImage} style={styles.imageFill} resizeMode="cover" accessibilityLabel="Vista de Cocula y su parroquia" /></View> : null}</Container>
    </View>
    <Container>
      <StorySection compact={compact} title="Nuestra misión" body="Anunciar el Evangelio a niñas y niños, acompañándolos en el conocimiento, la celebración y la vivencia de la fe, junto a sus familias y nuestra comunidad parroquial." image={missionImage} imageLabel="Materiales para la catequesis" />
      <StorySection compact={compact} reverse title="Caminamos juntos" body="La catequesis es un camino compartido, donde niñas, niños, familias y catequistas crecemos juntos en la fe, fortaleciendo los lazos de nuestra comunidad." image={centerImage} imageLabel="Salón de catequesis" />
    </Container>
    <View style={styles.quote}><View style={[styles.branch, styles.branchLeft]} accessibilityElementsHidden><View style={styles.branchStem} /><View style={[styles.leaf, styles.leafOne]} /><View style={[styles.leaf, styles.leafTwo]} /><View style={[styles.leaf, styles.leafThree]} /></View><View style={[styles.branch, styles.branchRight]} accessibilityElementsHidden><View style={styles.branchStem} /><View style={[styles.leaf, styles.leafOne]} /><View style={[styles.leaf, styles.leafTwo]} /><View style={[styles.leaf, styles.leafThree]} /></View><Container><Text style={styles.quoteText}>“La fe se descubre, se comparte{compact ? ' ' : '\n'}y se vive en comunidad.”</Text><View style={styles.quoteAccent} /></Container></View>
    <Container><StorySection compact={compact} title="Quienes hacen posible este camino" body="Las personas que colaboran en la catequesis acompañan a las familias y comparten su fe con las niñas y los niños en su preparación para los sacramentos." image={communityImage} imageLabel="Actividad de catequesis con materiales de manualidades" /></Container>
    <View style={styles.invitation}>
      {!compact ? <Image source={watermark} style={styles.watermark} resizeMode="contain" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" pointerEvents="none" /> : null}
      <Container><View style={styles.invitationContent}><Text style={styles.invitationIcon} accessibilityElementsHidden>♡</Text><Text accessibilityRole="header" aria-level={2} style={[styles.heading, styles.centered]}>Forma parte de nuestra comunidad</Text><Text style={styles.invitationBody}>Conoce los centros de catequesis y las opciones de preparación para tu familia.</Text><View style={styles.action}><AppButton label="Conoce nuestros centros" href="/centros" /></View></View></Container>
    </View>
    <SiteFooter />
  </ScrollView></View>;
}

function StorySection({ compact, reverse = false, title, body, image, imageLabel }: { compact: boolean; reverse?: boolean; title: string; body: string; image: ImageSourcePropType; imageLabel: string }) {
  return <View style={[styles.story, reverse && !compact && styles.storyReverse, compact && styles.storyCompact]}>
    <View style={styles.storyCopy}><Text accessibilityRole="header" aria-level={2} style={styles.heading}>{title}</Text><View style={styles.storyAccent} /><Text style={styles.body}>{body}</Text></View>
    <View style={[styles.storyImage, compact && styles.storyImageCompact]}><Image source={image} style={styles.imageFill} resizeMode="cover" accessibilityLabel={imageLabel} /></View>
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: semantic.screen.background },
  hero: { position: 'relative', minHeight: 360, justifyContent: 'center', overflow: 'hidden' }, heroCompact: { minHeight: 0, paddingVertical: tokens.space.xl },
  heroBackground: { position: 'absolute', right: 0, top: 0, width: '65%', height: '100%' },
  heroFade: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '80%', ...Platform.select({ web: { backgroundImage: 'linear-gradient(to right, #FBF7EE 45%, rgba(251, 247, 238, 0.96) 55%, rgba(251, 247, 238, 0) 100%)' } as object, default: { backgroundColor: tokens.color.cream, opacity: 0.85 } }) },
  heroCopy: { width: '45%', maxWidth: 430 }, heroEyebrow: { flexDirection: 'row', alignItems: 'center', gap: tokens.space.sm, marginBottom: tokens.space.lg }, eyebrow: { ...tokens.type.eyebrow, color: tokens.color.wine }, heroAccent: { width: 48, height: 2, backgroundColor: tokens.color.gold },
  title: { ...tokens.type.display, fontSize: 44, lineHeight: 52, color: tokens.color.navyDeep, marginBottom: tokens.space.md }, titleCompact: { fontSize: 36, lineHeight: 42 }, lead: { ...tokens.type.body, color: semantic.screen.mutedText, maxWidth: 400 },
  heroCopyCompact: { width: '100%' },
  heroImageCompact: { width: '100%', aspectRatio: 1619 / 971, borderRadius: tokens.radius.md, overflow: 'hidden', marginTop: tokens.space.lg },
  story: { flexDirection: 'row', alignItems: 'center', gap: tokens.space.xxl, paddingVertical: tokens.space.xxl, borderTopWidth: 1, borderTopColor: tokens.color.sand }, storyReverse: { flexDirection: 'row-reverse' }, storyCompact: { flexDirection: 'column', alignItems: 'stretch', gap: tokens.space.lg, paddingVertical: tokens.space.xl },
  storyCopy: { flex: 1, minWidth: 0 }, heading: { ...tokens.type.title, color: tokens.color.navyDeep }, storyAccent: { width: 40, height: 2, backgroundColor: tokens.color.gold, marginVertical: tokens.space.md }, body: { ...tokens.type.body, color: semantic.screen.mutedText },
  storyImage: { width: '42%', maxWidth: 440, aspectRatio: 1619 / 971, borderRadius: tokens.radius.md, overflow: 'hidden', flexShrink: 0 }, storyImageCompact: { width: '100%', alignSelf: 'center' },
  imageFill: { width: '100%', height: '100%' },
  quote: { backgroundColor: tokens.color.navyDeep, paddingVertical: tokens.space.xl, overflow: 'hidden', position: 'relative' }, quoteText: { color: tokens.color.white, textAlign: 'center', fontSize: 25, lineHeight: 34, fontWeight: '600', fontStyle: 'italic', fontFamily: Platform.select({ web: 'Georgia, serif', ios: 'Georgia', default: 'serif' }) }, quoteAccent: { width: 48, height: 3, backgroundColor: tokens.color.gold, alignSelf: 'center', marginTop: tokens.space.md },
  branch: { position: 'absolute', width: 140, height: 90, bottom: 0, opacity: 0.18 }, branchLeft: { left: 0 }, branchRight: { right: 0, transform: [{ scaleX: -1 }] }, branchStem: { position: 'absolute', left: 0, bottom: 16, width: 130, height: 3, backgroundColor: tokens.color.blue, transform: [{ rotate: '-24deg' }] }, leaf: { position: 'absolute', width: 38, height: 19, borderTopLeftRadius: 38, borderBottomRightRadius: 38, backgroundColor: tokens.color.blue }, leafOne: { left: 23, bottom: 38, transform: [{ rotate: '-58deg' }] }, leafTwo: { left: 57, bottom: 52, transform: [{ rotate: '-52deg' }] }, leafThree: { left: 80, bottom: 24, transform: [{ rotate: '20deg' }] },
  invitation: { position: 'relative', overflow: 'hidden', paddingVertical: tokens.space.xxl }, watermark: { position: 'absolute', right: 0, bottom: 0, width: '50%', height: '100%', opacity: 0.55 }, invitationContent: { alignItems: 'center' }, invitationIcon: { fontSize: 40, color: tokens.color.gold, marginBottom: tokens.space.xs }, centered: { textAlign: 'center' }, invitationBody: { ...tokens.type.body, color: semantic.screen.mutedText, textAlign: 'center', maxWidth: 580, marginTop: tokens.space.sm }, action: { marginTop: tokens.space.lg },
});
