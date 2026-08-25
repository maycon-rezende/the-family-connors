import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandMark } from '@/components/brand-mark';

type Clue = {
  id: string;
  code: string;
  title: string;
  source: string;
  summary: string;
  link: string;
  requires?: string;
};
const clues: Clue[] = [
  {
    id: 'symbol',
    code: 'E-01',
    title: 'SÍMBOLO RECORRENTE',
    source: 'FAROL · ROTA DE MARFIM',
    summary:
      'Uma marca geométrica aparece em documentos recuperados em duas operações sem ligação aparente.',
    link: 'Naomi identificou pequenas diferenças: não é uma assinatura. É uma classificação interna.',
  },
  {
    id: 'circle',
    code: 'E-02',
    title: 'O CÍRCULO',
    source: 'CASA SEM JANELAS',
    summary: 'Sobreviventes ouviram integrantes mencionarem “o círculo” durante transferências.',
    link: 'O termo coincide com o nome usado pela estrutura desativada na operação Círculo de Ébano.',
    requires: 'symbol',
  },
  {
    id: 'initials',
    code: 'E-03',
    title: 'INICIAIS V.E.',
    source: 'ROTA DE MARFIM',
    summary:
      'Pagamentos fragmentados convergem para um intermediário identificado somente pelas iniciais V.E.',
    link: 'As iniciais aparecem novamente em metadados do Arquivo Vesper.',
    requires: 'circle',
  },
  {
    id: 'buyers',
    code: 'E-04',
    title: 'COMPRADORES VESPER',
    source: 'ÚLTIMO LEILÃO',
    summary:
      'Três compradores estão ligados a empresas registradas nos documentos recuperados na Europa.',
    link: 'As empresas não financiam operações isoladas. Elas sustentam uma infraestrutura comum.',
    requires: 'initials',
  },
  {
    id: 'ghost',
    code: 'E-05',
    title: 'O CLIENTE FANTASMA',
    source: 'CÍRCULO DE ÉBANO',
    summary:
      'Um cliente deixou a instalação antes da contenção. Sua chegada não consta nas câmeras externas.',
    link: 'Jack suspeita que o cliente fantasma e V.E. sejam a mesma pessoa — ou que um esteja protegendo o outro.',
    requires: 'buyers',
  },
];

