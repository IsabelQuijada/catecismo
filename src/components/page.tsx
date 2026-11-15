import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { semantic, tokens } from '../design/tokens';
import { Container, PageHeading, SiteFooter, SiteHeader } from './ui';

export function StandardPage({ eyebrow, title, body, children, accent = false }: PropsWithChildren<{ eyebrow: string; title: string; body: string; accent?: boolean }>) {
  return <View style={styles.screen}><SiteHeader /><ScrollView><Container><PageHeading eyebrow={eyebrow} title={title} body={body} accent={accent} />{children}</Container><SiteFooter /></ScrollView></View>;
}

export const pageStyles = StyleSheet.create({ screen: { flex: tokens.layout.fill, backgroundColor: semantic.screen.background }, content: { paddingBottom: tokens.space.hero }, grid: { flexDirection: tokens.layout.row, flexWrap: tokens.layout.wrap, gap: tokens.space.lg }, sectionGap: { marginBottom: tokens.space.xxl } });

const styles = StyleSheet.create({ screen: { flex: tokens.layout.fill, backgroundColor: semantic.screen.background } });
