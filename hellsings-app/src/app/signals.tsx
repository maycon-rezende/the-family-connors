import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '@/components/bottom-nav';

const signals = [
  {
    code: 'B-01',
    name: 'BRADDOCK...',
    strength: '12%',
    last: 'ZONA NORTE // 03 DIAS',
    text: 'Antigo contato de Jack no FBI. A transmissão pode conter coordenadas para uma terra livre das hordas.',
  },
  {
    code: 'M-??',
    name: 'MAJOR HAN...',
    strength: '04%',
    last: 'CANAL MILITAR // ONTEM',
    text: 'Identidade incompleta. Onze segundos de voz foram recuperados sob forte interferência.',
  },
  {
    code: 'C-??',
    name: 'CORONEL SA...',
    strength: '01%',
    last: 'ORIGEM CORROMPIDA',
    text: 'Patente confirmada. Nome, unidade e posição desapareceram durante a queda da rede.',
  },
];
export default function SignalsScreen() {
  const [active, setActive] = useState('B-01');
  return (
    <View style={s.screen}>
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.header}>
          <View>
            <Text style={s.brand}>REDE DE SINAIS</Text>
            <Text style={s.micro}>FREQUÊNCIAS MORTAS // ESCUTA</Text>
          </View>
          <Text style={s.scan}>◉ RASTREANDO</Text>
        </View>
        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          <View style={s.radar}>
            <View style={s.radarRing}>
              <View style={s.radarCore} />
            </View>
            <Text style={s.radarText}>VARREDURA 360° // NENHUMA RESPOSTA ESTÁVEL</Text>
          </View>
          <Text style={s.eyebrow}>PESSOAS DESAPARECIDAS // BUSCA ATIVA</Text>
          <Text style={s.heading}>SE ESTIVEREM VIVOS,{`\n`}QUE RESPONDAM.</Text>
          {signals.map((item) => {
            const open = active === item.code;
            return (
              <Pressable
                key={item.code}
                onPress={() => setActive(open ? '' : item.code)}
                style={[s.card, open && s.cardOpen]}
              >
                <View style={s.row}>
                  <Text style={s.code}>ALVO // {item.code}</Text>
                  <Text style={s.strength}>SINAL {item.strength}</Text>
                </View>
                <Text style={s.name}>{item.name}</Text>
                <Text style={s.last}>{item.last}</Text>
                {open && (
                  <View style={s.open}>
                    <Text style={s.text}>{item.text}</Text>
                    <View style={s.wave}>
                      <View style={s.waveLine} />
                    </View>
                    <Text style={s.search}>PROCURANDO...</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
          <View style={s.notice}>
            <Text style={s.noticeTitle}>PROTOCOLO DE ESCUTA</Text>
            <Text style={s.noticeText}>
              Este terminal apresenta sinais narrativos. Nenhuma localização real é coletada ou
              transmitida.
            </Text>
          </View>
        </ScrollView>
        <BottomNav active="SINAIS" />
      </SafeAreaView>
    </View>
  );
}
const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#050807' },
  safe: { flex: 1 },
  header: {
    height: 76,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#213130',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { color: '#dce2dc', fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  micro: { color: '#657371', fontFamily: 'monospace', fontSize: 6, marginTop: 4 },
  scan: { color: '#65b5b7', fontFamily: 'monospace', fontSize: 6 },
  content: { padding: 20, paddingTop: 28, paddingBottom: 120 },
  radar: {
    height: 230,
    borderWidth: 1,
    borderColor: '#244240',
    backgroundColor: '#07100f',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
    overflow: 'hidden',
  },
  radarRing: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#3d7472',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarCore: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#68b7b9',
    shadowColor: '#68b7b9',
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  radarText: {
    position: 'absolute',
    bottom: 15,
    color: '#527b79',
    fontFamily: 'monospace',
    fontSize: 6,
  },
  eyebrow: { color: '#6ab5b7', fontFamily: 'monospace', fontSize: 7, letterSpacing: 1.3 },
  heading: {
    color: '#e2e3dc',
    fontSize: 37,
    lineHeight: 38,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 27,
  },
  card: {
    minHeight: 147,
    padding: 17,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: '#22312f',
    borderLeftWidth: 3,
    borderLeftColor: '#4a7573',
    backgroundColor: '#080e0d',
  },
  cardOpen: { borderLeftColor: '#d75c35', backgroundColor: '#0d100e' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  code: { color: '#65abad', fontFamily: 'monospace', fontSize: 7 },
  strength: { color: '#d2643d', fontFamily: 'monospace', fontSize: 7 },
  name: { color: '#e5e2d9', fontSize: 29, fontWeight: '700', marginTop: 28 },
  last: { color: '#64716e', fontFamily: 'monospace', fontSize: 6, marginTop: 6 },
  open: { borderTopWidth: 1, borderTopColor: '#273735', paddingTop: 14, marginTop: 16 },
  text: { color: '#98a39f', fontSize: 11, lineHeight: 18 },
  wave: { height: 24, justifyContent: 'center', overflow: 'hidden', marginTop: 13 },
  waveLine: { height: 1, backgroundColor: '#579b9b' },
  search: { color: '#d65b35', fontFamily: 'monospace', fontSize: 7, marginTop: 9 },
  notice: { borderWidth: 1, borderColor: '#273735', padding: 16, marginTop: 26 },
  noticeTitle: { color: '#65abad', fontFamily: 'monospace', fontSize: 7 },
  noticeText: { color: '#66716d', fontSize: 10, lineHeight: 16, marginTop: 8 },
});
