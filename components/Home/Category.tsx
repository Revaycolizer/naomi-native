import { setB } from "@/zustand";
import { useRouter } from "expo-router";
import { Image, View,StyleSheet,Text, Pressable } from "react-native";
import { Button } from "react-native-paper";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface Props{
    id:string;
    name:string;
    src:string;
    price:string;
}

export default function Category({item}:{item:Props}){
    const router = useRouter()
    const [bidha,setBidhaa]=setB((state)=>[state.bidha,state.setBidhaa])
    const oi = (item:any)=>{
     setBidhaa(item)
     router.push("/cat")
    }

    return(
    <View style={styles.container}>
        <Pressable style={styles.l} onPress={()=>oi(item)}>
        <Image source={{uri:item.src}} resizeMode="contain" alt="Product" style={styles.image}/>
        
        <Text style={styles.text}>{item.name}</Text>
       
        </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
    l:{
     backgroundColor:"white",
     padding:2,
     borderRadius:12,

    },
    inbtn:{
        margin:4,
        padding:4,
        // borderRadius:32,
        // backgroundColor:"yellow"
    },
    text:{
    textAlign:"center"
    },
    container: {
      flex: 1,
      marginHorizontal:4,
      alignItems: "center",
      justifyContent: "center",
      gap:6
    },
    image: {
      width: wp('44%'),
      height:hp("20%"),
    },
    input:{
        borderRadius:32,
        margin:4
    },
  });