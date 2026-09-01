import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandMark } from '@/components/brand-mark';
import { BottomNav } from '@/components/bottom-nav';

type FileEntry = {
  id: string;
  mission: string;
  title: string;
  kind: string;
  clearance: string;
  content: string;
  clue?: string;
};
const files: FileEntry[] = [
  {
    id: 'DOC-142-A',
    mission: 'OPERAÇÃO FAROL',
    title: 'RELATÓRIO DE EXTRAÇÃO',
    kind: 'RELATÓRIO TÁTICO',
    clearance: 'SIGMA',
    content:
      'A equipe encontrou uma rota marítima ausente dos registros oficiais. Luke identificou uma janela de retirada de onze minutos. Todos os civis foram conduzidos ao ponto seguro antes que a instalação percebesse a perda de controle.',
    clue: 'PISTA: o mesmo símbolo apareceu em um documento da Rota de Marfim.',
  },
  {
    id: 'DOC-109-C',
    mission: 'CASA SEM JANELAS',
    title: 'DEPOIMENTO PROTEGIDO 04',
    kind: 'RELATO DE SOBREVIVENTE',
    clearance: 'ÔMEGA',
    content:
      'O relato confirma que as vítimas eram movidas sempre que um veículo sem identificação surgia ao amanhecer. Uma voz mencionava “o círculo”, mas nenhum integrante conhecia a estrutura completa da rede.',
    clue: 'PISTA: “o círculo” pode se referir ao Círculo de Ébano.',
  },
  {
    id: 'DOC-097-F',
    mission: 'ROTA DE MARFIM',
    title: 'ANÁLISE FINANCEIRA',
    kind: 'INTELIGÊNCIA',
    clearance: 'ÔMEGA',
    content:
      'Alice e Naomi cruzaram empresas de fachada, pagamentos fragmentados e contratos falsos de transporte. Quatro rotas aparentemente independentes respondiam ao mesmo intermediário.',
    clue: 'PISTA: o intermediário usava as iniciais V.E. em canais protegidos.',
  },
  {
    id: 'DOC-083-B',
    mission: 'CÍRCULO DE ÉBANO',
    title: 'NOTA DE INFILTRAÇÃO',
    kind: 'CAMPO',
    clearance: 'ÔMEGA',
    content:
      'Hellen permaneceu sob identidade de cobertura até confirmar a localização dos sobreviventes. Brian relacionou os clientes a desaparecimentos investigados anos antes. A entrada foi autorizada somente quando todas as saídas estavam controladas.',
    clue: 'PISTA: um cliente escapou antes da contenção e permanece sem identidade confirmada.',
  },
  {
    id: 'DOC-071-D',
    mission: 'ÚLTIMO LEILÃO',
    title: 'LISTA DE COMPRADORES',
    kind: 'DOCUMENTO RECUPERADO',
    clearance: 'NEGADO',
    content:
      'A maior parte do documento continua protegida. Três nomes estão ligados a empresas presentes nos arquivos Vesper. Jack determinou que nenhum nome fosse revelado antes da confirmação independente.',
    clue: 'PISTA: ARQUIVO VESPER // CONEXÃO PROVÁVEL.',
  },
];
const diary = [
  {
    date: 'ENTRADA 01',
    author: 'JACK CONNOR',
    title: 'ACEITAR UMA MISSÃO',
    text: 'O dinheiro abre a conversa, nunca decide a resposta. Antes de aceitar qualquer contrato, descubra quem lucra com o silêncio e quem pagará o preço se estivermos errados.',
    tip: 'DICA OPERACIONAL: desconfie de informações perfeitas demais.',
  },
  {
    date: 'ENTRADA 02',
    author: 'ALICE MYERS',
    title: 'DEPOIS DO RESGATE',
    text: 'Retirar alguém de um lugar é apenas o começo. Proteção, atendimento e anonimato fazem parte da missão. Uma operação não termina quando a equipe volta ao bunker.',
    tip: 'DICA OPERACIONAL: o relatório humano importa tanto quanto o tático.',
  },
  {
    date: 'ENTRADA 03',
    author: 'MARK CONNOR',
    title: 'ROTAS DE SAÍDA',
    text: 'Todo plano precisa de uma segunda saída e toda segunda saída precisa de uma terceira. A equipe entra junta, mas o terreno pode obrigar cada agente a encontrar o próprio caminho.',
    tip: 'DICA OPERACIONAL: observe mapas, horários e mudanças nas câmeras.',
  },
  {
    date: 'ENTRADA 04',
    author: 'NAOMI',
    title: 'PADRÕES',
    text: 'Organizações mudam nomes, endereços e intermediários. O que raramente muda é o hábito. Uma palavra repetida, uma hora específica ou um símbolo podem ligar arquivos separados por anos.',
    tip: 'DICA DE INVESTIGAÇÃO: procure pistas repetidas nos documentos.',
  },
];

