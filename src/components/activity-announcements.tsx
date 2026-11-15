import { useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Image, ImageSourcePropType, Pressable, ScrollView, ScrollViewInstance, StyleSheet, Text, useWindowDimensions, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { CommunityAnnouncement } from '../content/types';
import { semantic, tokens } from '../design/tokens';
import { Container, EmptyState } from './ui';

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
  const [expandedId, setExpandedId] = useState<string | undefined>();
  const [scrollOffset, setScrollOffset] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const scrollRef = useRef<ScrollViewInstance | null>(null);
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

  return <View style={styles.section}>
    <Container style={{ maxWidth: MAX_CONTENT_WIDTH, paddingHorizontal: containerPadding }}>
      <View style={[styles.headingRow, viewportWidth < 768 ? styles.headingRowCompact : undefined]}>
        <Text accessibilityRole="header" style={[styles.title, viewportWidth < 768 ? styles.titleCompact : undefined]}>Avisos, encuentros y actividades para nuestra comunidad.</Text>
        {hasOverflow ? <View style={[styles.navigation, viewportWidth < 768 ? styles.navigationCompact : undefined]}>
          <CarouselArrow label="Ver aviso anterior" direction="left" disabled={scrollOffset <= 4} onPress={() => moveToCard(activeCardIndex - 1)} />
          <CarouselArrow label="Ver aviso siguiente" direction="right" disabled={scrollOffset >= maxScrollOffset - 4} onPress={() => moveToCard(activeCardIndex + 1)} />
        </View> : null}
      </View>
      {announcements.length ? <View style={styles.carousel}>
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
            expanded={expandedId === item.id}
            onToggle={() => setExpandedId((current) => current === item.id ? undefined : item.id)}
          />)}
        </ScrollView>
        {hasOverflow ? <View style={styles.pagination} accessibilityLabel={`Aviso ${activeCardIndex + 1} de ${announcements.length}`}>
            {announcements.map((item, index) => <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={`Ver aviso ${index + 1}: ${item.title}`}
              accessibilityState={{ selected: activeCardIndex === index }}
              onPress={() => moveToCard(index)}
              style={[styles.dotHit, { width: dotHitWidth }]}
            ><View style={[styles.dot, activeCardIndex === index ? styles.dotActive : undefined]} /></Pressable>)}
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

function ActivityCard({ item, width, expanded, onToggle }: { item: CommunityAnnouncement; width: number; expanded: boolean; onToggle: () => void }) {
  const date = item.eventDate ? new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${item.eventDate}T12:00:00`)) : undefined;
  const artwork = getArtwork(item);
  const categoryLabel = item.eyebrow ?? (item.category === 'evento' ? 'Próxima actividad' : item.category === 'inscripcion' ? 'Inscripciones' : 'Aviso importante');

  const minimumHeight = 540;
  return <View style={[styles.card, { width, minHeight: minimumHeight }]}>
    {artwork ? <Image source={artwork} resizeMode="cover" style={[styles.cardImage, { height: (width - tokens.space.md * 1.5) / tokens.ratio.activityImage }]} accessibilityLabel={`Ilustración de ${item.title}`} /> : <View style={[styles.artMissing, { height: (width - tokens.space.md * 1.5) / tokens.ratio.activityImage }]} accessibilityElementsHidden />}
    <View style={styles.cardBody}>
      <Text style={styles.category}>{categoryLabel.toLocaleUpperCase('es-MX')}</Text>
      <Text style={styles.cardTitle} numberOfLines={3}>{item.title}</Text>
      <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.metadataGroup}>
          {date ? <Metadata label="Fecha" value={capitalize(date)} /> : null}
          {item.eventTime ? <Metadata label="Hora" value={item.eventTime} /> : null}
          {item.location ? <Metadata label="Lugar" value={item.location} /> : null}
        </View>
        <Pressable accessibilityRole="button" accessibilityState={{ expanded }} onPress={onToggle} style={styles.cta}>
          <Text style={styles.ctaText}>{expanded ? 'Cerrar información' : 'Ver información'}</Text><Text style={styles.ctaText}>→</Text>
        </Pressable>
      </View>
      {expanded ? <View accessibilityRole="summary" style={styles.expandedDetails}>
        <Text style={styles.expandedTitle}>Más información</Text>
        <Text style={styles.expandedText}>{item.description}</Text>
        {item.audience ? <Text style={styles.expandedText}>Dirigido a: {item.audience}</Text> : null}
        {item.poster ? <Text style={styles.expandedText}>{item.poster}</Text> : null}
      </View> : null}
    </View>
  </View>;
}

function Metadata({ label, value }: { label: string; value: string }) {
  return <View style={styles.metadata}><Text style={styles.metadataIcon} accessibilityElementsHidden>▦</Text><Text style={styles.metadataLabel}>{label}</Text><Text style={styles.metadataText} numberOfLines={2}>{value}</Text></View>;
}

function getArtwork(item: CommunityAnnouncement): ImageSourcePropType | undefined {
  return item.imageKey ? announcementArtwork[item.imageKey] : undefined;
}

function capitalize(value: string): string {
  return value.charAt(0).toLocaleUpperCase('es-MX') + value.slice(1);
}

const styles = StyleSheet.create({
  section: { backgroundColor: tokens.color.activityBlue, paddingVertical: tokens.space.xxl },
  headingRow: { flexDirection: tokens.layout.row, alignItems: tokens.layout.center, justifyContent: tokens.layout.between, gap: tokens.space.lg, marginBottom: tokens.space.lg },
  headingRowCompact: { flexDirection: tokens.layout.column, alignItems: tokens.layout.stretch, gap: tokens.space.sm, marginBottom: tokens.space.md },
  title: { flex: 1, fontSize: 33, lineHeight: 40, fontWeight: '700', color: tokens.color.activityText },
  titleCompact: { fontSize: 27, lineHeight: 34 },
  navigation: { flexDirection: tokens.layout.row, alignItems: tokens.layout.center, gap: tokens.space.xs },
  navigationCompact: { alignSelf: tokens.layout.end },
  carousel: { paddingBottom: tokens.space.xs },
  scrollView: { width: tokens.layout.full },
  track: { gap: CARD_GAP, alignItems: 'stretch', paddingVertical: tokens.space.xs },
  card: { padding: tokens.space.sm, backgroundColor: semantic.surface.base, borderRadius: tokens.radius.lg, overflow: 'hidden', ...tokens.shadow.card },
  cardImage: { width: '100%', height: 210, borderRadius: tokens.radius.md, backgroundColor: semantic.surface.base },
  artMissing: { width: '100%', height: 210, borderRadius: tokens.radius.md, backgroundColor: semantic.surface.subtle },
  cardBody: { flex: 1, paddingHorizontal: tokens.space.xs, paddingTop: tokens.space.md, paddingBottom: tokens.space.xs },
  category: { alignSelf: 'flex-start', ...tokens.type.eyebrow, color: tokens.color.wine, backgroundColor: tokens.color.goldSoft, borderRadius: tokens.radius.pill, paddingHorizontal: tokens.space.sm, paddingVertical: tokens.space.xxs, marginBottom: tokens.space.sm },
  cardTitle: { fontSize: 23, lineHeight: 29, fontWeight: '700', color: tokens.color.activityText, marginBottom: tokens.space.xs },
  cardDescription: { ...tokens.type.body, color: tokens.color.activityMuted, marginBottom: tokens.space.md },
  cardFooter: { marginTop: 'auto', borderTopWidth: tokens.space.hairline, borderTopColor: tokens.color.blueSoft, paddingTop: tokens.space.md, gap: tokens.space.md },
  cta: { minHeight: tokens.size.button, alignSelf: 'flex-start', flexDirection: tokens.layout.row, alignItems: tokens.layout.center, justifyContent: tokens.layout.center, gap: tokens.space.sm, paddingHorizontal: tokens.space.md, borderRadius: tokens.radius.pill, backgroundColor: tokens.color.activityNavy },
  ctaText: { ...tokens.type.label, color: semantic.action.onAction },
  metadataGroup: { gap: tokens.space.xs },
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
