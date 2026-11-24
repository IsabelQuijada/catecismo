import { ComponentRef, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { CenterDirectory } from '../components/centers';
import { Container, SiteFooter, SiteHeader } from '../components/ui';
import { contentRepository } from '../content/repository';
import { semantic, tokens } from '../design/tokens';

const watermark = require('../../assets/content/centros/templo-marca-agua.png');

export default function CentersScreen() {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const directoryY = useRef(0);
  const showWatermark = width >= tokens.breakpoint.compact;
  const wide = width >= tokens.breakpoint.wide;
  return <View style={styles.screen}>
    <SiteHeader />
    <ScrollView ref={scrollRef}>
      <Container style={styles.content}>
        <View style={[styles.heading, !showWatermark && styles.headingCompact]}>
          <View style={[styles.headingCopy, showWatermark && styles.headingCopyWithImage]}>
            <Text style={styles.eyebrow}>CATEQUESIS EN TU BARRIO</Text>
            <View style={styles.accent} />
            <Text accessibilityRole="header" aria-level={1} style={[styles.title, !showWatermark && styles.titleCompact]}>{!showWatermark ? 'Encuentra tu centro de catequesis' : 'Centros de catequesis'}</Text>
            <Text style={styles.body}>{!showWatermark ? 'Consulta los centros, grupos y horarios de tu comunidad.' : 'Conoce los templos donde se imparte el catecismo, sus grupos y horarios.'}</Text>
          </View>
          {showWatermark ? <Image source={watermark} style={[styles.watermark, !wide && styles.watermarkTablet]} resizeMode="contain" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" /> : null}
        </View>
        <View onLayout={(event) => { directoryY.current = event.nativeEvent.layout.y; }}>
          <CenterDirectory centers={contentRepository.getActiveCenters()} onSelectMobile={(detailY) => scrollRef.current?.scrollTo({ y: directoryY.current + detailY, animated: true })} />
        </View>
      </Container>
      <SiteFooter />
    </ScrollView>
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: semantic.screen.background },
  content: { maxWidth: 1120 },
  heading: { position: 'relative', paddingTop: tokens.space.xxl, paddingBottom: tokens.space.xl },
  headingCompact: { paddingTop: tokens.space.lg, paddingBottom: tokens.space.md }, titleCompact: { fontSize: 32, lineHeight: 38, marginBottom: tokens.space.sm },
  headingCopy: { maxWidth: 760 },
  headingCopyWithImage: { width: '58%' },
  eyebrow: { ...tokens.type.eyebrow, color: tokens.color.wine, marginBottom: tokens.space.sm },
  accent: { width: 48, height: 2, backgroundColor: tokens.color.gold, marginBottom: tokens.space.md },
  title: { ...tokens.type.display, color: semantic.screen.text, marginBottom: tokens.space.md },
  body: { ...tokens.type.body, color: semantic.screen.mutedText, maxWidth: 640 },
  watermark: { position: 'absolute', right: 0, bottom: tokens.space.sm, width: '41%', height: 230, opacity: 0.3 },
  watermarkTablet: { width: '39%', height: 175 },
});
