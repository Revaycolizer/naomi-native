import { Linking, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useUser, userSession } from '@/zustand';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

export default function TabTwoScreen() {
  const [session,setSession]=userSession((state)=>[state.session,state.setSession])
  const [user,setUser]=useUser((state)=>[state.user,state.setUser])
const navigation =useNavigation()
  const logout=()=>{
    setSession(null)
    setUser(null)
    navigation.reset({
      index:0,
      routes:[{name:"login"}] as any
    })
  }
  return (
    <SafeAreaView>
      <StatusBar style="light"/>
      <Text></Text>
      <Text style={styles.text}>For more information</Text>
      <Pressable style={styles.lo} onPress={()=>Linking.openURL('https://wa.me/+255769742628')}>
        <Icon
        source="whatsapp"
        color='green'
        size={20}
        />
        <Text>Contact Us on Whatsapp</Text>
        <Icon
        source="chevron-right"
        color="black"
        size={20}
        />
      </Pressable>

      <Pressable style={styles.lo} onPress={()=>Linking.openURL('https://t.me/+255769742628')}>
        <FontAwesome
        name="telegram"
        color='blue'
        size={20}
        />
        <Text>Contact Us on Telegram</Text>
        <Icon
        source="chevron-right"
        color="black"
        size={20}
        />
      </Pressable>
      <Text style={styles.text}>User</Text>
      <Pressable style={styles.lo} onPress={logout}>
        <Icon
        source="logout"
        color="red"
        size={20}
        />
        <Text>{session?.name}</Text>
        <Text>Log Out</Text>
        <Icon
        source="chevron-right"
        color='black'
        size={20}
        />
      </Pressable>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text:{
  marginHorizontal:6,
  padding:2,
  margin:4,
  color:"green"
  },
  lo:{
   flexDirection:"row",
   justifyContent:"space-between",
   alignItems:"flex-start",
   backgroundColor:"white",
   marginHorizontal:4,
   borderRadius:16,
   padding:8,
   marginVertical:8
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
