import { useState } from 'react';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Announcement, Course, Event, NoticeVariant } from '../content/types';
import { semantic, tokens } from '../design/tokens';
import { useResponsive } from '../hooks/useResponsive';
import { AppButton } from './ui';

const announcementIllustration = require('../../assets/content/announcements/catequesis-biblia-paloma-transparente.png');

type NoticeBannerProps = { notice: Announcement };

function formatExpiryDate(dateValue: string): string {
  return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long' }).format(new Date(`${dateValue}T00:00:00`));
}

export function NoticeBanner({ notice }: NoticeBannerProps) {
  const { isCompact } = useResponsive();
  const variant = getVariantStyles(notice.variant);
  const eyebrow = notice.eyebrow ?? 'Comunicado';
  return <View style={[styles.notice, variant.surface, variant.accent]}><Text style={[styles.noticeKicker, variant.kicker]}>{eyebrow.toUpperCase()}</Text><View style={[styles.noticeContent, isCompact ? styles.noticeContentCompact : undefined]}><View style={styles.noticeCopy}><Text style={[styles.noticeTitle, variant.text]}>{notice.title}</Text><Text style={[styles.noticeBody, variant.text]}>{notice.summary}</Text>{notice.expiresAt ? <Text style={[styles.noticeExpiry, variant.text]}>Vigente hasta el {formatExpiryDate(notice.expiresAt)}</Text> : null}</View>{notice.action ? <AppButton label={notice.action.label} href={notice.action.href} variant="secondary" /> : null}</View></View>;
}

// Alias temporal para no romper pantallas que todavía usen el nombre anterior.
export const UrgentNotice = NoticeBanner;

type SelectedAnnouncementProps = { notice?: Announcement };

export function SelectedAnnouncement({ notice }: SelectedAnnouncementProps) {
  const { isWide, isCompact } = useResponsive();
  const [actionHovered, setActionHovered] = useState(false);
  const [actionFocused, setActionFocused] = useState(false);
  if (!notice) return null;

  return <View style={styles.watercolorAnnouncementBanner}>
    <View style={[styles.watercolorAnnouncementContent, isCompact && styles.watercolorAnnouncementContentCompact]}>
      <View style={[styles.noticeIllustration, !isWide ? styles.noticeIllustrationTablet : undefined, isCompact && styles.noticeIllustrationCompact]}>
        <Image source={announcementIllustration} style={[styles.noticeIllustrationImage, !isWide ? styles.noticeIllustrationImageTablet : undefined]} resizeMode="contain" accessibilityLabel="Ilustración de una Biblia infantil, una paloma y ramas de olivo" />
      </View>
      <View style={[styles.noticeFeatureCopy, isCompact && styles.noticeFeatureCopyCompact]}>
        <Text style={styles.noticeFeatureTitle}>{notice.title}</Text>
        <Text style={styles.noticeFeatureBody}>{notice.summary}</Text>
        {notice.action ? <Link href={notice.action.href as never} asChild><Pressable accessibilityRole="link" onHoverIn={() => setActionHovered(true)} onHoverOut={() => setActionHovered(false)} onFocus={() => setActionFocused(true)} onBlur={() => setActionFocused(false)} style={styles.noticeFeatureAction}><Text style={[styles.noticeFeatureLink, (actionHovered || actionFocused) && styles.noticeFeatureLinkHighlighted, actionFocused && styles.noticeFeatureLinkFocused]}>{notice.action.label} <Text accessibilityElementsHidden>→</Text></Text></Pressable></Link> : null}
      </View>
    </View>
  </View>;
}

export function EventCard({ event }: { event: Event }) {
  return <View style={styles.card}>{event.imageUrl ? <Image source={{ uri: event.imageUrl }} style={styles.cardImage} accessibilityLabel={event.title} /> : null}<Text style={styles.cardKicker}>EVENTO · {event.audience}</Text><Text style={styles.cardTitle}>{event.title}</Text><Text style={styles.cardBody}>{event.description}</Text><View style={styles.meta}><Text style={styles.metaLabel}>Lugar</Text><Text style={styles.metaValue}>{event.location}</Text></View>{event.action ? <AppButton label={event.action.label} href={event.action.href} /> : null}</View>;
}

export function CourseCard({ course }: { course: Course }) {
  return <View style={styles.card}>{course.imageUrl ? <Image source={{ uri: course.imageUrl }} style={styles.cardImage} accessibilityLabel={course.title} /> : null}<Text style={styles.cardKicker}>{course.audience}</Text><Text style={styles.cardTitle}>{course.title}</Text><Text style={styles.cardBody}>{course.sacrament}</Text><Text style={styles.metaLabel}>Requisitos</Text>{course.requirements.map((requirement) => <Text key={requirement} style={styles.requirement}>• {requirement}</Text>)}</View>;
}