export default function ArchivesScreen() {
  const [tab, setTab] = useState<'FILES' | 'DIARY'>('FILES');
  const [open, setOpen] = useState<string | null>(null);
  return (
    <View style={s.screen}>
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.header}>
          <View style={s.brand}>
            <BrandMark size={35} />
            <View>
              <Text style={s.brandName}>COFRE HLS</Text>
              <Text style={s.micro}>SECURE DOCUMENT SYSTEM</Text>
            </View>
          </View>
          <Pressable onPress={() => router.back()}>
            <Text style={s.back}>← MISSÕES</Text>
          </Pressable>
        </View>
        <View style={s.tabs}>
          <Pressable
            onPress={() => setTab('FILES')}
            style={[s.tab, tab === 'FILES' && s.tabActive]}
          >
            <Text style={[s.tabText, tab === 'FILES' && s.activeText]}>ARQUIVOS SECRETOS</Text>
          </Pressable>
          <Pressable
            onPress={() => setTab('DIARY')}
            style={[s.tab, tab === 'DIARY' && s.tabActive]}
          >
            <Text style={[s.tabText, tab === 'DIARY' && s.activeText]}>DIÁRIO DE CAMPO</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          <Text style={s.eyebrow}>
            {tab === 'FILES' ? 'DOCUMENTOS RECUPERADOS // 05' : 'ANOTAÇÕES INTERNAS // 04'}
          </Text>
          <Text style={s.heading}>
            {tab === 'FILES' ? 'ARQUIVOS\nCLASSIFICADOS.' : 'DIÁRIO\nHELLSINGS.'}
          </Text>
          <Text style={s.intro}>
            {tab === 'FILES'
              ? 'Toque em um documento para executar a descriptografia local. Pistas podem conectar operações diferentes.'
              : 'Relatos pessoais, princípios e observações deixadas pelos integrantes da organização.'}
          </Text>
          {tab === 'FILES' && (
            <Pressable
              onPress={() => router.push('/investigation')}
              style={{
                minHeight: 78,
                borderWidth: 1,
                borderColor: '#765628',
                backgroundColor: '#100d07',
                padding: 15,
                marginBottom: 18,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text
                  style={{
                    color: '#d6a343',
                    fontFamily: 'monospace',
                    fontSize: 8,
                    letterSpacing: 1.1,
                  }}
                >
                  CASO PRINCIPAL // PROTOCOLO VESPER
                </Text>
                <Text style={[s.micro, { marginTop: 7 }]}>ABRIR QUADRO INVESTIGATIVO</Text>
              </View>
              <Text style={{ color: '#d6a343', fontSize: 22 }}>↗</Text>
            </Pressable>
          )}
          {tab === 'FILES'
            ? files.map((file) => {
                const revealed = open === file.id;
                return (
                  <Pressable
                    key={file.id}
                    onPress={() => setOpen(revealed ? null : file.id)}
                    style={[s.file, revealed && s.fileOpen]}
                  >
                    <View style={s.row}>
                      <Text style={s.fileId}>{file.id}</Text>
                      <Text style={[s.clearance, file.clearance === 'NEGADO' && s.denied]}>
                        {file.clearance}
                      </Text>
                    </View>
                    <Text style={s.mission}>{file.mission}</Text>
                    <Text style={s.title}>{file.title}</Text>
                    <Text style={s.kind}>{file.kind}</Text>
                    {revealed ? (
                      <View style={s.reveal}>
                        <Text style={s.decrypt}>DESCRIPTOGRAFIA CONCLUÍDA</Text>
                        <Text style={s.body}>{file.content}</Text>
                        {file.clue && <Text style={s.clue}>{file.clue}</Text>}
                      </View>
                    ) : (
                      <View style={s.locked}>
                        <Text style={s.blocks}>████ ███████ ████</Text>
                        <Text style={s.unlock}>TOQUE PARA DESCLASSIFICAR</Text>
                      </View>
                    )}
                  </Pressable>
                );
              })
            : diary.map((entry, index) => (
                <View key={entry.date} style={s.diary}>
                  <View style={s.diaryIndex}>
                    <Text>{String(index + 1).padStart(2, '0')}</Text>
                  </View>
                  <Text style={s.fileId}>
                    {entry.date} // {entry.author}
                  </Text>
                  <Text style={s.diaryTitle}>{entry.title}</Text>
                  <Text style={s.body}>{entry.text}</Text>
                  <Text style={s.tip}>{entry.tip}</Text>
                </View>
              ))}
          <View style={s.notice}>
            <Text style={s.noticeTitle}>ARQUIVO LOCAL</Text>
            <Text style={s.noticeText}>
              Esta é uma experiência narrativa. Nenhum documento ou progresso é enviado para
              servidores.
            </Text>
          </View>
        </ScrollView>
        <BottomNav active="ARQUIVOS" />
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
  brandName: { color: '#e7e7df', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  micro: {
    color: '#5d655d',
    fontFamily: 'monospace',
    fontSize: 6,
    letterSpacing: 0.7,
    marginTop: 3,
  },
  back: { color: '#bbd64a', fontFamily: 'monospace', fontSize: 7, letterSpacing: 0.8 },
  tabs: { height: 58, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#20271f' },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: '#bbd64a', backgroundColor: '#080c09' },
  tabText: { color: '#596159', fontFamily: 'monospace', fontSize: 7, letterSpacing: 0.7 },
  activeText: { color: '#bbd64a' },
  content: { padding: 20, paddingTop: 38, paddingBottom: 120 },
  eyebrow: { color: '#bbd64a', fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.4 },
  heading: { color: '#ecece4', fontSize: 42, lineHeight: 43, fontWeight: '300', marginTop: 12 },
  intro: {
    color: '#7c857b',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 16,
    marginBottom: 28,
    maxWidth: 330,
  },
  file: {
    borderWidth: 1,
    borderColor: '#20271f',
    borderLeftWidth: 3,
    borderLeftColor: '#5c655b',
    backgroundColor: '#080b09',
    padding: 16,
    marginBottom: 9,
  },
  fileOpen: { borderLeftColor: '#bbd64a' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  fileId: { color: '#bbd64a', fontFamily: 'monospace', fontSize: 7, letterSpacing: 0.8 },
  clearance: { color: '#8b9d53', fontFamily: 'monospace', fontSize: 7 },
  denied: { color: '#d84940' },
  mission: { color: '#5e675f', fontFamily: 'monospace', fontSize: 6, marginTop: 22 },
  title: { color: '#e8e8e0', fontSize: 21, fontWeight: '500', marginTop: 5 },
  kind: { color: '#777f76', fontFamily: 'monospace', fontSize: 7, marginTop: 6 },
  locked: { borderTopWidth: 1, borderTopColor: '#20271f', marginTop: 17, paddingTop: 14 },
  blocks: { color: '#343b34', fontFamily: 'monospace', fontSize: 10 },
  unlock: { color: '#bbd64a', fontFamily: 'monospace', fontSize: 7, marginTop: 9 },
  reveal: { borderTopWidth: 1, borderTopColor: '#2c352b', marginTop: 17, paddingTop: 15 },
  decrypt: { color: '#bbd64a', fontFamily: 'monospace', fontSize: 7, letterSpacing: 0.8 },
  body: { color: '#a2a9a0', fontSize: 12, lineHeight: 20, marginTop: 12 },
  clue: {
    color: '#d6a343',
    fontFamily: 'monospace',
    fontSize: 8,
    lineHeight: 15,
    borderLeftWidth: 2,
    borderLeftColor: '#d6a343',
    paddingLeft: 10,
    marginTop: 16,
  },
  diary: {
    borderWidth: 1,
    borderColor: '#27251e',
    backgroundColor: '#0b0a07',
    padding: 18,
    marginBottom: 10,
    overflow: 'hidden',
  },
  diaryIndex: { position: 'absolute', right: 10, top: 5 },
  diaryTitle: { color: '#eeeae0', fontSize: 26, fontWeight: '300', marginTop: 22 },
  tip: {
    color: '#bbd64a',
    fontFamily: 'monospace',
    fontSize: 8,
    lineHeight: 15,
    borderTopWidth: 1,
    borderTopColor: '#333b2d',
    paddingTop: 13,
    marginTop: 17,
  },
  notice: { borderWidth: 1, borderColor: '#263026', padding: 16, marginTop: 25 },
  noticeTitle: { color: '#7e8e45', fontFamily: 'monospace', fontSize: 7 },
  noticeText: { color: '#626a62', fontSize: 10, lineHeight: 16, marginTop: 8 },
});