export default function InvestigationScreen() {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [selected, setSelected] = useState<Clue | null>(null);
  const progress = Math.round((unlocked.length / clues.length) * 100);
  const complete = progress === 100;
  const unlock = (clue: Clue) => {
    if (clue.requires && !unlocked.includes(clue.requires)) return;
    setSelected(clue);
    setUnlocked((current) => (current.includes(clue.id) ? current : [...current, clue.id]));
  };
  const available = useMemo(
    () => clues.map((c) => ({ ...c, locked: !!c.requires && !unlocked.includes(c.requires) })),
    [unlocked]
  );
  return (
    <View style={s.screen}>
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.header}>
          <View style={s.brand}>
            <BrandMark size={35} />
            <View>
              <Text style={s.brandName}>PROTOCOLO VESPER</Text>
              <Text style={s.micro}>ACTIVE INVESTIGATION</Text>
            </View>
          </View>
          <Pressable onPress={() => router.back()}>
            <Text style={s.back}>← COFRE</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          <Text style={s.eyebrow}>CASO PRINCIPAL // HLS-X01</Text>
          <Text style={s.heading}>A REDE{`\n`}POR TRÁS DA REDE.</Text>
          <Text style={s.intro}>
            Cinco evidências ligam operações separadas por anos. Analise cada arquivo na ordem
            correta para reconstruir a estrutura.
          </Text>
          <View style={s.progressCard}>
            <View style={s.row}>
              <Text style={s.label}>PROGRESSO DA INVESTIGAÇÃO</Text>
              <Text style={s.progressValue}>{progress}%</Text>
            </View>
            <View style={s.progressTrack}>
              <View style={[s.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={s.progressNote}>
              {complete
                ? 'CONEXÃO CENTRAL IDENTIFICADA'
                : 'ANÁLISE EM ANDAMENTO · ' + unlocked.length + '/5 EVIDÊNCIAS'}
            </Text>
          </View>
          <View style={s.board}>
            {available.map((clue, index) => (
              <View key={clue.id}>
                <Pressable
                  onPress={() => unlock(clue)}
                  style={[
                    s.node,
                    clue.locked && s.nodeLocked,
                    unlocked.includes(clue.id) && s.nodeOpen,
                  ]}
                >
                  <View style={s.row}>
                    <Text style={[s.code, clue.locked && s.dim]}>{clue.code}</Text>
                    <Text style={[s.state, unlocked.includes(clue.id) && s.stateOpen]}>
                      {clue.locked
                        ? 'BLOQUEADO'
                        : unlocked.includes(clue.id)
                          ? 'ANALISADO'
                          : 'DISPONÍVEL'}
                    </Text>
                  </View>
                  <Text style={[s.nodeTitle, clue.locked && s.dim]}>
                    {clue.locked ? '████████████' : clue.title}
                  </Text>
                  <Text style={s.source}>
                    {clue.locked ? 'REQUER EVIDÊNCIA ANTERIOR' : clue.source}
                  </Text>
                  {!clue.locked && (
                    <Text style={s.action}>
                      {unlocked.includes(clue.id) ? 'REABRIR ANÁLISE' : 'ANALISAR EVIDÊNCIA'} ↗
                    </Text>
                  )}
                </Pressable>
                {index < clues.length - 1 && (
                  <View style={[s.connector, unlocked.includes(clue.id) && s.connectorLive]} />
                )}
              </View>
            ))}
          </View>
          {selected && (
            <View style={s.analysis}>
              <Text style={s.analysisCode}>{selected.code} // CORRELAÇÃO ENCONTRADA</Text>
              <Text style={s.analysisTitle}>{selected.title}</Text>
              <Text style={s.analysisText}>{selected.summary}</Text>
              <View style={s.finding}>
                <Text style={s.findingLabel}>CONCLUSÃO DA ANÁLISE</Text>
                <Text style={s.findingText}>{selected.link}</Text>
              </View>
            </View>
          )}
          {complete && (
            <View style={s.reveal}>
              <Text style={s.alert}>⚠ IDENTIDADE PROVISÓRIA</Text>
              <Text style={s.suspect}>V. E.</Text>
              <Text style={s.suspectRole}>CODINOME // VESPER</Text>
              <Text style={s.revealText}>
                Financiador, intermediário ou arquiteto da rede. Nenhum registro biométrico
                confirmado. Investigação permanece aberta.
              </Text>
              <View style={s.redacted}>
                <Text>████████████████████</Text>
                <Text>ARQUIVO DE IDENTIDADE // ACESSO NEGADO</Text>
              </View>
            </View>
          )}
          <View style={s.hint}>
            <Text style={s.hintTitle}>DICA DE NAOMI</Text>
            <Text style={s.hintText}>
              Comece pelo símbolo. Uma organização pode trocar nomes, mas dificilmente abandona a
              forma como classifica seus próprios segredos.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#030504' },
  safe: { flex: 1 },
  header: {
    height: 76,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1d241c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  brandName: { color: '#e7e7df', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  micro: {
    color: '#5d655d',
    fontFamily: 'monospace',
    fontSize: 6,
    letterSpacing: 0.7,
    marginTop: 3,
  },
  back: { color: '#d6a343', fontFamily: 'monospace', fontSize: 7 },
  content: { padding: 20, paddingTop: 38, paddingBottom: 60 },
  eyebrow: { color: '#d6a343', fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.4 },
  heading: { color: '#ecece4', fontSize: 42, lineHeight: 43, fontWeight: '300', marginTop: 12 },
  intro: { color: '#7c857b', fontSize: 12, lineHeight: 19, marginTop: 16, marginBottom: 26 },
  progressCard: {
    borderWidth: 1,
    borderColor: '#3d3522',
    backgroundColor: '#0d0b07',
    padding: 16,
    marginBottom: 25,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: '#747a70', fontFamily: 'monospace', fontSize: 7 },
  progressValue: { color: '#d6a343', fontFamily: 'monospace', fontSize: 10, fontWeight: '700' },
  progressTrack: { height: 3, backgroundColor: '#25271f', marginVertical: 13 },
  progressFill: { height: 3, backgroundColor: '#d6a343' },
  progressNote: { color: '#686c63', fontFamily: 'monospace', fontSize: 7 },
  board: { borderWidth: 1, borderColor: '#20271f', padding: 15, backgroundColor: '#060907' },
  node: {
    minHeight: 125,
    borderWidth: 1,
    borderColor: '#4d4328',
    borderLeftWidth: 3,
    borderLeftColor: '#d6a343',
    backgroundColor: '#0d0c08',
    padding: 14,
  },
  nodeLocked: { borderColor: '#222822', borderLeftColor: '#343a33', opacity: 0.62 },
  nodeOpen: { backgroundColor: '#151208' },
  code: { color: '#d6a343', fontFamily: 'monospace', fontSize: 8 },
  dim: { color: '#505750' },
  state: { color: '#8c7745', fontFamily: 'monospace', fontSize: 6 },
  stateOpen: { color: '#bbd64a' },
  nodeTitle: { color: '#e7e5dc', fontSize: 20, fontWeight: '500', marginTop: 18 },
  source: { color: '#616960', fontFamily: 'monospace', fontSize: 6, marginTop: 6 },
  action: { color: '#d6a343', fontFamily: 'monospace', fontSize: 7, marginTop: 14 },
  connector: { width: 1, height: 20, backgroundColor: '#303630', marginLeft: '50%' },
  connectorLive: { backgroundColor: '#d6a343' },
  analysis: {
    borderWidth: 1,
    borderColor: '#4d4328',
    backgroundColor: '#0e0c08',
    padding: 18,
    marginTop: 20,
  },
  analysisCode: { color: '#d6a343', fontFamily: 'monospace', fontSize: 7 },
  analysisTitle: { color: '#ece9df', fontSize: 27, fontWeight: '300', marginTop: 10 },
  analysisText: { color: '#9da49b', fontSize: 12, lineHeight: 20, marginTop: 13 },
  finding: { borderLeftWidth: 2, borderLeftColor: '#d6a343', paddingLeft: 12, marginTop: 18 },
  findingLabel: { color: '#d6a343', fontFamily: 'monospace', fontSize: 7 },
  findingText: { color: '#b5b9b0', fontSize: 11, lineHeight: 18, marginTop: 8 },
  reveal: {
    borderWidth: 1,
    borderColor: '#862b27',
    backgroundColor: '#120706',
    padding: 20,
    marginTop: 20,
  },
  alert: { color: '#df4b43', fontFamily: 'monospace', fontSize: 8 },
  suspect: { color: '#eee9de', fontSize: 62, fontWeight: '200', marginTop: 13 },
  suspectRole: { color: '#d6a343', fontFamily: 'monospace', fontSize: 8 },
  revealText: { color: '#a29891', fontSize: 12, lineHeight: 19, marginTop: 16 },
  redacted: { borderTopWidth: 1, borderTopColor: '#50201d', paddingTop: 14, marginTop: 18 },
  hint: { borderWidth: 1, borderColor: '#283227', padding: 16, marginTop: 20 },
  hintTitle: { color: '#bbd64a', fontFamily: 'monospace', fontSize: 7 },
  hintText: { color: '#798178', fontSize: 11, lineHeight: 18, marginTop: 8 },
});
