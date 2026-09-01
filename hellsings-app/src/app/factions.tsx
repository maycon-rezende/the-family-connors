import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '@/components/bottom-nav';

const factions = [
  {
    id: 'F-01',
    name: 'HELLSINGS',
    color: '#c43b35',
    status: 'ATIVA',
    territory: 'EM MOVIMENTO',
    text: 'Resgate, inteligência e proteção. Um código antigo atravessando um mundo novo.',
  },
  {
    id: 'F-02',
    name: 'COBRAS',
    color: '#668d5b',
    status: 'INSTÁVEL',
    territory: 'ROTAS CLANDESTINAS',
    text: 'Informação, veneno e comércio. Nunca atacam sem conhecer todas as saídas.',
  },
  {
    id: 'F-03',
    name: 'DOMINUS',
    color: '#7d6aa0',
    status: 'NÃO CONFIRMADA',
    territory: 'DESCONHECIDO',
    text: 'Símbolos aparecem em lugares onde ninguém deveria ter sobrevivido.',
  },
  {
    id: 'F-04',
    name: 'FACÇÃO DO FOGO',
    color: '#e25825',
    status: 'HOSTIL',
    territory: 'REFINARIAS',
    text: 'Controla combustível, fornalhas e cidades queimadas. Cinzas são fronteiras.',
  },
  {
    id: 'F-05',
    name: 'NÔMADES DE FERRO',
    color: '#a6a199',
    status: 'PROVISÓRIA',
    territory: 'ESTRADAS MORTAS',
    text: 'Comboios blindados negociam peças, combustível e passagem.',
  },
  {
    id: 'F-06',
    name: 'ORDEM DO SAL',
    color: '#73abb4',
    status: 'PROVISÓRIA',
    territory: 'COSTA DEVASTADA',
    text: 'Guarda poços, dessalinizadores e os últimos mapas de água.',
  },
];

export default function FactionsScreen() {
  const [open, setOpen] = useState('F-01');
  return (
    <View style={s.screen}>
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.header}>
          <View>
            <Text style={s.brand}>MAPA DE PODER</Text>
            <Text style={s.micro}>SEIS SINAIS DOMINANTES</Text>
          </View>
          <Text style={s.live}>● VARREDURA ATIVA</Text>
        </View>
        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          <Text style={s.eyebrow}>FRONTEIRAS EXTINTAS // TERRITÓRIOS HOSTIS</Text>
          <Text style={s.heading}>AS FACÇÕES{`\n`}HERDARAM O MUNDO.</Text>
          <Text style={s.intro}>
            Toque em um registro para abrir os primeiros dados recuperados. As duas últimas
            identidades permanecem provisórias.
          </Text>
          {factions.map((f) => {
            const selected = open === f.id;
            return (
              <Pressable
                key={f.id}
                onPress={() => setOpen(selected ? '' : f.id)}
                style={[s.card, { borderLeftColor: f.color }, selected && s.cardOpen]}
              >
                <View style={s.row}>
                  <Text style={[s.code, { color: f.color }]}>{f.id}</Text>
                  <Text style={[s.status, { color: f.color }]}>{f.status}</Text>
                </View>
                <Text style={s.name}>{f.name}</Text>
                <Text style={s.territory}>{f.territory}</Text>
                {selected && (
                  <View style={s.dossier}>
                    <Text style={s.dossierLabel}>DOSSIÊ PARCIAL</Text>
                    <Text style={s.description}>{f.text}</Text>
                    <Text style={[s.future, { color: f.color }]}>
                      ARQUIVO INDIVIDUAL EM CONSTRUÇÃO ↗
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
        <BottomNav active="FACÇÕES" />
      </SafeAreaView>
    </View>
  );
}
const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#080604' },
  safe: { flex: 1 },
  header: {
    height: 76,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3b281d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { color: '#eadfce', fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  micro: { color: '#6f6257', fontFamily: 'monospace', fontSize: 6, marginTop: 4 },
  live: { color: '#d36637', fontFamily: 'monospace', fontSize: 6 },
  content: { padding: 20, paddingTop: 40, paddingBottom: 120 },
  eyebrow: { color: '#cf6739', fontFamily: 'monospace', fontSize: 7, letterSpacing: 1.3 },
  heading: { color: '#e9decd', fontSize: 41, lineHeight: 40, fontWeight: '800', marginTop: 12 },
  intro: { color: '#8d8175', fontSize: 12, lineHeight: 19, marginTop: 16, marginBottom: 30 },
  card: {
    minHeight: 160,
    padding: 17,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: '#30251e',
    borderLeftWidth: 4,
    backgroundColor: '#0e0a07',
  },
  cardOpen: { backgroundColor: '#151009' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  code: { fontFamily: 'monospace', fontSize: 7 },
  status: { fontFamily: 'monospace', fontSize: 6 },
  name: { color: '#e7dccb', fontSize: 27, fontWeight: '700', marginTop: 31 },
  territory: { color: '#70675f', fontFamily: 'monospace', fontSize: 6, marginTop: 7 },
  dossier: { borderTopWidth: 1, borderTopColor: '#342a22', marginTop: 18, paddingTop: 15 },
  dossierLabel: { color: '#8c8074', fontFamily: 'monospace', fontSize: 6 },
  description: { color: '#a69a8e', fontSize: 11, lineHeight: 18, marginTop: 9 },
  future: { fontFamily: 'monospace', fontSize: 7, marginTop: 15 },
});