const styles = StyleSheet.create({
  notice: { borderRadius: tokens.radius.xl, borderLeftWidth: tokens.space.xs, padding: tokens.space.lg, marginBottom: tokens.space.xxl },
  noticeInfo: { backgroundColor: semantic.surface.subtle }, noticeInfoAccent: { borderLeftColor: tokens.color.blue }, noticeInfoKicker: { color: tokens.color.blue },
  noticeImportant: { backgroundColor: semantic.notice.background }, noticeImportantAccent: { borderLeftColor: semantic.notice.accent }, noticeImportantKicker: { color: semantic.notice.accent },
  noticeUrgent: { backgroundColor: tokens.color.wine }, noticeUrgentAccent: { borderLeftColor: tokens.color.gold }, noticeUrgentKicker: { color: tokens.color.goldSoft },
  noticeSuccess: { backgroundColor: tokens.color.sage }, noticeSuccessAccent: { borderLeftColor: tokens.color.gold }, noticeSuccessKicker: { color: tokens.color.goldSoft },
  noticeKicker: { ...tokens.type.eyebrow, marginBottom: tokens.space.xs }, noticeTextDark: { color: semantic.notice.text }, noticeTextLight: { color: semantic.action.onAction },
  noticeContent: { flexDirection: tokens.layout.row, justifyContent: tokens.layout.between, gap: tokens.space.md, alignItems: tokens.layout.center }, noticeContentCompact: { flexDirection: tokens.layout.column, alignItems: tokens.layout.start }, noticeCopy: { flex: tokens.layout.fill }, noticeTitle: { ...tokens.type.title }, noticeBody: { ...tokens.type.body, marginTop: tokens.space.xs }, noticeExpiry: { ...tokens.type.label, marginTop: tokens.space.sm },
  watercolorAnnouncementBanner: { width: tokens.layout.full, minHeight: 150, marginVertical: tokens.space.none, overflow: 'hidden', justifyContent: tokens.layout.center, backgroundColor: semantic.surface.base },
  watercolorAnnouncementContent: { width: tokens.layout.full, maxWidth: tokens.size.announcementContent, alignSelf: tokens.layout.center, paddingHorizontal: tokens.space.lg, paddingVertical: tokens.space.xxs, flexDirection: tokens.layout.row, alignItems: tokens.layout.center, justifyContent: tokens.layout.center, gap: tokens.space.xl },
  watercolorAnnouncementContentCompact: { flexDirection: 'column', alignItems: 'flex-start', gap: tokens.space.sm, paddingVertical: tokens.space.lg },
  noticeIllustrationCompact: { alignSelf: 'center' }, noticeFeatureCopyCompact: { flexBasis: 'auto', width: '100%' },
  noticeIllustration: { width: 180, alignItems: tokens.layout.center, justifyContent: tokens.layout.center },
  noticeIllustrationTablet: { width: 125 },
  noticeIllustrationImage: { width: 122, height: 122 },
  noticeIllustrationImageTablet: { width: 109, height: 109 },
  noticeFeatureCopy: { flexShrink: tokens.layout.shrink, maxWidth: tokens.size.announcementText, justifyContent: tokens.layout.center },
  noticeFeatureTitle: { ...tokens.type.title, fontSize: 21, lineHeight: 27, color: semantic.screen.text, marginBottom: tokens.space.xxs },
  noticeFeatureBody: { ...tokens.type.body, color: semantic.screen.mutedText },
  noticeFeatureAction: { alignSelf: 'flex-start', minHeight: 44, justifyContent: 'center', marginTop: tokens.space.xs },
  noticeFeatureLink: { ...tokens.type.bodyStrong, color: tokens.color.navy },
  noticeFeatureLinkHighlighted: { textDecorationLine: 'underline' },
  noticeFeatureLinkFocused: { backgroundColor: tokens.color.goldSoft },
  card: { flex: tokens.layout.fill, backgroundColor: semantic.surface.base, borderRadius: tokens.radius.lg, padding: tokens.space.lg, ...tokens.shadow.card }, cardImage: { width: tokens.layout.full, height: tokens.size.cardImage, borderRadius: tokens.radius.md, marginBottom: tokens.space.lg, backgroundColor: semantic.surface.subtle }, cardKicker: { ...tokens.type.eyebrow, color: tokens.color.wine, marginBottom: tokens.space.sm }, cardTitle: { ...tokens.type.title, color: semantic.screen.text, marginBottom: tokens.space.xs }, cardBody: { ...tokens.type.body, color: semantic.screen.mutedText, marginBottom: tokens.space.lg }, meta: { borderTopColor: semantic.screen.line, borderTopWidth: tokens.space.hairline, paddingTop: tokens.space.md, marginBottom: tokens.space.lg }, metaLabel: { ...tokens.type.eyebrow, color: semantic.screen.mutedText }, metaValue: { ...tokens.type.bodyStrong, color: semantic.screen.text }, requirement: { ...tokens.type.body, color: semantic.screen.mutedText, marginTop: tokens.space.xs },
});

function getVariantStyles(variant: NoticeVariant) {
  const variants = {
    info: { surface: styles.noticeInfo, accent: styles.noticeInfoAccent, kicker: styles.noticeInfoKicker, text: styles.noticeTextDark },
    important: { surface: styles.noticeImportant, accent: styles.noticeImportantAccent, kicker: styles.noticeImportantKicker, text: styles.noticeTextDark },
    urgent: { surface: styles.noticeUrgent, accent: styles.noticeUrgentAccent, kicker: styles.noticeUrgentKicker, text: styles.noticeTextLight },
    success: { surface: styles.noticeSuccess, accent: styles.noticeSuccessAccent, kicker: styles.noticeSuccessKicker, text: styles.noticeTextLight },
  };
  return variants[variant];
}
