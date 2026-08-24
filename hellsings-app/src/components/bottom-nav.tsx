import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Tab = 'COMANDO' | 'MISSÕES' | 'AGENTES' | 'BUNKER';
const routes: Record<Tab, string> = { COMANDO: '/command', MISSÕES: '/missions', AGENTES: '/agents', BUNKER: '/bunker' };

export function BottomNav({ active }: { active: Tab }) {
  return <View style={styles.tabs}>{(Object.keys(routes) as Tab[]).map(item=><Pressable key={item} onPress={()=>router.replace(routes[item])} style={styles.tab}><View style={[styles.dot,active===item&&styles.dotActive]}/><Text style={[styles.text,active===item&&styles.textActive]}>{item}</Text></Pressable>)}</View>;
}
const styles=StyleSheet.create({tabs:{position:'absolute',bottom:0,left:0,right:0,height:78,backgroundColor:'rgba(5,8,6,.98)',borderTopWidth:1,borderTopColor:'#20271f',flexDirection:'row',paddingBottom:10},tab:{flex:1,alignItems:'center',justifyContent:'center',gap:5},dot:{width:4,height:4,backgroundColor:'#424942',transform:[{rotate:'45deg'}]},dotActive:{backgroundColor:'#bbd64a'},text:{color:'#555d55',fontFamily:'monospace',fontSize:6,letterSpacing:.5},textActive:{color:'#bbd64a'},soon:{color:'#3c433d',fontFamily:'monospace',fontSize:5,letterSpacing:.3}});
