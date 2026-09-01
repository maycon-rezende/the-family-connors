import { router } from 'expo-router';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '@/components/bottom-nav';
import { BrandMark } from '@/components/brand-mark';

const conditions = [
  ['TEMPERATURA', '46°'],
  ['VENTO', '73 KM/H'],
  ['VISIBILIDADE', '1,8 KM'],
  ['RADIAÇÃO', 'CRÍTICA'],
];
const frequencies = [
  { code: 'SINAL 09', title: 'BRADDOCK...', text: 'Transmissão fragmentada além da zona norte.' },
  {
    code: 'SINAL 14',
    title: 'MAJOR HAN...',
    text: 'Canal militar reativado durante onze segundos.',
  },
  {
    code: 'SINAL 21',
    title: 'CORONEL SA...',
    text: 'Identidade corrompida. Posição desconhecida.',
  },
];

export default function WorldScreen() {
  return (
    <View style={s.screen}>
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.header}>
          <View style={s.brand}>
            <BrandMark size={35} />
            <View>
              <Text style={s.brandName}>ERA DA EXTINÇÃO</Text>
              <Text style={s.micro}>ARQUIVO DO PRESENTE</Text>
            </View>
          </View>
          <View style={s.headerRight}>
            <Text style={s.unstable}>● ATMOSFERA INSTÁVEL</Text>
            <Pressable onPress={() => router.replace('/')}>
              <Text style={s.exit}>TROCAR IDENTIDADE ↗</Text>
            </Pressable>
          </View>
        </View>
        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={require('../../assets/world/extincao.jpg')}
            style={s.hero}
            imageStyle={s.heroImage}
          >
            <View style={s.heroShade} />
            <View style={s.heroCopy}>
              <Text style={s.eyebrow}>SETOR DESCONHECIDO // 06:42</Text>
              <Text style={s.heading}>O MUNDO{`\n`}AINDA RESPIRA.</Text>
              <Text style={s.intro}>
                Mas cada respiração carrega areia, ferrugem e sinais de pessoas que talvez já não
                estejam vivas.
              </Text>
            </View>
          </ImageBackground>
          <View style={s.weatherHeader}>
            <View>
              <Text style={s.eyebrow}>MONITOR ATMOSFÉRICO</Text>
              <Text style={s.sectionTitle}>CLIMA DA ZONA</Text>
            </View>
            <Text style={s.storm}>TEMPESTADE DE AREIA</Text>
          </View>
          <View style={s.weatherGrid}>
            {conditions.map(([label, value]) => (
              <View key={label} style={s.weatherCell}>
                <Text style={s.label}>{label}</Text>
                <Text style={[s.value, value === 'CRÍTICA' && s.danger]}>{value}</Text>
              </View>
            ))}
          </View>
          <Text style={s.weatherNote}>
            PREVISÃO: a frente de poeira alcançará a rota do comboio em aproximadamente 01:37.
          </Text>
          <SectionHead
            eyebrow="MAPA DE PODER // 06 REGISTROS"
            title="FACÇÕES"
            action="ABRIR MAPA ↗"
            onPress={() => router.push('/factions')}
          />
          <Pressable onPress={() => router.push('/factions')} style={s.factionPreview}>
            <View style={s.factionBars}>
              {['#bd3731', '#678c58', '#79669d', '#e45a25', '#a7a39a', '#75aeb6'].map((color) => (
                <View key={color} style={[s.factionBar, { backgroundColor: color }]} />
              ))}
            </View>
            <Text style={s.factionTitle}>SEIS BANDEIRAS. NENHUMA FRONTEIRA SEGURA.</Text>
            <Text style={s.factionText}>
              Hellsings · Cobras · Dominus · Fogo · dois sinais sem confirmação.
            </Text>
          </Pressable>
          <SectionHead
            eyebrow="BUSCA ATIVA"
            title="SINAIS PERDIDOS"
            action="RASTREAR ↗"
            onPress={() => router.push('/signals')}
          />
          {frequencies.map((signal) => (
            <Pressable key={signal.code} onPress={() => router.push('/signals')} style={s.signal}>
              <View>
                <Text style={s.signalCode}>{signal.code}</Text>
                <Text style={s.signalTitle}>{signal.title}</Text>
                <Text style={s.signalText}>{signal.text}</Text>
              </View>
              <Text style={s.pulse}>◉</Text>
            </Pressable>
          ))}
          <Pressable onPress={() => router.push('/agents')} style={s.hellsingsPortal}>
            <BrandMark size={58} />
            <View style={s.portalCopy}>
              <Text style={s.portalCode}>FACÇÃO F-01 // ATIVA</Text>
              <Text style={s.portalTitle}>HELLSINGS</Text>
              <Text style={s.portalText}>A organização permaneceu. A missão mudou.</Text>
            </View>
            <Text style={s.portalArrow}>›</Text>
          </Pressable>
          <Text style={s.footer}>
            EDE MOBILE // DADOS NARRATIVOS LOCAIS{`\n`}O PRESENTE COMEÇA DEPOIS DO FIM.
          </Text>
        </ScrollView>
        <BottomNav active="MUNDO" />
      </SafeAreaView>
    </View>
  );
}

