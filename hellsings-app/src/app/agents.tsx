import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '@/components/bottom-nav';

type Agent = {
  code: string;
  name: string;
  role: string;
  status: string;
  color: string;
  image: ImageSourcePropType;
  skills: string[];
  bio: string;
};
const agents: Agent[] = [
  {
    code: 'HLS-01',
    name: 'Jack Connor',
    role: 'CRIADOR · COMANDANTE',
    status: 'CAMPO',
    color: '#bbd64a',
    image: require('../../assets/hellsings/jack.png'),
    skills: ['COMANDO', 'ESTRATÉGIA', 'RASTREAMENTO'],
    bio: 'Fundador e autoridade máxima dos Hellsings. Define a estratégia, aprova as operações e lidera missões de maior risco.',
  },
  {
    code: 'HLS-02',
    name: 'Mark Connor',
    role: 'COMANDO TÁTICO',
    status: 'CAMPO',
    color: '#4e9cc7',
    image: require('../../assets/hellsings/mark.png'),
    skills: ['TÁTICA', 'MARINHA', 'EXTRAÇÃO'],
    bio: 'Veterano da Marinha e braço tático da organização. Transforma objetivos em planos de entrada, intervenção e retirada.',
  },
  {
    code: 'HLS-03',
    name: 'Alice Myers',
    role: 'ADMINISTRAÇÃO · CONTRATOS',
    status: 'ADMIN',
    color: '#e3a63c',
    image: require('../../assets/hellsings/alice.png'),
    skills: ['CONTRATOS', 'MEDICINA', 'RECURSOS'],
    bio: 'Responsável pelos negócios, contratos, clientes e coordenação administrativa. Alice não participa mais das missões de campo.',
  },
  {
    code: 'HLS-04',
    name: 'John',
    role: 'TECNOLOGIA · ARMAMENTOS',
    status: 'CAMPO',
    color: '#5c82d8',
    image: require('../../assets/hellsings/john.png'),
    skills: ['TECNOLOGIA', 'COMUNICAÇÕES', 'SUPORTE'],
    bio: 'Protege a infraestrutura tecnológica, as comunicações e os equipamentos operacionais da unidade.',
  },
  {
    code: 'HLS-05',
    name: 'Naomi',
    role: 'INTELIGÊNCIA · ANÁLISE',
    status: 'CAMPO',
    color: '#d95d6f',
    image: require('../../assets/hellsings/naomi.png'),
    skills: ['INTELIGÊNCIA', 'ANÁLISE', 'IDIOMAS'],
    bio: 'Agente japonesa dedicada ao cruzamento de informações e à leitura de padrões antes das operações.',
  },
  {
    code: 'HLS-06',
    name: 'Clhoe',
    role: 'RECONHECIMENTO',
    status: 'CAMPO',
    color: '#bd6ed2',
    image: require('../../assets/hellsings/clhoe.png'),
    skills: ['VIGILÂNCIA', 'CAMPO', 'PRECISÃO'],
    bio: 'Especialista em reconhecimento avançado. Identifica ameaças e acessos antes da entrada da equipe.',
  },
  {
    code: 'HLS-07',
    name: 'Luke',
    role: 'ROTAS · ESTRATÉGIA',
    status: 'CAMPO',
    color: '#53b68a',
    image: require('../../assets/hellsings/luke.png'),
    skills: ['MAPAS', 'ROTAS', 'ESTRATÉGIA'],
    bio: 'Encontra caminhos de entrada e saída onde outros enxergam apenas bloqueios.',
  },
  {
    code: 'HLS-08',
    name: 'Dimitri',
    role: 'INTERVENÇÃO · EXTRAÇÃO',
    status: 'CAMPO',
    color: '#c94a3e',
    image: require('../../assets/hellsings/dimitri.png'),
    skills: ['INTERVENÇÃO', 'EXTRAÇÃO', 'PROTEÇÃO'],
    bio: 'Responsável pela resposta de alto impacto e retirada em situações que exigem força e controle.',
  },
  {
    code: 'HLS-09',
    name: 'Brian Taylor',
    role: 'VETERANO · RASTREADOR',
    status: 'CAMPO',
    color: '#b5a071',
    image: require('../../assets/hellsings/brian.png'),
    skills: ['RASTREAMENTO', 'FBI', 'EXPERIÊNCIA'],
    bio: 'Amigo de Jack desde o FBI e o agente mais experiente da formação. Encontra conexões que outros ignoram.',
  },
  {
    code: 'HLS-10',
    name: 'Hellen',
    role: 'INFILTRAÇÃO · DISFARCE',
    status: 'CAMPO',
    color: '#d18450',
    image: require('../../assets/hellsings/hellen.png'),
    skills: ['INFILTRAÇÃO', 'DISFARCE', 'INTELIGÊNCIA'],
    bio: 'Especialista em identidades de cobertura e inteligência humana. Entra sem chamar atenção e sai sem deixar vínculo.',
  },
];
export default function AgentsScreen() {
  const [selected, setSelected] = useState<Agent | null>(null);
  return (
    <View style={s.screen}>
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.header}>
          <View>
            <Text style={s.brand}>H</Text>
            <Text style={s.brandName}>HELLSINGS</Text>
          </View>
          <Pressable onPress={() => router.replace('/')}>
            <Text style={s.exit}>ENCERRAR SESSÃO ↗</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          <Text style={s.eyebrow}>FORMAÇÃO OFICIAL // 10 IDENTIDADES</Text>
          <Text style={s.heading}>ARQUIVOS{`\n`}DE AGENTES.</Text>
          <View style={s.rule} />
          <Text style={s.intro}>
            Selecione uma identidade para solicitar leitura biométrica e acesso ao dossiê.
          </Text>
          <View style={s.grid}>
            {agents.map((agent) => (
              <Pressable
                key={agent.code}
                onPress={() => setSelected(agent)}
                style={[s.card, { borderColor: `${agent.color}44` }]}
              >
                <Image source={agent.image} style={s.photo} />
                <View style={s.photoShade} />
                <View style={[s.scan, { backgroundColor: agent.color }]} />
                <Text style={[s.code, { color: agent.color }]}>
                  {agent.code} // {agent.status}
                </Text>
                <View style={s.cardInfo}>
                  <Text style={s.role}>{agent.role}</Text>
                  <Text style={s.name}>{agent.name}</Text>
                  <Text style={[s.read, { color: agent.color }]}>LER BIOMETRIA ↗</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <BottomNav active="AGENTES" />
      </SafeAreaView>
      <Modal
        visible={!!selected}
        animationType="fade"
        transparent
        statusBarTranslucent
        onRequestClose={() => setSelected(null)}
      >
        {selected && (
          <View style={s.modal}>
            <Image source={selected.image} style={s.modalPhoto} />
            <View style={s.modalShade} />
            <SafeAreaView style={s.modalSafe}>
              <Pressable onPress={() => setSelected(null)} style={s.close}>
                <Text style={s.closeText}>×</Text>
              </Pressable>
              <View style={s.dossier}>
                <Text style={[s.dossierCode, { color: selected.color }]}>
                  {selected.code} // ACESSO AUTORIZADO
                </Text>
                <Text style={s.dossierName}>{selected.name}</Text>
                <Text style={[s.dossierRole, { color: selected.color }]}>{selected.role}</Text>
                <Text style={s.bio}>{selected.bio}</Text>
                <View style={s.skills}>
                  {selected.skills.map((skill) => (
                    <Text
                      key={skill}
                      style={[
                        s.skill,
                        { borderColor: `${selected.color}77`, color: selected.color },
                      ]}
                    >
                      {skill}
                    </Text>
                  ))}
                </View>
                <Text style={s.classification}>INFORMAÇÕES PARCIAIS · NÍVEL ÔMEGA</Text>
              </View>
            </SafeAreaView>
          </View>
        )}
      </Modal>
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
  brand: { position: 'absolute', color: '#d49a39', fontSize: 39, fontWeight: '900', top: -20 },
  brandName: {
    color: '#e5e6de',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    marginLeft: 34,
  },
  exit: { color: '#777f74', fontSize: 7, fontFamily: 'monospace', letterSpacing: 1 },
  content: { padding: 20, paddingTop: 42, paddingBottom: 115 },
  eyebrow: { color: '#bbd64a', fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.7 },
  heading: {
    color: '#ecece4',
    fontSize: 43,
    lineHeight: 44,
    fontWeight: '300',
    letterSpacing: 1,
    marginTop: 12,
  },
  rule: { width: 75, height: 1, backgroundColor: '#bbd64a', marginVertical: 18 },
  intro: { color: '#7c857b', fontSize: 12, lineHeight: 19, maxWidth: 310, marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  card: {
    width: '48.5%',
    height: 260,
    borderWidth: 1,
    backgroundColor: '#080b09',
    overflow: 'hidden',
  },
  photo: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', resizeMode: 'cover' },
  photoShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(2,4,3,.18)' },
  scan: { position: 'absolute', top: 0, left: 0, right: 0, height: 2 },
  code: {
    position: 'absolute',
    top: 11,
    left: 10,
    fontFamily: 'monospace',
    fontSize: 6,
    letterSpacing: 0.7,
    backgroundColor: 'rgba(3,5,4,.82)',
    padding: 4,
  },
  cardInfo: { position: 'absolute', left: 11, right: 10, bottom: 11 },
  role: { color: '#aeb3a9', fontFamily: 'monospace', fontSize: 6, letterSpacing: 0.6 },
  name: { color: '#f0efe7', fontSize: 20, fontWeight: '600', marginTop: 4 },
  read: { fontFamily: 'monospace', fontSize: 6, letterSpacing: 0.7, marginTop: 10 },
  modal: { flex: 1, backgroundColor: '#020302' },
  modalPhoto: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '72%',
    resizeMode: 'cover',
  },
  modalShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(1,3,2,.18)' },
  modalSafe: { flex: 1, justifyContent: 'flex-end' },
  close: {
    position: 'absolute',
    right: 18,
    top: 14,
    width: 42,
    height: 42,
    borderWidth: 1,
    borderColor: '#78816f',
    backgroundColor: 'rgba(3,5,4,.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { color: '#fff', fontSize: 26, fontWeight: '200' },
  dossier: {
    backgroundColor: 'rgba(4,7,5,.97)',
    borderTopWidth: 1,
    borderTopColor: '#bbd64a',
    padding: 22,
    paddingBottom: 35,
  },
  dossierCode: { fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.4 },
  dossierName: { color: '#f0efe7', fontSize: 38, fontWeight: '300', marginTop: 10 },
  dossierRole: { fontFamily: 'monospace', fontSize: 9, letterSpacing: 1.1, marginTop: 4 },
  bio: { color: '#a0a79d', fontSize: 12, lineHeight: 19, marginTop: 17 },
  skills: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 17 },
  skill: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontFamily: 'monospace',
    fontSize: 7,
    letterSpacing: 0.7,
  },
  classification: {
    color: '#4e554d',
    fontFamily: 'monospace',
    fontSize: 7,
    letterSpacing: 1,
    marginTop: 20,
  },
});
