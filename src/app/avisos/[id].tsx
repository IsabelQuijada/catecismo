import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { AppButton, Container, SiteFooter, SiteHeader } from '../../components/ui';
import { getArtwork } from '../../components/activity-announcements';
import { contentRepository } from '../../content/repository';
import { semantic, tokens } from '../../design/tokens';

export function generateStaticParams() {
  return contentRepository.getPublishedCommunityAnnouncements().map(({ id }) => ({ id }));
}

export default function AnnouncementDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const compact = useWindowDimensions().width < 768;
  const item = contentRepository.getCommunityAnnouncementById(id);
  const endDate = item?.category === 'evento' ? item.eventEndsAt ?? item.eventDate : item?.visibleUntil;
  const expired = endDate && new Date(`${endDate}T23:59:59`) < new Date();
  const formatDate = (value: string) => new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
  const formatEventDate = (value: string) => new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
  const artwork = item ? getArtwork(item) : undefined;

  return <View style={styles.screen}><SiteHeader /><ScrollView contentContainerStyle={styles.scroll}>
    <Container style={styles.content}>
      {item ? <>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>{item.category === 'evento' ? 'ACTIVIDADES DE LA COMUNIDAD' : item.category === 'inscripcion' ? 'INSCRIPCIONES' : 'AVISOS DE LA COMUNIDAD'}</Text>
          <Text accessibilityRole="header" style={[styles.title, compact && styles.titleCompact]}>{item.title}</Text>
          {item.publishedAt ? <Text style={styles.published}>Publicado el {formatDate(item.publishedAt)}</Text> : null}
          <View style={styles.accent} />
        </View>
        {expired ? <Text style={styles.expired}>Este aviso ya no está vigente.</Text> : null}
        {artwork ? <View style={styles.imageFrame}><Image source={artwork} resizeMode="cover" style={styles.image} accessibilityLabel={`Ilustración de ${item.title}`} /></View> : null}
        <View style={styles.article}>
          <Text style={styles.description}>{item.description}</Text>
          {item.details ? <View style={styles.about}><Text accessibilityRole="header" style={styles.cardTitle}>Sobre esta actividad</Text><Text style={styles.aboutBody}>{item.details}</Text></View> : null}
          <View style={[styles.card, compact && styles.cardCompact]}>
            <Detail label="Fecha" value={item.eventDate ? formatEventDate(item.eventDate) : 'Por confirmar'} icon="▦" />
            <Detail label="Horario" value={item.eventTime ?? 'Por confirmar'} icon="◷" />
            <Detail label="Lugar" value={item.location ?? 'Por confirmar'} icon="⌖" />
          </View>
          <View style={[styles.extraRow, compact && styles.extraRowCompact]}>
            <View style={[styles.extraCard, styles.audienceCard]}><Text accessibilityRole="header" style={styles.cardTitle}>¿Quiénes pueden participar?</Text><Text style={styles.body}>{item.audience ?? 'Información por confirmar.'}</Text></View>
            <View style={styles.extraCard}><Text accessibilityRole="header" style={styles.cardTitle}>¿Qué llevar?</Text>{item.whatToBring?.length ? item.whatToBring.map((entry) => <Text key={entry} style={styles.body}><Text style={styles.check}>✓ </Text>{entry}</Text>) : <Text style={styles.body}>Información por confirmar.</Text>}</View>
          </View>
          {item.poster ? <Text style={styles.body}>{item.poster}</Text> : null}
          <View style={styles.quote}><Text style={styles.quoteText}>“{item.quote ?? 'Caminamos juntos en la fe y en comunidad.'}”</Text></View>
          <View style={[styles.contact, compact && styles.contactCompact]}><View style={styles.contactCopy}><Text style={styles.contactTitle}>Contacto</Text><Text style={styles.contactBody}>Si tienes dudas, puedes comunicarte con el equipo de catequesis.</Text></View><AppButton label="Contactar a catequesis" href="/contacto" variant="secondary" /></View>
        </View>
      </> : <><Text accessibilityRole="header" style={styles.title}>Aviso no disponible</Text><Text style={styles.description}>Este aviso no está disponible. Consulta los avisos actuales de nuestra comunidad.</Text><AppButton label="Ver avisos" href="/avisos" /></>}
    </Container>
    <SiteFooter />
  </ScrollView></View>;
}

