import { useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { CatechesisCenter } from '../content/types';
import { semantic, tokens } from '../design/tokens';
import { AppButton, EmptyState } from './ui';

const centerPhotos: Record<string, ImageSourcePropType> = {
  'templo-la-cruz': require('../../assets/content/centros/templo-la-cruz.png'),
  'templo-la-ascencion': require('../../assets/content/centros/templo-la-ascencion.png'),
  'templo-san-juan': require('../../assets/content/centros/templo-san-juan.png'),
  'templo-san-pedro': require('../../assets/content/centros/templo-san-pedro.png'),
};

export function CenterDirectory({ centers }: { centers: CatechesisCenter[] }) {
  const [selectedId, setSelectedId] = useState<string | undefined>(centers[0]?.id);
  const compact = useWindowDimensions().width < 760;
  if (!centers.length) return <EmptyState title="Estamos preparando los centros" body="Muy pronto publicaremos los horarios y lugares de catequesis de cada barrio." />;
  const selected = centers.find((center) => center.id === selectedId) ?? centers[0];
  const schedules = selected.schedules.filter((schedule) => schedule.status === 'active');
  return <View style={[styles.directory, compact && styles.directoryCompact]}>
    <View style={[styles.sidebar, compact && styles.sidebarCompact]}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>Nuestros centros</Text>
      {centers.map((center) => {
        const active = center.id === selected.id;
        const count = center.schedules.filter((schedule) => schedule.status === 'active').length;
        return <Pressable key={center.id} accessibilityRole="button" accessibilityState={{ selected: active }} onPress={() => setSelectedId(center.id)} style={[styles.selector, active && styles.selectorActive]}>
          {center.imageUrl || centerPhotos[center.id] ? <Image source={center.imageUrl ? { uri: center.imageUrl } : centerPhotos[center.id]} style={styles.thumbnail} resizeMode="cover" accessibilityIgnoresInvertColors /> : <View style={styles.thumbnail} />}<View style={styles.selectorCopy}><Text style={styles.selectorTitle}>{center.name}</Text><Text style={styles.meta}>{center.neighborhood}{count ? ` · ${count} ${count === 1 ? 'grupo' : 'grupos'}` : ''}</Text></View><Text style={styles.arrow}>›</Text>
        </Pressable>;
      })}
    </View>
    <View style={[styles.detail, !compact && styles.detailWide]}>
      {selected.imageUrl || centerPhotos[selected.id] ? <Image source={selected.imageUrl ? { uri: selected.imageUrl } : centerPhotos[selected.id]} style={styles.photo} resizeMode="contain" accessibilityLabel={`Imagen de ${selected.name}`} /> : null}
      <Text style={styles.eyebrow}>{selected.neighborhood.toUpperCase()}</Text>
      <Text accessibilityRole="header" style={styles.detailTitle}>{selected.name}</Text>
      <View style={styles.venueRow}><Text style={styles.pin}>⌖</Text><Text style={styles.venue}>{selected.neighborhood}</Text><Text style={styles.venueDivider}>│</Text><Text style={styles.venue}>Catequesis infantil</Text>{!selected.venue.toLowerCase().includes('por confirmar') ? <><Text style={styles.venueDivider}>│</Text><Text style={styles.venue}>{selected.venue}</Text></> : null}</View>
      <View style={styles.divider} />
      <View style={styles.scheduleHeader}><View style={styles.calendarIcon}><View style={styles.calendarLine} /></View><Text accessibilityRole="header" style={styles.scheduleHeading}>Grupos y horarios</Text></View>
      {schedules.length ? schedules.map((schedule) => <View key={schedule.id} style={[styles.schedule, compact && styles.scheduleCompact]}><Text style={styles.scheduleLabel}>{schedule.label ?? 'Grupo de catequesis'}</Text><Text style={styles.scheduleTime}>{schedule.weekday} · {schedule.time}</Text>{schedule.note ? <Text style={styles.meta}>{schedule.note}</Text> : null}</View>) : <Text style={styles.meta}>Horarios por confirmar</Text>}
      <View style={styles.notice}><Text style={styles.noticeIcon}>ⓘ</Text><Text style={styles.noticeText}>Los horarios y demás detalles se confirmarán próximamente por nuestra oficina de catequesis.</Text></View>
      {!selected.address.toLowerCase().includes('por confirmar') ? <View style={styles.info}><Text style={styles.meta}>Dirección: {selected.address}</Text></View> : null}
      <View style={styles.actions}>{selected.mapsUrl ? <AppButton label="Cómo llegar" href={selected.mapsUrl} /> : null}<AppButton label="Contactar" href="/contacto" variant="secondary" /></View>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  directory: { flexDirection: 'row', alignItems: 'flex-start', gap: 24, paddingBottom: 72 },
  directoryCompact: { flexDirection: 'column' },
  sidebar: { width: '35%', gap: 0 }, sidebarCompact: { width: '100%' },
  sectionTitle: { ...tokens.type.title, color: semantic.screen.text, marginBottom: 8 },
  selector: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, minHeight: 96, borderBottomWidth: 1, borderBottomColor: semantic.screen.line },
  selectorActive: { backgroundColor: tokens.color.blueSoft, borderRadius: 16, borderBottomWidth: 0, borderLeftWidth: 5, borderLeftColor: tokens.color.navy, marginBottom: 12 },
  thumbnail: { width: 80, height: 62, borderRadius: 10, backgroundColor: semantic.surface.subtle }, selectorCopy: { flex: 1 },
  selectorTitle: { ...tokens.type.bodyStrong, color: semantic.screen.text }, meta: { ...tokens.type.body, color: semantic.screen.mutedText, marginTop: 4 }, arrow: { fontSize: 30, color: tokens.color.navy },
  detail: { flex: 1, width: '100%' }, detailWide: { borderLeftWidth: 1, borderLeftColor: semantic.screen.line, paddingLeft: 24 }, photo: { width: '100%', aspectRatio: 1.65, maxHeight: 420, borderRadius: 12, marginBottom: 12, backgroundColor: semantic.surface.subtle },
  eyebrow: { ...tokens.type.eyebrow, color: tokens.color.wine, marginBottom: 8 }, detailTitle: { ...tokens.type.title, color: semantic.screen.text }, venueRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginTop: 8 }, venueDivider: { color: semantic.screen.line }, pin: { fontSize: 14, color: tokens.color.navy }, venue: { ...tokens.type.body, color: semantic.screen.mutedText },
  divider: { height: 1, backgroundColor: semantic.screen.line, marginVertical: 16 }, scheduleHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }, calendarIcon: { width: 22, height: 20, borderWidth: 2, borderColor: tokens.color.gold, borderRadius: 3, justifyContent: 'flex-start', paddingTop: 4 }, calendarLine: { height: 2, backgroundColor: tokens.color.gold }, scheduleHeading: { ...tokens.type.title, fontSize: 22, lineHeight: 28, color: semantic.screen.text, flexShrink: 1 },
  schedule: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8, backgroundColor: tokens.color.sand, borderRadius: 12, padding: 14, marginBottom: 8 }, scheduleCompact: { flexDirection: 'column', alignItems: 'flex-start' }, scheduleLabel: { ...tokens.type.bodyStrong, color: semantic.screen.text }, scheduleTime: { ...tokens.type.body, color: semantic.screen.mutedText },
  notice: { flexDirection: 'row', gap: 12, backgroundColor: tokens.color.blueSoft, borderRadius: 12, padding: 16, marginTop: 16 }, noticeIcon: { fontSize: 22, color: tokens.color.navy }, noticeText: { ...tokens.type.body, color: tokens.color.navy, flex: 1 }, info: { marginTop: 16 }, actions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 20 },
});
