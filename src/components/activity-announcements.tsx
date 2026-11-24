import { useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Image, ImageSourcePropType, Pressable, ScrollView, ScrollViewInstance, StyleSheet, Text, useWindowDimensions, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { CommunityAnnouncement } from '../content/types';
import { semantic, tokens } from '../design/tokens';
import { Container, EmptyState } from './ui';
import { Link } from 'expo-router';

const announcementArtwork = {
  advent: require('../../assets/content/announcements/cards/tarjeta1.webp'),
  sacraments: require('../../assets/content/announcements/cards/tarjeta2.webp'),
  books: require('../../assets/content/announcements/cards/tarjeta3.webp'),
  guadalupe: require('../../assets/content/announcements/cards/tarjeta4.webp'),
  nativity: require('../../assets/content/announcements/cards/tarjeta5.webp'),
};

const CARD_GAP = 24;
const MAX_CONTENT_WIDTH = 1600;

type ActivityAnnouncementsProps = { announcements: CommunityAnnouncement[] };

export function ActivityAnnouncements({ announcements }: ActivityAnnouncementsProps) {
  const { width: viewportWidth } = useWindowDimensions();
  const [scrollOffset, setScrollOffset] = useState(0);
  const [heightMeasurement, setHeightMeasurement] = useState({ key: '', height: 540 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const scrollRef = useRef<ScrollViewInstance | null>(null);
  const compact = viewportWidth < 768;
  const containerPadding = viewportWidth < 768 ? 16 : viewportWidth < 1024 ? 24 : viewportWidth < 1440 ? 32 : 40;
  const contentWidth = Math.min(viewportWidth, MAX_CONTENT_WIDTH) - containerPadding * 2;
  const dotHitWidth = Math.min(44, contentWidth / Math.max(1, announcements.length));
  const cardWidth = useMemo(() => {
    if (viewportWidth < 768) return (contentWidth - CARD_GAP) / 1.15;
    if (viewportWidth < 1024) return (contentWidth - CARD_GAP * 2) / 2.2;
    if (viewportWidth < 1440) return (contentWidth - CARD_GAP * 3) / 3.25;
    return (contentWidth - CARD_GAP * 4) / 4.25;
  }, [contentWidth, viewportWidth]);
  const stride = cardWidth + CARD_GAP;
  const maxScrollOffset = Math.max(0, announcements.length * stride - CARD_GAP - contentWidth);
  const hasOverflow = maxScrollOffset > 2;
  const activeCardIndex = hasOverflow ? Math.min(announcements.length - 1, Math.round(scrollOffset / stride)) : 0;
  const announcementKey = announcements.map((item) => item.id).join('|');
  const measurementKey = `${announcementKey}:${cardWidth}`;
  const cardHeight = compact ? 0 : heightMeasurement.key === measurementKey ? heightMeasurement.height : 540;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ x: 0, animated: false });
  }, [announcementKey, cardWidth]);

  const moveToCard = (index: number) => {
    const targetIndex = Math.max(0, Math.min(announcements.length - 1, index));
    scrollRef.current?.scrollTo({ x: Math.min(targetIndex * stride, maxScrollOffset), animated: !reduceMotion });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  };

  return <View style={[styles.section, compact && styles.sectionCompact]}>
    <Container style={{ maxWidth: MAX_CONTENT_WIDTH, paddingHorizontal: containerPadding }}>
      <View style={[styles.headingRow, viewportWidth < 768 ? styles.headingRowCompact : undefined]}>
        <Text accessibilityRole="header" style={[styles.title, viewportWidth < 768 ? styles.titleCompact : undefined]}>{compact ? 'Avisos y actividades' : 'Avisos, encuentros y actividades para nuestra comunidad.'}</Text>
      </View>
      {announcements.length ? <View style={styles.carousel}>
        <View style={styles.carouselViewport}>
        <ScrollView
          ref={scrollRef}
          horizontal
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={stride}
          snapToAlignment="start"
          pagingEnabled={viewportWidth >= 768}
          contentContainerStyle={styles.track}
          style={styles.scrollView}
          accessibilityLabel="Carrusel de actividades y avisos. Desliza horizontalmente para ver más tarjetas."
          accessibilityRole="adjustable"
          keyboardShouldPersistTaps="handled"
        >
          {announcements.map((item) => <ActivityCard
            key={item.id}
            item={item}
            width={cardWidth}
            compact={compact}
            minimumHeight={cardHeight}
            onHeightChange={(height) => setHeightMeasurement((current) => ({ key: measurementKey, height: Math.max(current.key === measurementKey ? current.height : 540, height) }))}
          />)}
        </ScrollView>
        {hasOverflow && !compact ? <>
          <View style={[styles.arrowPosition, styles.arrowLeft]}><CarouselArrow label="Ver aviso anterior" direction="left" disabled={scrollOffset <= 4} onPress={() => moveToCard(activeCardIndex - 1)} /></View>
          <View style={[styles.arrowPosition, styles.arrowRight]}><CarouselArrow label="Ver aviso siguiente" direction="right" disabled={scrollOffset >= maxScrollOffset - 4} onPress={() => moveToCard(activeCardIndex + 1)} /></View>
        </> : null}
        </View>
        {hasOverflow ? <View style={styles.pagination} accessibilityLabel={`Aviso ${activeCardIndex + 1} de ${announcements.length}`}>
            {compact ? <CarouselArrow label="Ver aviso anterior" direction="left" disabled={scrollOffset <= 4} onPress={() => moveToCard(activeCardIndex - 1)} /> : null}
            {announcements.map((item, index) => <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={`Ver aviso ${index + 1}: ${item.title}`}
              accessibilityState={{ selected: activeCardIndex === index }}
              onPress={() => moveToCard(index)}
              style={[styles.dotHit, { width: dotHitWidth }]}
            ><View style={[styles.dot, activeCardIndex === index ? styles.dotActive : undefined]} /></Pressable>)}
            {compact ? <CarouselArrow label="Ver aviso siguiente" direction="right" disabled={scrollOffset >= maxScrollOffset - 4} onPress={() => moveToCard(activeCardIndex + 1)} /> : null}
          </View> : null}
      </View> : <EmptyState title="Pronto compartiremos nuevas actividades" body="Estamos preparando avisos y encuentros para nuestra comunidad." />}
    </Container>
  </View>;
}

