import { PropsWithChildren, useEffect, useState } from 'react';
import { Link, usePathname } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import { semantic, tokens } from '../design/tokens';

const logoImage = require('../../assets/content/branding/logo-catequesis-cocula.png');

const navigationItems = [
  { href: '/centros', label: 'Centros' },
  { href: '/avisos', label: 'Avisos' },
  { href: '/nosotros', label: 'Nosotros' },
] as const;

export function Container({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  return <View style={[styles.container, style]}>{children}</View>;
}

export function Section({ eyebrow, title, children, tone = 'base' }: PropsWithChildren<{ eyebrow?: string; title: string; tone?: 'base' | 'soft' | 'warm' }>) {
  const { width } = useWindowDimensions();
  const compact = width < tokens.breakpoint.compact;
  const background = tone === 'soft' ? styles.sectionSoft : tone === 'warm' ? styles.sectionWarm : styles.sectionBase;
  return <View style={[styles.section, background, compact && styles.sectionCompact]}><Container>{eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}<Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>{children}</Container></View>;
}

export function AppButton({ label, href, variant = 'primary' }: { label: string; href: string; variant?: 'primary' | 'secondary' }) {
  const compact = useWindowDimensions().width < tokens.breakpoint.compact;
  const button = variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary;
  const labelStyle = variant === 'primary' ? styles.buttonPrimaryLabel : styles.buttonSecondaryLabel;
  return <Link href={href as never} asChild><Pressable accessibilityRole="link" style={StyleSheet.flatten([styles.button, button, compact && styles.buttonCompact])}><Text style={[labelStyle, styles.buttonLabel]}>{label}</Text><Text style={labelStyle}>→</Text></Pressable></Link>;
}

export function PageHeading({ eyebrow, title, body, accent = false }: { eyebrow: string; title: string; body: string; accent?: boolean }) {
  const compact = useWindowDimensions().width < tokens.breakpoint.compact;
  return <View style={[styles.pageHeading, compact && styles.pageHeadingCompact]}><Text style={styles.eyebrow}>{eyebrow}</Text>{accent ? <View style={styles.headingAccent} /> : null}<Text accessibilityRole="header" style={[styles.pageTitle, compact && styles.pageTitleCompact]}>{title}</Text><Text style={styles.pageBody}>{body}</Text></View>;
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return <View style={styles.empty}><Text style={styles.emptyIcon}>✦</Text><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyBody}>{body}</Text></View>;
}

