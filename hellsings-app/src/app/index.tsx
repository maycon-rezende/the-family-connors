import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BOOT_MESSAGES = ['CANAL CRIPTOGRAFADO', 'IDENTIDADE VERIFICADA', 'ACESSO ÔMEGA DISPONÍVEL'];

export default function AccessScreen() {
  const [message, setMessage] = useState(0);
  const reveal = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.35)).current;
  useEffect(() => {
    Animated.timing(reveal, { toValue: 1, duration: 1400, useNativeDriver: true }).start();
    const loop = Animated.loop(Animated.sequence([Animated.timing(pulse,{toValue:1,duration:900,useNativeDriver:true}),Animated.timing(pulse,{toValue:.35,duration:900,useNativeDriver:true})]));
    loop.start(); const timer=setInterval(()=>setMessage(current=>(current+1)%BOOT_MESSAGES.length),1800);
    return ()=>{clearInterval(timer);loop.stop()};
  },[pulse,reveal]);
  return <ImageBackground source={require('../../assets/hellsings/bunker-entry.png')} style={s.background} imageStyle={s.image}>
    <View style={s.shade}/><View style={s.grid} pointerEvents="none"/><SafeAreaView style={s.safe}>
      <View style={s.topline}><Text style={s.micro}>HLS // MOBILE TERMINAL</Text><Text style={s.live}>● ONLINE</Text></View>
      <Animated.View style={[s.content,{opacity:reveal,transform:[{translateY:reveal.interpolate({inputRange:[0,1],outputRange:[28,0]})}]}]}>
        <Animated.View style={[s.seal,{opacity:pulse}]}><View style={s.sealInner}><Image source={require('../../assets/hellsings/hellsings-emblem.png')} style={{width:76,height:76,resizeMode:'contain'}}/></View></Animated.View>
        <Text style={s.overline}>UMA ORGANIZAÇÃO SEM BANDEIRA</Text><Text style={s.title}>HELLSINGS</Text><View style={s.rule}/><Text style={s.tagline}>Quando o sistema não pode agir,{`\n`}nós entramos.</Text>
      </Animated.View>
      <View style={s.accessBox}><Text style={s.status}>{BOOT_MESSAGES[message]}</Text>
        <Pressable onPress={()=>router.replace('/command')} style={({pressed})=>[s.button,pressed&&s.buttonPressed]}><View style={s.scan}/><Text style={s.buttonText}>AUTORIZAR ACESSO</Text><Text style={s.arrow}>↗</Text></Pressable>
        <Text style={s.disclaimer}>EXPERIÊNCIA NARRATIVA · NENHUM DADO É TRANSMITIDO</Text>
      </View>
    </SafeAreaView>
  </ImageBackground>;
}
const s=StyleSheet.create({background:{flex:1,backgroundColor:'#030504'},image:{opacity:.5},shade:{...StyleSheet.absoluteFillObject,backgroundColor:'rgba(2,5,4,.42)'},grid:{...StyleSheet.absoluteFillObject,borderWidth:1,borderColor:'rgba(187,214,74,.09)'},safe:{flex:1,paddingHorizontal:22,paddingVertical:12,justifyContent:'space-between'},topline:{flexDirection:'row',justifyContent:'space-between'},micro:{color:'#869077',fontSize:9,letterSpacing:1.7,fontFamily:'monospace'},live:{color:'#bbd64a',fontSize:9,letterSpacing:1.5,fontFamily:'monospace'},content:{alignItems:'center'},seal:{width:116,height:116,borderRadius:58,borderWidth:1,borderColor:'#bbd64a',alignItems:'center',justifyContent:'center',marginBottom:28},sealInner:{width:86,height:86,borderRadius:43,borderWidth:1,borderColor:'rgba(187,214,74,.45)',alignItems:'center',justifyContent:'center'},h:{color:'#d49a39',fontSize:57,fontWeight:'800'},overline:{color:'#a9af9f',fontSize:9,letterSpacing:3,textAlign:'center'},title:{color:'#d84940',fontSize:52,lineHeight:64,fontWeight:'800',letterSpacing:4},rule:{width:96,height:1,backgroundColor:'#bbd64a',marginVertical:13},tagline:{color:'#e6e5dc',fontSize:15,lineHeight:23,textAlign:'center',letterSpacing:1},accessBox:{gap:13},status:{color:'#bbd64a',fontSize:9,letterSpacing:1.8,fontFamily:'monospace',textAlign:'center'},button:{height:58,borderWidth:1,borderColor:'#bbd64a',backgroundColor:'rgba(7,12,8,.9)',paddingHorizontal:18,flexDirection:'row',alignItems:'center',justifyContent:'space-between',overflow:'hidden'},buttonPressed:{backgroundColor:'rgba(187,214,74,.18)',transform:[{scale:.985}]},scan:{position:'absolute',left:0,top:0,bottom:0,width:3,backgroundColor:'#bbd64a'},buttonText:{color:'#e8eadf',fontSize:11,fontWeight:'700',letterSpacing:2},arrow:{color:'#bbd64a',fontSize:20},disclaimer:{color:'#62685e',fontSize:7,letterSpacing:1,textAlign:'center',fontFamily:'monospace'}});
