import { useState } from 'react';
import { Link } from 'expo-router';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Sacrament, sacraments } from '../content/sacraments';
import { semantic, tokens } from '../design/tokens';
import { AppButton, Container, SiteFooter, SiteHeader } from './ui';

const artwork = {
  bautismo: require('../../assets/content/sacramentos/bautismo.png'),
  'primera-comunion': require('../../assets/content/sacramentos/primera-comunion.png'),
  confirmacion: require('../../assets/content/sacramentos/confirmacion.png'),
};

const sectionPhotos = {
  bautismo: require('../../assets/content/sacramentos/seccion-bautismo.png'),
  'primera-comunion': require('../../assets/content/sacramentos/seccion-primera-comunion.png'),
  confirmacion: require('../../assets/content/sacramentos/seccion-confirmacion.png'),
};

const sacramentWatermark = require('../../assets/content/sacramentos/sacramentos-marca-agua.png');

const entryAccents = ['#83BBD3', '#D5A848', '#8D2330'];

export function SacramentEntries() {
  const { width } = useWindowDimensions();
  const compact = width < 900;
  const narrow = width < 400;
  const mobile = width < 768;
  return <View style={[styles.entries, compact && styles.entriesCompact, mobile && styles.entriesMobile]}>{sacraments.map((item, index) => <Link key={item.slug} href={`/sacramentos/${item.slug}` as never} asChild><Pressable accessibilityRole="link" accessibilityLabel={`Conocer más sobre ${item.title}`} style={StyleSheet.flatten([styles.entry, compact && styles.entryCompact, !compact && index > 0 && styles.entryDivider, mobile && styles.entryMobile, mobile && index > 0 && styles.entryMobileDivider])}>
    <Image source={artwork[item.slug]} resizeMode="contain" style={[styles.entryImage, compact && styles.entryImageCompact, narrow && styles.entryImageNarrow, mobile && styles.entryImageMobile]} accessibilityIgnoresInvertColors accessibilityElementsHidden />
    <View style={[styles.entryCopy, compact && styles.entryCopyCompact]}><Text style={[styles.entryTitle, compact && styles.entryTitleCompact, mobile && styles.entryTitleMobile]}>{item.title}</Text><Text style={[styles.entryBody, compact && styles.entryBodyCompact, mobile && styles.entryBodyMobile]}>{item.summary}</Text>{!mobile && <Text style={[styles.more, { borderBottomColor: entryAccents[index] }]}>Conocer más →</Text>}</View>{mobile && <Text style={styles.entryArrow} accessible={false}>→</Text>}
  </Pressable></Link>)}</View>;
}

