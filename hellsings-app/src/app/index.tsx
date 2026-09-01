import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgentDivision, useAgentProfile } from '@/context/agent-profile';

const MESSAGES = ['FREQUÊNCIA LOCAL RECUPERADA', 'IDENTIDADE VERIFICADA', 'REDE EDE DISPONÍVEL'];
const DIVISIONS: AgentDivision[] = ['CAMPO', 'INTELIGÊNCIA', 'SUPORTE'];

export default function AccessScreen() {
  const { profile, loading, createProfile } = useAgentProfile();
  const [message, setMessage] = useState(0);
  const [callsign, setCallsign] = useState('');
  const [division, setDivision] = useState<AgentDivision>('CAMPO');
  const [error, setError] = useState('');
  const reveal = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.35)).current;
  useEffect(() => {
    Animated.timing(reveal, { toValue: 1, duration: 1200, useNativeDriver: true }).start();
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.35, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    const timer = setInterval(() => setMessage((current) => (current + 1) % MESSAGES.length), 1800);
    return () => {
      clearInterval(timer);
      loop.stop();
    };
  }, [pulse, reveal]);
  const enroll = async () => {
    const clean = callsign.trim();
    if (clean.length < 3) {
      setError('O CODINOME PRECISA TER AO MENOS 3 CARACTERES');
      return;
    }
    setError('GERANDO MATRÍCULA LOCAL...');
    await createProfile(clean, division);
    setError('IDENTIDADE REGISTRADA');
  };
  return (
    <ImageBackground
      source={require('../../assets/world/destruicao.jpg')}
      style={s.background}
      imageStyle={s.image}
    >
      <View style={s.shade} />
      <View style={s.grid} pointerEvents="none" />
      <SafeAreaView style={s.safe}>
        <View style={s.topline}>
          <Text style={s.micro}>EDE // TERMINAL DE SOBREVIVÊNCIA</Text>
          <Text style={s.live}>● ONLINE</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={s.center}
        >
          <Animated.View
            style={[
              s.content,
              {
                opacity: reveal,
                transform: [
                  { translateY: reveal.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) },
                ],
              },
            ]}
          >
            <Animated.View style={[s.seal, { opacity: pulse }]}>
              <View style={s.sealInner}>
                <Image
                  source={require('../../assets/hellsings/hellsings-emblem.png')}
                  style={s.logo}
                />
              </View>
            </Animated.View>
            <Text style={s.overline}>ARQUIVO DO PRESENTE // DEPOIS DO DIA D</Text>
            <Text style={s.title}>ERA DA EXTINÇÃO</Text>
            <View style={s.rule} />
            {loading ? (
              <Text style={s.tagline}>RECUPERANDO IDENTIDADE...</Text>
            ) : profile ? (
              <View style={s.identity}>
                <Text style={s.identityLabel}>AGENTE RECONHECIDO</Text>
                <Text style={s.callsign}>{profile.callsign}</Text>
                <Text style={s.registry}>
                  {profile.registry} · DIVISÃO {profile.division}
                </Text>
              </View>
            ) : (
              <View style={s.enroll}>
                <Text style={s.enrollTitle}>CRIAR IDENTIDADE DE AGENTE</Text>
                <TextInput
                  value={callsign}
                  onChangeText={(value) => {
                    setCallsign(value);
                    setError('');
                  }}
                  maxLength={18}
                  autoCapitalize="characters"
                  placeholder="CODINOME"
                  placeholderTextColor="#586057"
                  style={s.input}
                />
                <Text style={s.fieldLabel}>SELECIONE SUA ESPECIALIDADE</Text>
                <View style={s.divisions}>
                  {DIVISIONS.map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => setDivision(item)}
                      style={[s.division, division === item && s.divisionActive]}
                    >
                      <Text style={[s.divisionText, division === item && s.divisionTextActive]}>
                        {item}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                {!!error && <Text style={s.formStatus}>{error}</Text>}
              </View>
            )}
          </Animated.View>
        </KeyboardAvoidingView>
        <View style={s.accessBox}>
          <Text style={s.status}>{MESSAGES[message]}</Text>
          {!loading &&
            (profile ? (
              <Pressable
                onPress={() => router.replace('/command')}
                style={({ pressed }) => [s.button, pressed && s.buttonPressed]}
              >
                <View style={s.scan} />
                <Text style={s.buttonText}>AUTORIZAR ACESSO</Text>
                <Text style={s.arrow}>↗</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={enroll}
                style={({ pressed }) => [s.button, pressed && s.buttonPressed]}
              >
                <View style={s.scan} />
                <Text style={s.buttonText}>REGISTRAR IDENTIDADE</Text>
                <Text style={s.arrow}>+</Text>
              </Pressable>
            ))}
          <Text style={s.disclaimer}>PERFIL ARMAZENADO LOCALMENTE · NENHUM DADO É TRANSMITIDO</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