export function SiteHeader() {
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const mobile = width < 960;
  const phone = width < 768;
  const [menuOpen, setMenuOpen] = useState(false);
  const [sacramentsOpen, setSacramentsOpen] = useState(false);
  useEffect(() => {
    if (typeof document === 'undefined' || !sacramentsOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setSacramentsOpen(false); };
    const onClick = (event: MouseEvent) => { if (!(event.target as Element).closest?.('#sacrament-menu')) setSacramentsOpen(false); };
    document.addEventListener('keydown', onKey); document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, [sacramentsOpen]);
  const closeMenus = () => { setMenuOpen(false); setSacramentsOpen(false); };
  const navigation = <View style={[styles.nav, mobile && styles.navMobile]} accessibilityRole="navigation" accessibilityLabel="Navegación principal">
    <View nativeID="sacrament-menu" style={styles.dropdownContainer}>
      <Pressable accessibilityRole="button" accessibilityLabel="Sacramentos" accessibilityState={{ expanded: sacramentsOpen }} onPress={() => setSacramentsOpen((value) => !value)} style={[styles.navLink, pathname.startsWith('/sacramentos') && styles.navLinkActive, phone && styles.sacramentToggleMobile]}><Text style={styles.navLinkText}>Sacramentos</Text>{phone && <Text style={styles.sacramentChevron} accessibilityElementsHidden>{sacramentsOpen ? '⌃' : '⌄'}</Text>}</Pressable>
      {sacramentsOpen ? <View style={[styles.dropdown, mobile && styles.dropdownMobile, phone && styles.sacramentDropdownPhone]}>{[{ href: '/sacramentos/bautismo', label: 'Bautismo' }, { href: '/sacramentos/primera-comunion', label: 'Primera Comunión' }, { href: '/sacramentos/confirmacion', label: 'Confirmación' }].map((item) => <Link key={item.href} href={item.href as never} asChild><Pressable accessibilityRole="link" onPress={closeMenus} style={StyleSheet.flatten([styles.dropdownLink, phone && styles.sacramentLinkPhone])}><Text style={styles.navLinkText}>{item.label}</Text></Pressable></Link>)}</View> : null}
    </View>
    {navigationItems.map((item) => <Link key={item.href} href={item.href} asChild><Pressable onPress={closeMenus} style={StyleSheet.flatten([styles.navLink, pathname === item.href && styles.navLinkActive])}><Text style={styles.navLinkText}>{item.label}</Text></Pressable></Link>)}
    <Link href="/contacto" asChild><Pressable onPress={closeMenus} style={styles.navAction}><Text style={styles.navActionText}>Contactar</Text></Pressable></Link>
  </View>;
  return <View style={{ zIndex: 10 }}>
    <Link href="/contacto" asChild><Pressable style={styles.ribbon}><Container style={styles.ribbonInner}><View style={styles.ribbonContent}>{mobile ? <Text style={[styles.ribbonText, styles.ribbonTextMobile]}>Inscripciones 2026 abiertas →</Text> : <><Text style={styles.ribbonText}>Inscripciones abiertas para catequesis 2026</Text><Text style={styles.ribbonAction}>Consulta requisitos y horarios →</Text></>}</View></Container></Pressable></Link>
    <View style={styles.header}><Container style={StyleSheet.flatten([styles.headerInner, mobile && styles.headerInnerMobile]) ?? undefined}>
      <Link href="/" asChild><Pressable onPress={closeMenus} style={StyleSheet.flatten([styles.brand, mobile && styles.brandMobile])}><View style={[styles.brandMark, mobile && styles.brandMarkMobile]}><Image source={logoImage} style={styles.brandLogo} resizeMode="contain" accessibilityLabel="Logotipo de Catequesis Infantil Cocula" /></View><View style={styles.brandCopy}><Text style={[styles.brandName, mobile && styles.brandNameMobile]} numberOfLines={1}>{mobile ? 'Catequesis Cocula' : 'Catequesis Infantil'}</Text>{!mobile ? <Text style={styles.brandPlace}>Cocula, Jalisco</Text> : null}</View></Pressable></Link>
      {mobile ? <Pressable accessibilityRole="button" accessibilityState={{ expanded: menuOpen }} accessibilityLabel={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onPress={() => setMenuOpen(!menuOpen)} style={styles.menuButton}><Text style={styles.menuIcon}>{menuOpen ? '×' : '☰'}</Text></Pressable> : navigation}
    </Container>{mobile && menuOpen ? <Container>{navigation}</Container> : null}</View>
  </View>;
}

export function SiteFooter() {
  const { width } = useWindowDimensions();
  const compact = width < tokens.breakpoint.compact;
  const mobile = width < 768;
  const footerLinks = [
    { href: '/sacramentos', label: 'Sacramentos' },
    ...navigationItems,
    { href: '/contacto', label: 'Contacto' },
  ] as const;

  return <View style={[styles.footer, mobile && styles.footerMobile]}><Container>
    <View style={[styles.footerColumns, compact && styles.footerColumnsCompact, mobile && styles.footerColumnsMobile]}>
      <View style={[styles.footerIntro, mobile && styles.footerColumnMobile]}>
        <View style={[styles.footerBrand, mobile && styles.footerBrandMobile]}>
          <Image source={logoImage} style={[styles.footerLogo, mobile && styles.footerLogoMobile]} resizeMode="contain" accessibilityLabel="Logotipo de Catequesis Infantil Cocula" />
          <View style={styles.footerBrandText}><Text style={styles.footerTitle}>Catequesis Infantil</Text><Text style={styles.footerPlace}>Cocula, Jalisco</Text></View>
        </View>
        {!mobile && <><Text style={styles.footerDescription}>Acompañando a nuestras niñas y niños en su camino de fe.</Text><View style={styles.footerAccent} /></>}
      </View>
      <View style={[styles.footerNavigation, mobile && styles.footerColumnMobile]} accessibilityRole="navigation" accessibilityLabel="Navegación del pie de página">
        <Text style={styles.footerHeading}>EXPLORA</Text>
        <View style={mobile && styles.footerLinksMobile}>{footerLinks.map((item) => <Link key={item.href} href={item.href} asChild><Pressable accessibilityRole="link" style={StyleSheet.flatten([styles.footerLink, mobile && styles.footerLinkMobile])}><Text style={styles.footerLinkText}>{item.label}</Text></Pressable></Link>)}</View>
      </View>
      <View style={[styles.footerContact, mobile && styles.footerColumnMobile]}>
        <Text style={styles.footerHeading}>ESTAMOS PARA TI</Text>
        {!mobile && <Text style={styles.footerContactLabel}>Visítanos</Text>}
        <Link href="https://www.google.com/maps/search/?api=1&query=16+de+Septiembre+s%2Fn%2C+Centro%2C+48500+Cocula%2C+Jalisco%2C+Mexico" asChild><Pressable accessibilityRole="link" accessibilityLabel="Ver dirección en el mapa" style={StyleSheet.flatten([styles.footerContactLink, mobile && styles.footerContactLinkMobile])}><Text style={[styles.footerLinkText, mobile && styles.footerTextMobile]}>{mobile ? '16 de Septiembre s/n, Centro, Cocula, Jal.' : '16 de Septiembre s/n, Centro,\n48500 Cocula, Jal., México'}</Text></Pressable></Link>
        {!mobile && <Text style={styles.footerContactLabel}>Llámanos</Text>}
        <Link href="tel:+523777734516" asChild><Pressable accessibilityRole="link" style={StyleSheet.flatten([styles.footerContactLink, mobile && styles.footerContactLinkMobile])}><Text style={[styles.footerLinkText, mobile && styles.footerTextMobile]}>+52 377 773 4516</Text></Pressable></Link>
        <Link href="https://www.facebook.com/CatequesisCocula/photos" asChild><Pressable accessibilityRole="link" accessibilityLabel="Visitar Facebook de Catequesis Cocula" style={styles.footerSocial}><Text style={styles.footerSocialIcon}>f</Text><Text style={styles.footerSocialText}>Síguenos en Facebook</Text></Pressable></Link>
      </View>
    </View>
    <View style={[styles.footerBottom, compact && styles.footerBottomCompact, mobile && styles.footerBottomMobile]}><Text style={styles.footerBottomText}>Parroquia San Miguel Arcángel</Text>{!mobile && <Text style={styles.footerBottomText}>Cocula, Jalisco · México</Text>}</View>
  </Container></View>;
}

const styles = StyleSheet.create({
  container: { width: tokens.layout.full, maxWidth: tokens.size.content, alignSelf: tokens.layout.center, paddingHorizontal: tokens.space.lg },
  ribbon: { backgroundColor: semantic.action.secondary }, ribbonInner: { paddingVertical: tokens.space.xs },
  ribbonContent: { flexDirection: tokens.layout.row, flexWrap: tokens.layout.wrap, alignItems: tokens.layout.center, justifyContent: tokens.layout.center, gap: tokens.space.sm },
  ribbonText: { ...tokens.type.label, color: semantic.action.onAction, textAlign: 'center' }, ribbonTextMobile: { fontSize: 14, lineHeight: 20 }, ribbonAction: { ...tokens.type.label, color: tokens.color.goldSoft, textAlign: 'center' },
  header: { backgroundColor: semantic.surface.base, borderBottomWidth: tokens.space.hairline, borderBottomColor: semantic.screen.line },
  headerInner: { minHeight: tokens.size.header, flexDirection: tokens.layout.row, alignItems: tokens.layout.center, justifyContent: tokens.layout.between, flexWrap: tokens.layout.wrap, paddingVertical: tokens.space.xs, gap: tokens.space.md },
  brand: { flexDirection: tokens.layout.row, alignItems: tokens.layout.center, gap: tokens.space.sm, minWidth: 0 },
  brandMark: { width: 113, height: 113, flexShrink: 0, borderRadius: tokens.radius.md, backgroundColor: semantic.surface.base, overflow: 'hidden' },
  brandLogo: { width: tokens.layout.full, height: tokens.layout.full }, brandName: { ...tokens.type.brandTitle, color: semantic.screen.text }, brandPlace: { ...tokens.type.brandSubtitle, color: semantic.screen.mutedText },
  nav: { flexDirection: tokens.layout.row, flexWrap: tokens.layout.wrap, alignItems: tokens.layout.center, gap: tokens.space.md }, navLink: { minHeight: tokens.size.button, paddingHorizontal: tokens.space.xs, justifyContent: tokens.layout.center }, navLinkText: { ...tokens.type.bodyStrong, color: semantic.screen.text },
  sacramentToggleMobile: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 12 },
  sacramentChevron: { fontSize: 24, color: tokens.color.navy },
  sacramentDropdownPhone: { padding: 0, marginBottom: 8, overflow: 'hidden' },
  sacramentLinkPhone: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, minHeight: 48 },
  navLinkActive: { borderBottomWidth: 3, borderBottomColor: tokens.color.wine },
  navAction: { minHeight: tokens.size.button, alignSelf: 'flex-start', justifyContent: tokens.layout.center, backgroundColor: semantic.action.primary, paddingHorizontal: tokens.space.md, borderRadius: tokens.radius.pill }, navActionText: { ...tokens.type.bodyStrong, color: semantic.action.onAction },
  headerInnerMobile: { flexWrap: 'nowrap', gap: tokens.space.xs, minHeight: 64 }, brandMobile: { flex: 1 }, brandCopy: { flexShrink: 1 },
  brandMarkMobile: { width: 56, height: 56 }, brandNameMobile: { fontSize: 17, lineHeight: 22 },
  menuButton: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' }, menuIcon: { color: semantic.screen.text, fontSize: 25, lineHeight: 30 }, navMobile: { flexDirection: 'column', alignItems: 'stretch', gap: 0, paddingBottom: 16 }, dropdownContainer: { position: 'relative', zIndex: 20 }, dropdown: { position: 'absolute', top: 48, left: 0, width: 210, backgroundColor: tokens.color.white, borderRadius: 12, padding: 8, ...tokens.shadow.card }, dropdownMobile: { position: 'relative', top: 0, width: '100%', shadowOpacity: 0, elevation: 0, backgroundColor: tokens.color.blueSoft }, dropdownLink: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 12 },
  section: { paddingVertical: tokens.space.hero }, sectionCompact: { paddingVertical: tokens.space.xxl }, sectionBase: { backgroundColor: semantic.screen.background }, sectionSoft: { backgroundColor: semantic.surface.subtle }, sectionWarm: { backgroundColor: semantic.surface.warm },
  eyebrow: { ...tokens.type.eyebrow, color: tokens.color.wine, textTransform: 'uppercase', marginBottom: tokens.space.sm }, sectionTitle: { ...tokens.type.title, color: semantic.screen.text, marginBottom: tokens.space.xl },
  button: { minHeight: tokens.size.button, borderRadius: tokens.radius.pill, paddingHorizontal: tokens.space.lg, flexDirection: tokens.layout.row, alignItems: tokens.layout.center, justifyContent: tokens.layout.center, alignSelf: tokens.layout.start, gap: tokens.space.sm },
  buttonCompact: { maxWidth: '100%' }, buttonLabel: { flexShrink: 1 },
  buttonPrimary: { backgroundColor: semantic.action.primary }, buttonSecondary: { backgroundColor: tokens.color.transparent, borderColor: semantic.action.primary, borderWidth: tokens.space.hairline }, buttonPrimaryLabel: { ...tokens.type.label, color: semantic.action.onAction }, buttonSecondaryLabel: { ...tokens.type.label, color: semantic.action.primary },
  headingAccent: { width: 48, height: 2, backgroundColor: tokens.color.gold, marginBottom: 16 },
  pageHeading: { paddingTop: tokens.space.hero, paddingBottom: tokens.space.xxl, maxWidth: 760 }, pageTitle: { ...tokens.type.display, color: semantic.screen.text, marginBottom: tokens.space.md }, pageBody: { ...tokens.type.body, color: semantic.screen.mutedText, maxWidth: 640 },
  pageHeadingCompact: { paddingTop: tokens.space.xxl, paddingBottom: tokens.space.xl }, pageTitleCompact: { fontSize: 36, lineHeight: 42 },
  empty: { backgroundColor: semantic.surface.base, borderRadius: tokens.radius.lg, padding: tokens.space.xxl, alignItems: tokens.layout.center, borderWidth: tokens.space.hairline, borderColor: semantic.screen.line }, emptyIcon: { fontSize: tokens.size.iconLg, color: tokens.color.gold, marginBottom: tokens.space.sm }, emptyTitle: { ...tokens.type.title, color: semantic.screen.text, textAlign: tokens.layout.center }, emptyBody: { ...tokens.type.body, color: semantic.screen.mutedText, textAlign: tokens.layout.center, marginTop: tokens.space.xs },
  footer: { backgroundColor: tokens.color.navyDeep, paddingTop: tokens.space.xxl, paddingBottom: tokens.space.lg, borderTopWidth: 3, borderTopColor: tokens.color.gold },
  footerMobile: { paddingVertical: 24 },
  footerColumnsMobile: { flexDirection: 'column', gap: 16, paddingBottom: 16 },
  footerColumnMobile: { flex: 0, flexBasis: 'auto' },
  footerBrandMobile: { marginBottom: 0 },
  footerLogoMobile: { width: 52, height: 52 },
  footerLinksMobile: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 24 },
  footerLinkMobile: { minHeight: 44, justifyContent: 'center' },
  footerContactLinkMobile: { minHeight: 44, justifyContent: 'center', marginBottom: 0 }, footerTextMobile: { fontSize: 14, lineHeight: 21 }, footerBottomMobile: { paddingTop: 16 },
  footerColumns: { flexDirection: 'row', gap: tokens.space.xxl, paddingBottom: tokens.space.xxl },
  footerColumnsCompact: { flexDirection: 'column', gap: tokens.space.xl, paddingBottom: tokens.space.xl },
  footerIntro: { flex: 1.3, minWidth: 0 }, footerNavigation: { flex: 0.7 }, footerContact: { flex: 1 },
  footerBrand: { flexDirection: 'row', alignItems: 'center', gap: tokens.space.md, marginBottom: tokens.space.lg },
  footerBrandText: { flexShrink: 1 }, footerLogo: { width: 68, height: 68, borderRadius: tokens.radius.md, backgroundColor: tokens.color.white },
  footerTitle: { fontSize: 22, lineHeight: 28, fontWeight: '700', color: tokens.color.white },
  footerPlace: { ...tokens.type.body, color: tokens.color.goldSoft },
  footerDescription: { ...tokens.type.body, color: tokens.color.blueSoft, maxWidth: 290 },
  footerAccent: { width: 48, height: 2, backgroundColor: tokens.color.gold, marginTop: tokens.space.lg },
  footerHeading: { ...tokens.type.eyebrow, color: tokens.color.goldSoft, marginBottom: tokens.space.md },
  footerLink: { alignSelf: 'flex-start', paddingVertical: tokens.space.xxs },
  footerLinkText: { ...tokens.type.body, color: tokens.color.blueSoft },
  footerContactLabel: { ...tokens.type.label, color: tokens.color.white, marginBottom: tokens.space.xxs },
  footerContactLink: { alignSelf: 'flex-start', marginBottom: tokens.space.md },
  footerSocial: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: tokens.space.sm, marginTop: tokens.space.xxs },
  footerSocialIcon: { width: 32, height: 32, overflow: 'hidden', borderRadius: 16, backgroundColor: tokens.color.gold, color: tokens.color.navyDeep, textAlign: 'center', fontSize: 23, lineHeight: 33, fontWeight: '700' },
  footerSocialText: { ...tokens.type.label, color: tokens.color.white },
  footerBottom: { borderTopWidth: 1, borderTopColor: '#466077', paddingTop: tokens.space.lg, flexDirection: 'row', justifyContent: 'space-between', gap: tokens.space.xs },
  footerBottomCompact: { flexDirection: 'column' }, footerBottomText: { ...tokens.type.label, color: tokens.color.blueSoft },
});
