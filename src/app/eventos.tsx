import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityAnnouncements } from '../components/activity-announcements';
import { contentRepository } from '../content/repository';
import { semantic, tokens } from '../design/tokens';
import { SiteFooter, SiteHeader } from '../components/ui';

export default function EventsScreen() {
  return <View style={styles.screen}><SiteHeader /><ScrollView><ActivityAnnouncements announcements={contentRepository.getActiveCommunityAnnouncements()} /><SiteFooter /></ScrollView></View>;
}

const styles = StyleSheet.create({ screen: { flex: tokens.layout.fill, backgroundColor: semantic.screen.background } });