function Detail({ label, value, icon }: { label: string; value: string; icon: string }) {
  return <View style={styles.detail}><Text accessibilityElementsHidden style={styles.detailIcon}>{icon}</Text><View style={styles.detailCopy}><Text style={styles.label}>{label}</Text><Text style={styles.body}>{value}</Text></View></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: semantic.screen.background },
  scroll: { flexGrow: 1 },
  content: { maxWidth: 1120, paddingTop: tokens.space.lg, paddingBottom: tokens.space.xxl },
  heading: { maxWidth: 1000, marginBottom: tokens.space.lg },
  eyebrow: { ...tokens.type.eyebrow, color: tokens.color.wine, marginBottom: tokens.space.sm },
  title: { ...tokens.type.display, fontSize: 40, lineHeight: 48, color: semantic.screen.text, marginBottom: tokens.space.sm },
  titleCompact: { fontSize: 34, lineHeight: 42 },
  published: { ...tokens.type.body, color: semantic.screen.mutedText },
  accent: { width: 56, height: 3, backgroundColor: tokens.color.gold, marginTop: tokens.space.lg },
  imageFrame: { width: '100%', aspectRatio: 2.65, maxHeight: 300, borderRadius: tokens.radius.lg, overflow: 'hidden', marginBottom: tokens.space.lg },
  image: { width: '100%', height: '100%' },
  article: { width: '100%' },
  description: { ...tokens.type.body, fontSize: 18, lineHeight: 28, maxWidth: 850, color: semantic.screen.text, marginBottom: tokens.space.lg },
  about: { maxWidth: 850, marginBottom: tokens.space.lg },
  aboutBody: { ...tokens.type.body, fontSize: 19, lineHeight: 30, color: semantic.screen.mutedText },
  expired: { ...tokens.type.bodyStrong, color: tokens.color.wine, marginBottom: tokens.space.lg },
  card: { backgroundColor: semantic.surface.base, borderRadius: tokens.radius.lg, padding: tokens.space.lg, flexDirection: 'row', gap: tokens.space.lg, marginBottom: tokens.space.lg },
  cardCompact: { flexDirection: 'column', gap: tokens.space.md },
  cardTitle: { ...tokens.type.bodyStrong, fontSize: 20, lineHeight: 27, color: semantic.screen.text, marginBottom: tokens.space.xs },
  detail: { flex: 1, flexDirection: 'row', gap: tokens.space.sm, minWidth: 0 },
  detailCopy: { flex: 1, gap: tokens.space.xxs },
  detailIcon: { color: tokens.color.gold, fontSize: 30, lineHeight: 34 },
  label: { ...tokens.type.bodyStrong, color: semantic.screen.text },
  body: { ...tokens.type.body, color: semantic.screen.mutedText },
  extraRow: { flexDirection: 'row', gap: tokens.space.md, marginBottom: tokens.space.lg },
  extraRowCompact: { flexDirection: 'column' },
  extraCard: { flex: 1, backgroundColor: semantic.surface.base, borderRadius: tokens.radius.lg, padding: tokens.space.lg, gap: tokens.space.xs },
  audienceCard: { backgroundColor: tokens.color.activityBlue },
  check: { color: tokens.color.gold },
  quote: { backgroundColor: semantic.surface.warm, borderRadius: tokens.radius.lg, padding: tokens.space.lg, marginBottom: tokens.space.lg },
  quoteText: { ...tokens.type.body, fontStyle: 'italic', color: semantic.screen.text },
  contact: { marginTop: tokens.space.md, paddingVertical: tokens.space.lg, borderTopWidth: 1, borderBottomWidth: 1, borderColor: semantic.screen.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.space.md },
  contactCompact: { flexDirection: 'column', alignItems: 'flex-start' },
  contactCopy: { flex: 1 },
  contactTitle: { ...tokens.type.bodyStrong, color: semantic.screen.text },
  contactBody: { ...tokens.type.body, color: semantic.screen.mutedText },
});
