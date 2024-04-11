import { Image, View,StyleSheet,Text } from "react-native";
import { Button } from "react-native-paper";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface Props{
    id:string;
    name:string;
    src:string;
    price:string;
}

export default function Category({item}:{item:Props}){

    return(
    <View style={styles.container}>
        <View style={styles.l}>
        <Image source={{uri:item.src}} alt="Product" style={styles.image}/>
        
        <Text style={styles.text}>{item.name}</Text>
       
        </View>
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