function SectionHead({
  eyebrow,
  title,
  action,
  onPress,
}: {
  eyebrow: string;
  title: string;
  action: string;
  onPress: () => void;
}) {
  return (
    <View style={s.sectionHead}>
      <View>
        <Text style={s.eyebrow}>{eyebrow}</Text>
        <Text style={s.sectionTitle}>{title}</Text>
      </View>
      <Pressable onPress={onPress}>
        <Text style={s.open}>{action}</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#080604' },
  safe: { flex: 1 },
  header: {
    height: 76,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#382218',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  brandName: { color: '#e8ded0', fontSize: 10, fontWeight: '800', letterSpacing: 1.6 },
  micro: { color: '#77695c', fontFamily: 'monospace', fontSize: 6, letterSpacing: 1, marginTop: 3 },
  headerRight: { alignItems: 'flex-end', gap: 6 },
  unstable: { color: '#dc6335', fontFamily: 'monospace', fontSize: 6, letterSpacing: 0.7 },
  exit: { color: '#776d63', fontFamily: 'monospace', fontSize: 6 },
  content: { paddingBottom: 120 },
  hero: { minHeight: 490, justifyContent: 'flex-end' },
  heroImage: { opacity: 0.72 },
  heroShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(8,5,3,.38)' },
  heroCopy: { padding: 22, paddingBottom: 38 },
  eyebrow: { color: '#d16936', fontFamily: 'monospace', fontSize: 7, letterSpacing: 1.4 },
  heading: {
    color: '#eadfce',
    fontSize: 49,
    lineHeight: 45,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 12,
  },
  intro: { color: '#c1b3a2', fontSize: 13, lineHeight: 20, maxWidth: 330, marginTop: 16 },
  weatherHeader: {
    paddingHorizontal: 20,
    paddingTop: 38,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionTitle: {
    color: '#e4d9c9',
    fontSize: 30,
    fontWeight: '300',
    letterSpacing: 1,
    marginTop: 7,
  },
  storm: {
    color: '#dd6030',
    fontFamily: 'monospace',
    fontSize: 6,
    maxWidth: 86,
    textAlign: 'right',
  },
  weatherGrid: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 1,
    backgroundColor: '#3b281c',
  },
  weatherCell: {
    width: '49.8%',
    minHeight: 96,
    padding: 14,
    justifyContent: 'space-between',
    backgroundColor: '#110d09',
  },
  label: { color: '#786e63', fontFamily: 'monospace', fontSize: 6, letterSpacing: 1 },
  value: { color: '#dfd5c6', fontSize: 25, fontWeight: '300' },
  danger: { color: '#e34f31' },
  weatherNote: {
    marginHorizontal: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#4c2c1d',
    color: '#a76b48',
    fontFamily: 'monospace',
    fontSize: 7,
    lineHeight: 13,
  },
  sectionHead: {
    marginHorizontal: 20,
    marginTop: 48,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  open: { color: '#d68a4b', fontFamily: 'monospace', fontSize: 7 },
  factionPreview: {
    marginHorizontal: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#403026',
    backgroundColor: '#0e0a07',
  },
  factionBars: { height: 5, flexDirection: 'row', gap: 2, marginBottom: 25 },
  factionBar: { flex: 1 },
  factionTitle: { color: '#e5d9c8', fontSize: 20, fontWeight: '700', lineHeight: 25 },
  factionText: { color: '#81766c', fontSize: 10, lineHeight: 16, marginTop: 9 },
  signal: {
    marginHorizontal: 20,
    marginBottom: 7,
    minHeight: 112,
    padding: 15,
    borderWidth: 1,
    borderColor: '#34261d',
    borderLeftWidth: 3,
    borderLeftColor: '#c85b31',
    backgroundColor: '#0d0a08',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signalCode: { color: '#bf633b', fontFamily: 'monospace', fontSize: 6 },
  signalTitle: { color: '#e6dac9', fontSize: 20, fontWeight: '600', marginTop: 9 },
  signalText: { color: '#786f66', fontSize: 9, marginTop: 6 },
  pulse: { color: '#d74d2e', fontSize: 18 },
  hellsingsPortal: {
    margin: 20,
    marginTop: 50,
    minHeight: 116,
    padding: 16,
    borderWidth: 1,
    borderColor: '#702c29',
    backgroundColor: '#110706',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  portalCopy: { flex: 1 },
  portalCode: { color: '#c3483f', fontFamily: 'monospace', fontSize: 6 },
  portalTitle: {
    color: '#d23f38',
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 5,
  },
  portalText: { color: '#8d7770', fontSize: 9, marginTop: 4 },
  portalArrow: { color: '#c94038', fontSize: 30 },
  footer: {
    color: '#4f4841',
    fontFamily: 'monospace',
    fontSize: 7,
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 30,
  },
});