function CarouselArrow({ label, direction, disabled, onPress }: { label: string; direction: 'left' | 'right'; disabled: boolean; onPress: () => void }) {
  return <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityState={{ disabled }}
    disabled={disabled}
    onPress={onPress}
    style={[styles.arrow, disabled ? styles.arrowDisabled : undefined]}
  >
    <Text style={styles.arrowGlyph}>{direction === 'left' ? '‹' : '›'}</Text>
  </Pressable>;
}

function ActivityCard({ item, width, compact, minimumHeight, onHeightChange }: { item: CommunityAnnouncement; width: number; compact: boolean; minimumHeight: number; onHeightChange: (height: number) => void }) {
  const date = item.eventDate ? new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${item.eventDate}T12:00:00`)) : undefined;
  const artwork = getArtwork(item);
  const categoryLabel = item.eyebrow ?? (item.category === 'evento' ? 'Próxima actividad' : item.category === 'inscripcion' ? 'Inscripciones' : 'Aviso importante');

  if (compact) return <View style={[styles.card, styles.cardCompact, { width }]}>
    <View style={styles.compactHeader}>
      {artwork ? <Image source={artwork} resizeMode="cover" style={styles.compactImage} accessibilityLabel={`Ilustración de ${item.title}`} /> : null}
      <View style={styles.compactHeading}>
        <Text style={[styles.category, styles.compactCategory]}>{categoryLabel.toLocaleUpperCase('es-MX')}</Text>
        <Text style={[styles.cardTitle, styles.compactTitle]}>{item.title}</Text>
      </View>
    </View>
    <Text numberOfLines={2} style={styles.compactDescription}>{item.description}</Text>
    <Text style={styles.compactDate}>{date ? capitalize(date) : item.location ?? item.eventTime ?? 'Fecha por confirmar'}</Text>
    <Link href={{ pathname: '/avisos/[id]', params: { id: item.id } }} asChild>
      <Pressable accessibilityRole="link" style={styles.cta}><Text style={styles.ctaText}>Ver información</Text><Text style={styles.ctaText}>→</Text></Pressable>
    </Link>
  </View>;

  return <View onLayout={(event) => onHeightChange(event.nativeEvent.layout.height)} style={[styles.card, { width, minHeight: minimumHeight }]}>
    {artwork ? <Image source={artwork} resizeMode="cover" style={[styles.cardImage, { height: (width - tokens.space.md * 1.5) / tokens.ratio.activityImage }]} accessibilityLabel={`Ilustración de ${item.title}`} /> : <View style={[styles.artMissing, { height: (width - tokens.space.md * 1.5) / tokens.ratio.activityImage }]} accessibilityElementsHidden />}
    <View style={styles.cardBody}>
      <Text style={styles.category}>{categoryLabel.toLocaleUpperCase('es-MX')}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.metadataGroup}>
          {date ? <Metadata label="Fecha" value={capitalize(date)} /> : item.location ? <Metadata label="Lugar" value={item.location} /> : item.eventTime ? <Metadata label="Hora" value={item.eventTime} /> : <Metadata label="Fecha" value="Por confirmar" />}
        </View>
        <Link href={{ pathname: '/avisos/[id]', params: { id: item.id } }} asChild>
          <Pressable accessibilityRole="link" style={styles.cta}><Text style={styles.ctaText}>Ver información</Text><Text style={styles.ctaText}>→</Text></Pressable>
        </Link>
      </View>
    </View>
  </View>;
}

function Metadata({ label, value }: { label: string; value: string }) {
  return <View style={styles.metadata}><Text style={styles.metadataIcon} accessibilityElementsHidden>▦</Text><Text style={styles.metadataLabel}>{label}</Text><Text style={styles.metadataText}>{value}</Text></View>;
}

export function getArtwork(item: CommunityAnnouncement): ImageSourcePropType | undefined {
  return item.imageKey ? announcementArtwork[item.imageKey] : undefined;
}

function capitalize(value: string): string {
  return value.charAt(0).toLocaleUpperCase('es-MX') + value.slice(1);
}

const styles = StyleSheet.create({
  section: { backgroundColor: tokens.color.activityBlue, paddingVertical: tokens.space.xxl },
  sectionCompact: { paddingVertical: tokens.space.lg },
  headingRow: { flexDirection: tokens.layout.row, alignItems: tokens.layout.center, justifyContent: tokens.layout.between, gap: tokens.space.lg, marginBottom: tokens.space.lg },
  headingRowCompact: { flexDirection: tokens.layout.column, alignItems: tokens.layout.stretch, gap: tokens.space.sm, marginBottom: tokens.space.md },
  title: { flex: 1, fontSize: 33, lineHeight: 40, fontWeight: '700', color: tokens.color.activityText },
  titleCompact: { fontSize: 27, lineHeight: 34 },
  carousel: { paddingBottom: tokens.space.xs },
  carouselViewport: { position: 'relative' },
  arrowPosition: { position: 'absolute', top: '50%', marginTop: -22, zIndex: 1 },
  arrowLeft: { left: 0 },
  arrowRight: { right: 0 },
  scrollView: { width: tokens.layout.full },
  track: { gap: CARD_GAP, alignItems: 'stretch', paddingVertical: tokens.space.xs },
  card: { padding: tokens.space.sm, backgroundColor: semantic.surface.base, borderRadius: tokens.radius.lg, overflow: 'hidden', ...tokens.shadow.card },
  cardCompact: { padding: 16, gap: 12 },
  compactHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  compactImage: { width: 76, height: 76, borderRadius: tokens.radius.md },
  compactHeading: { flex: 1 },
  compactCategory: { fontSize: 10, lineHeight: 14, marginBottom: 6, paddingHorizontal: 8 },
  compactTitle: { fontSize: 19, lineHeight: 24, marginBottom: 0 },
  compactDescription: { fontSize: 15, lineHeight: 21, color: tokens.color.activityMuted },
  compactDate: { fontSize: 14, lineHeight: 20, fontWeight: '700', color: tokens.color.activityText },
  cardImage: { width: '100%', height: 210, borderRadius: tokens.radius.md, backgroundColor: semantic.surface.base },
  artMissing: { width: '100%', height: 210, borderRadius: tokens.radius.md, backgroundColor: semantic.surface.subtle },
  cardBody: { flex: 1, paddingHorizontal: tokens.space.xs, paddingTop: tokens.space.md, paddingBottom: tokens.space.xs },
  category: { alignSelf: 'flex-start', ...tokens.type.eyebrow, color: tokens.color.wine, backgroundColor: tokens.color.goldSoft, borderRadius: tokens.radius.pill, paddingHorizontal: tokens.space.sm, paddingVertical: tokens.space.xxs, marginBottom: tokens.space.sm },
  cardTitle: { fontSize: 23, lineHeight: 29, fontWeight: '700', color: tokens.color.activityText, marginBottom: tokens.space.xs },
  cardDescription: { ...tokens.type.body, color: tokens.color.activityMuted, marginBottom: tokens.space.md },
  cardFooter: { marginTop: 'auto', borderTopWidth: tokens.space.hairline, borderTopColor: tokens.color.blueSoft, paddingTop: tokens.space.md, gap: tokens.space.md },
  cta: { minHeight: tokens.size.button, alignSelf: 'flex-start', flexDirection: tokens.layout.row, alignItems: tokens.layout.center, justifyContent: tokens.layout.center, gap: tokens.space.sm, paddingHorizontal: tokens.space.md, borderRadius: tokens.radius.pill, backgroundColor: tokens.color.activityNavy },
  ctaText: { ...tokens.type.label, color: semantic.action.onAction },
  metadataGroup: { gap: tokens.space.xs, minHeight: 48, justifyContent: 'center' },
  metadata: { flexDirection: tokens.layout.row, gap: tokens.space.xs, alignItems: 'center', flexWrap: tokens.layout.wrap },
  metadataIcon: { fontSize: tokens.size.icon, color: tokens.color.activityNavy },
  metadataLabel: { ...tokens.type.label, color: tokens.color.activityText },
  metadataText: { ...tokens.type.body, color: tokens.color.activityText, flexShrink: tokens.layout.shrink },
  expandedDetails: { borderTopWidth: tokens.space.hairline, borderTopColor: tokens.color.line, paddingTop: tokens.space.md, marginTop: tokens.space.md },
  expandedTitle: { ...tokens.type.bodyStrong, color: tokens.color.activityText, marginBottom: tokens.space.xs },
  expandedText: { ...tokens.type.body, color: tokens.color.activityMuted, marginBottom: tokens.space.xs },
  arrow: { width: 44, height: 44, borderRadius: tokens.radius.pill, borderWidth: 1, borderColor: '#D6E4EB', backgroundColor: semantic.surface.base, alignItems: tokens.layout.center, justifyContent: tokens.layout.center, ...tokens.shadow.card },
  arrowDisabled: { opacity: 0.4 },
  arrowGlyph: { fontSize: 34, lineHeight: 40, color: tokens.color.activityNavy, marginTop: -3 },
  pagination: { flexDirection: tokens.layout.row, justifyContent: tokens.layout.center, alignItems: tokens.layout.center, marginTop: tokens.space.sm },
  dotHit: { height: 44, alignItems: tokens.layout.center, justifyContent: tokens.layout.center },
  dot: { width: 8, height: 8, borderRadius: tokens.radius.pill, backgroundColor: '#A6B6C2' },
  dotActive: { backgroundColor: tokens.color.activityNavy },
});