export function SacramentPage({ item }: { item: Sacrament }) {
  const { width } = useWindowDimensions();
  const compact = width < 768;
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [requirementsOpen, setRequirementsOpen] = useState(false);
  return <View style={styles.screen}><SiteHeader /><ScrollView><Container>
    <View style={[styles.intro, compact && styles.introCompact]}>
      <View style={styles.introCopy}>
        <View style={styles.kickerRow}><View style={styles.kickerLine} /><Text style={styles.kicker}>UN CAMINO DE FE EN COMUNIDAD</Text></View>
        <Text accessibilityRole="header" aria-level={1} style={[styles.pageTitle, compact && styles.pageTitleCompact]}>{item.title}</Text>
        <Text style={styles.introduction}>{item.introduction}</Text>
        <Text style={styles.welcome}>Queremos acompañarte a ti y a tu familia en este momento tan especial.</Text>
      </View>
      <Image source={artwork[item.slug]} resizeMode="contain" style={[styles.pageImage, compact && styles.pageImageCompact]} accessibilityLabel={`Ilustración de ${item.title}`} />
    </View>
    <View style={styles.pageContent}>
      <View style={[styles.meaningRow, compact && styles.meaningRowCompact]}>
        <Text style={[styles.meaningIcon, compact && styles.meaningIconCompact]} accessibilityElementsHidden>✝</Text>
        <View style={[styles.meaningCopy, compact && styles.meaningCopyCompact]}><Text accessibilityRole="header" aria-level={2} style={styles.heading}>Un camino lleno de significado</Text><Text style={styles.body}>{item.meaning}</Text><Text style={styles.catechism}>{item.catechism}</Text><Text style={styles.catechismReference}>{item.catechismReference}</Text></View>
      </View>
      <View style={[styles.journey, compact && styles.journeyCompact]}>
        <View style={[styles.journeyArt, { aspectRatio: (item.slug === 'bautismo' ? 2164 / 727 : 3) / 1.3 * (compact ? 1 : 0.7) / 0.85 }, compact && styles.journeyArtCompact]}><Image source={sectionPhotos[item.slug]} resizeMode="stretch" style={styles.journeyImage} accessibilityLabel={`Imagen de ${item.title}`} /></View>
        <View style={styles.journeyCopy}><Text accessibilityRole="header" aria-level={2} style={styles.heading}>Un camino que recorremos juntos</Text><Text style={styles.body}>{item.preparation}</Text></View>
      </View>
      <View style={[styles.preparationPanel, compact && styles.preparationPanelCompact]}>
        <Text style={styles.panelKicker}>INFORMACIÓN PARA LAS FAMILIAS</Text>
        <Text accessibilityRole="header" aria-level={2} style={styles.heading}>¿Cómo prepararse para {item.title === 'Bautismo' ? 'el Bautismo' : item.title === 'Confirmación' ? 'la Confirmación' : 'la Primera Comunión'}?</Text>
        <View style={[styles.steps, compact && styles.stepsCompact]}>
          <PreparationStep compact={compact} number="1" title="Conoce los requisitos" body="Revisa los documentos y condiciones que encontrarás a continuación." />
          <PreparationStep compact={compact} divided={!compact} number="2" title="Participa en la preparación" body={item.preparationInfo ?? 'Consulta los cursos y horarios disponibles con nuestro equipo de catequesis.'} />
          <PreparationStep compact={compact} divided={!compact} number="3" title="Acércate a la parroquia" body="Recibe orientación para acompañar este camino de fe en familia." />
        </View>
      <View style={[styles.requirements, compact && styles.requirementsCompact]}>
        <Pressable accessibilityRole="button" accessibilityState={{ expanded: requirementsOpen }} onPress={() => setRequirementsOpen(!requirementsOpen)} style={styles.requirementsToggle}>
          <View style={styles.requirementsHeading}><Text accessibilityRole="header" aria-level={3} style={styles.requirementsCardTitle}>Requisitos y documentos</Text><Text style={styles.requirementsHint}>{requirementsOpen ? 'Ocultar información' : 'Consulta lo que necesitas'}</Text></View>
          <Text style={styles.requirementsToggleIcon} accessible={false}>{requirementsOpen ? '−' : '+'}</Text>
        </Pressable>
        {requirementsOpen && <View>
          {item.requirementGroups.map((group) => <View key={group.title} style={styles.requirementGroup}><Text accessibilityRole="header" aria-level={3} style={styles.requirementTitle}>{group.title}</Text>{group.items.map((entry) => <View key={entry} style={styles.requirementItem}><Text style={styles.requirementBullet} accessibilityElementsHidden>•</Text><Text style={styles.requirementText}>{entry}</Text></View>)}</View>)}
          {item.requirementNotes?.map((note) => <Text key={note} style={styles.requirementsNotice}>{note}</Text>)}
          <Link href="/contacto" asChild><Pressable accessibilityRole="link" style={styles.requirementsLink}><Text style={styles.requirementsLinkText}>Contactar a la parroquia →</Text></Pressable></Link>
        </View>}
      </View>
      </View>
      <View style={[styles.faqSection, compact && styles.faqSectionCompact]}><Text accessibilityRole="header" aria-level={2} style={styles.heading}>Preguntas frecuentes</Text>{item.faq.map((faq, index) => <View key={faq.question} style={styles.faq}><Pressable accessibilityRole="button" accessibilityState={{ expanded: openQuestion === index }} onPress={() => setOpenQuestion(openQuestion === index ? null : index)} style={styles.faqButton}><Text style={styles.question}>{faq.question}</Text><Text style={styles.question}>{openQuestion === index ? '−' : '+'}</Text></Pressable>{openQuestion === index ? <Text style={styles.answer}>{faq.answer}</Text> : null}</View>)}</View>
    </View>
  </Container>
      <View style={[styles.contact, compact && styles.contactCompact]}>{!compact ? <Image source={sacramentWatermark} style={styles.contactWatermark} resizeMode="contain" pointerEvents="none" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" /> : null}<Text accessibilityRole="header" aria-level={2} style={[styles.heading, styles.contactHeading]}>Estamos aquí para acompañarte</Text><Text style={styles.contactBody}>¿Tienes preguntas sobre {item.title} o la preparación? Nuestro equipo de catequesis puede orientarte.</Text><View><AppButton label="Contactar a catequesis" href="/contacto" /></View></View>
  <SiteFooter /></ScrollView></View>;
}

function PreparationStep({ number, title, body, compact = false, divided = false }: { number: string; title: string; body: string; compact?: boolean; divided?: boolean }) {
  return <View style={[styles.step, compact && styles.stepCompact, divided && styles.stepDivided]}><Text style={styles.stepNumber}>{number}</Text><View style={styles.stepCopy}><Text style={styles.stepTitle}>{title}</Text><Text style={styles.stepBody}>{body}</Text></View></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: semantic.screen.background },
  requirementsCardTitle: { ...tokens.type.bodyStrong, color: tokens.color.navyDeep, fontSize: 20, lineHeight: 27 },
  entries: { flexDirection: 'row', alignItems: 'stretch', marginTop: 16 }, entriesCompact: { flexDirection: 'column', gap: 20, marginTop: 8 },
  entriesMobile: { gap: 0 },
  entryMobile: { minHeight: 88, paddingVertical: 12, gap: 12 },
  entryMobileDivider: { borderTopWidth: 1, borderTopColor: tokens.color.sand },
  entryImageMobile: { width: 68, height: 68 },
  entryTitleMobile: { fontSize: 19, lineHeight: 24 },
  entryBodyMobile: { fontSize: 14, lineHeight: 20, marginTop: 3 },
  entryArrow: { fontSize: 22, color: tokens.color.navy },
  entry: { flex: 1, flexBasis: 0, flexDirection: 'row', minWidth: 0, minHeight: 160, alignItems: 'center', gap: 10, paddingVertical: 12, paddingHorizontal: 12 }, entryDivider: { borderLeftWidth: 1, borderLeftColor: tokens.color.sand }, entryCompact: { flex: 0, flexBasis: 'auto', minHeight: 120, paddingHorizontal: 0, gap: 16 },
  entryImage: { width: '46%', height: 185, flexShrink: 0, ...Platform.select({ web: { mixBlendMode: 'multiply' }, default: {} }) }, entryImageCompact: { width: 140, height: 105 }, entryImageNarrow: { width: 110, height: 82 },
  entryCopy: { flex: 1, minWidth: 0, alignItems: 'flex-start' }, entryCopyCompact: { flex: 1 },
  entryTitle: { fontSize: 28, lineHeight: 34, fontWeight: '700', color: tokens.color.navy }, entryTitleCompact: { fontSize: 25, lineHeight: 31 },
  entryBody: { ...tokens.type.body, fontSize: 18, lineHeight: 26, color: semantic.screen.mutedText, marginTop: 8 }, entryBodyCompact: { textAlign: 'left' },
  more: { ...tokens.type.bodyStrong, color: tokens.color.navy, marginTop: 14, paddingBottom: 5, borderBottomWidth: 2 },
  intro: { flexDirection: 'row', alignItems: 'center', gap: tokens.space.xxl, padding: tokens.space.xxl, marginTop: tokens.space.lg, borderRadius: 20, backgroundColor: '#F8EFE2' },
  introCompact: { flexDirection: 'column', alignItems: 'stretch', gap: tokens.space.lg, padding: tokens.space.lg, marginTop: tokens.space.md }, introCopy: { flex: 1, minWidth: 0 },
  kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }, kickerLine: { width: 36, height: 2, backgroundColor: tokens.color.gold }, kicker: { ...tokens.type.eyebrow, color: tokens.color.wine, flexShrink: 1 },
  pageTitle: { ...tokens.type.display, color: semantic.screen.text, marginBottom: 12 }, pageTitleCompact: { fontSize: 36, lineHeight: 42 },
  introduction: { ...tokens.type.bodyStrong, color: semantic.screen.mutedText, maxWidth: 600 }, welcome: { ...tokens.type.body, color: semantic.screen.mutedText, marginTop: 12, maxWidth: 600 },
  pageImage: { width: '42%', height: 240 }, pageImageCompact: { width: '100%', height: 180 },
  pageContent: { paddingBottom: tokens.space.sm }, heading: { ...tokens.type.title, color: semantic.screen.text, marginBottom: tokens.space.sm }, body: { ...tokens.type.body, color: semantic.screen.mutedText },
  meaningRow: { flexDirection: 'row', alignItems: 'center', gap: tokens.space.xl, paddingVertical: tokens.space.xxl }, meaningIcon: { color: tokens.color.gold, fontSize: 48, width: 70, textAlign: 'center' }, meaningCopy: { flex: 1, borderLeftWidth: 1, borderLeftColor: tokens.color.line, paddingLeft: 24 },
  meaningRowCompact: { gap: tokens.space.md, paddingVertical: 40, alignItems: 'flex-start' }, meaningIconCompact: { width: 36, fontSize: 36, lineHeight: 42 }, meaningCopyCompact: { paddingLeft: tokens.space.md },
  journey: { flexDirection: 'row', alignItems: 'center', gap: tokens.space.xl, marginBottom: tokens.space.xxl }, journeyCompact: { flexDirection: 'column', alignItems: 'stretch', gap: tokens.space.lg, marginBottom: 40 }, journeyArt: { width: '43.68%', borderRadius: 16, overflow: 'hidden' }, journeyArtCompact: { width: '100%', alignSelf: 'center' }, journeyImage: { width: '100%', height: '100%' }, journeyCopy: { flex: 1 },
  requirements: { backgroundColor: tokens.color.transparent, borderTopWidth: 1, borderTopColor: tokens.color.line, paddingTop: tokens.space.md, marginTop: tokens.space.lg }, requirementsCompact: { paddingTop: tokens.space.md }, requirementsToggle: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 12 }, requirementsHeading: { flex: 1, minWidth: 0, marginBottom: 0 }, requirementsToggleIcon: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden', backgroundColor: tokens.color.transparent, textAlign: 'center', lineHeight: 40, fontSize: 26, color: tokens.color.navy }, requirementsHint: { ...tokens.type.body, color: semantic.screen.mutedText, marginTop: 4 }, requirementGroup: { marginTop: tokens.space.md }, requirementTitle: { ...tokens.type.bodyStrong, color: semantic.screen.text, marginBottom: tokens.space.xs }, requirementItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: tokens.space.xs }, requirementBullet: { ...tokens.type.body, color: tokens.color.wine }, requirementText: { ...tokens.type.body, color: semantic.screen.mutedText, flex: 1, minWidth: 0 }, requirementsNotice: { ...tokens.type.body, color: semantic.screen.mutedText, marginTop: tokens.space.md }, requirementsLink: { minHeight: 48, alignSelf: 'flex-start', justifyContent: 'center', marginTop: tokens.space.xs }, requirementsLinkText: { ...tokens.type.bodyStrong, color: tokens.color.blue }, catechism: { ...tokens.type.body, color: semantic.screen.mutedText, marginTop: tokens.space.md }, catechismReference: { ...tokens.type.bodyStrong, color: tokens.color.navy, marginTop: tokens.space.xs },
  preparationPanel: { backgroundColor: tokens.color.activityBlue, borderRadius: 16, padding: tokens.space.xl }, panelKicker: { ...tokens.type.eyebrow, color: tokens.color.wine, marginBottom: 8 },
  preparationPanelCompact: { padding: tokens.space.lg, width: '100%', minWidth: 0 },
  steps: { flexDirection: 'row', gap: tokens.space.lg, marginTop: tokens.space.lg }, stepsCompact: { flexDirection: 'column', gap: tokens.space.lg, width: '100%', minWidth: 0 }, step: { flex: 1, flexDirection: 'row', alignItems: 'flex-start', gap: 12 }, stepCompact: { flex: 0, flexBasis: 'auto', width: '100%', minWidth: 0 }, stepDivided: { borderLeftWidth: 1, borderLeftColor: tokens.color.line, paddingLeft: tokens.space.lg }, stepNumber: { width: 30, height: 30, borderRadius: 15, backgroundColor: tokens.color.goldSoft, color: tokens.color.navy, textAlign: 'center', lineHeight: 30, fontWeight: '700' }, stepCopy: { flex: 1, minWidth: 0 }, stepTitle: { ...tokens.type.bodyStrong, color: semantic.screen.text, marginBottom: 4 }, stepBody: { ...tokens.type.body, color: tokens.color.navy }, panelNotice: { ...tokens.type.body, color: tokens.color.navy, borderTopWidth: 1, borderTopColor: tokens.color.line, marginTop: 24, paddingTop: 16 },
  faqSection: { marginTop: tokens.space.hero, maxWidth: 760, alignSelf: 'center', width: '100%' }, faq: { borderBottomWidth: 1, borderColor: tokens.color.line }, faqButton: { minHeight: 56, paddingVertical: tokens.space.xs, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }, question: { ...tokens.type.bodyStrong, color: semantic.screen.text, flexShrink: 1 }, answer: { ...tokens.type.body, color: semantic.screen.mutedText, paddingBottom: 16 },
  faqSectionCompact: { marginTop: tokens.space.xxl },
  contact: { position: 'relative', overflow: 'hidden', paddingHorizontal: tokens.space.lg, paddingTop: tokens.space.xxl, paddingBottom: tokens.space.hero, alignItems: 'center' }, contactWatermark: { position: 'absolute', right: 0, bottom: 0, width: '50%', height: '100%', opacity: 0.7 }, contactCompact: { paddingVertical: tokens.space.xxl }, contactHeading: { textAlign: 'center' }, contactBody: { ...tokens.type.body, color: semantic.screen.mutedText, textAlign: 'center', maxWidth: 520, marginBottom: 20 },
});