const s = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#030504' },
  image: { opacity: 0.45 },
  shade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(2,5,4,.5)' },
  grid: { ...StyleSheet.absoluteFillObject, borderWidth: 1, borderColor: 'rgba(187,214,74,.09)' },
  safe: { flex: 1, paddingHorizontal: 22, paddingVertical: 12, justifyContent: 'space-between' },
  topline: { flexDirection: 'row', justifyContent: 'space-between' },
  micro: { color: '#869077', fontSize: 9, letterSpacing: 1.7, fontFamily: 'monospace' },
  live: { color: '#bbd64a', fontSize: 9, letterSpacing: 1.5, fontFamily: 'monospace' },
  center: { flex: 1, justifyContent: 'center' },
  content: { alignItems: 'center' },
  seal: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 1,
    borderColor: '#bbd64a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  sealInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'rgba(187,214,74,.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 62, height: 62, resizeMode: 'contain' },
  overline: { color: '#a9af9f', fontSize: 8, letterSpacing: 2.6, textAlign: 'center' },
  title: { color: '#d96736', fontSize: 32, lineHeight: 40, fontWeight: '800', letterSpacing: 2 },
  rule: { width: 90, height: 1, backgroundColor: '#bbd64a', marginVertical: 10 },
  tagline: { color: '#aab0a5', fontSize: 11, letterSpacing: 1.2 },
  identity: { alignItems: 'center', minHeight: 120, justifyContent: 'center' },
  identityLabel: { color: '#bbd64a', fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.8 },
  callsign: { color: '#f0efe8', fontSize: 35, fontWeight: '300', letterSpacing: 2, marginTop: 8 },
  registry: {
    color: '#7f887c',
    fontFamily: 'monospace',
    fontSize: 8,
    letterSpacing: 1.2,
    marginTop: 7,
  },
  enroll: { width: '100%', maxWidth: 420 },
  enrollTitle: {
    color: '#d8dbd2',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.7,
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#354033',
    backgroundColor: 'rgba(4,8,5,.88)',
    color: '#edf0e7',
    fontFamily: 'monospace',
    fontSize: 13,
    letterSpacing: 1.6,
    paddingHorizontal: 14,
  },
  fieldLabel: {
    color: '#798176',
    fontFamily: 'monospace',
    fontSize: 7,
    letterSpacing: 1.2,
    marginTop: 13,
    marginBottom: 7,
  },
  divisions: { flexDirection: 'row', gap: 5 },
  division: {
    flex: 1,
    minHeight: 38,
    borderWidth: 1,
    borderColor: '#2b332b',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#080c09',
  },
  divisionActive: { borderColor: '#bbd64a', backgroundColor: 'rgba(187,214,74,.11)' },
  divisionText: { color: '#626a61', fontFamily: 'monospace', fontSize: 7, letterSpacing: 0.5 },
  divisionTextActive: { color: '#bbd64a' },
  formStatus: {
    color: '#d49a39',
    fontFamily: 'monospace',
    fontSize: 7,
    letterSpacing: 0.9,
    textAlign: 'center',
    marginTop: 9,
  },
  accessBox: { gap: 11 },
  status: {
    color: '#bbd64a',
    fontSize: 8,
    letterSpacing: 1.7,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  button: {
    height: 56,
    borderWidth: 1,
    borderColor: '#bbd64a',
    backgroundColor: 'rgba(7,12,8,.94)',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  buttonPressed: { backgroundColor: 'rgba(187,214,74,.18)', transform: [{ scale: 0.985 }] },
  scan: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, backgroundColor: '#bbd64a' },
  buttonText: { color: '#e8eadf', fontSize: 10, fontWeight: '700', letterSpacing: 1.8 },
  arrow: { color: '#bbd64a', fontSize: 20 },
  disclaimer: {
    color: '#62685e',
    fontSize: 7,
    letterSpacing: 0.8,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});
