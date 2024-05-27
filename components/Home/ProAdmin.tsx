import { useUser } from "@/zustand";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View,StyleSheet,Text } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TextInputMask from 'react-native-text-input-mask';
import { useToast } from "react-native-toast-notifications";
type UserOrderProps = {
  item: any; 
  onDataInsert: () => void; 
};

export default function ProAdmin({ item, onDataInsert }: UserOrderProps){
    const [isOpen,setOpen]=useState(false)
    const [location,setL]=useState("")
    const [phone,setP]=useState("")
    const [name,setN]=useState(item.name)
    const [amount,setA]=useState<any|null>(null)
    const [price,setPr]=useState(item.price)
    const [user,setUser]= useUser((state)=>[state.user,state.setUser])
    const router = useRouter()
    const [isLoading,setLoading]=useState(false)

    
    
    const toast = useToast()
    
    const order=async(item:any)=>{
      const name=item.name
      const src=item.src
      const id=item.id
      const originalPrice = item.price
      const data ={name,price,id}
      if(name && price){
   setLoading(true)
        try{
            const response = await fetch(`https://food-bac.vercel.app/api/create/${item.id}`,{
                method:"PATCH"
               ,
               
               body:JSON.stringify(data),
               headers:{
                Authorization:`Bearer ${user}`
            }})
               if(response.status == 200){
                const  token  = await response.json();
                // setUser(token.tokeni)
                // setSession(token.userData)
                console.log(token)
               
                toast.show(`${item.name} edited successfully`, {
                    type: " success",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                  });
                  onDataInsert()
               open()
               }else{
                toast.show("Something went wrong", {
                    type: " success",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                  });
                console.log(response)
               }
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false)
        }
    }else{
        toast.show("Missing fields", {
            type: " success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
          setLoading(false)
          open()
    }
    
    
    }

    const del=async(item:any)=>{
      const name=item.name
      const src=item.src
      const id=item.id
      const originalPrice = item.price
      const data ={id}
      setLoading(true)
      if(name && price){
   
        try{
            const response = await fetch(`https://food-bac.vercel.app/api/create/${item.id}`,{
                method:"DELETE"
               ,
               
               body:JSON.stringify(data),
               headers:{
                Authorization:`Bearer ${user}`
            }})
               if(response.status == 200){
                const  token  = await response.json();
                // setUser(token.tokeni)
                // setSession(token.userData)
                console.log(token)
               
                toast.show(`${item.name} deleted successfully`, {
                    type: " success",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                  });
                  onDataInsert()
               open()
               }else{
                toast.show("Something went wrong", {
                    type: " success",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                  });
                console.log(response)
               }
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false)
        }
    }else{
        toast.show("Missing fields", {
            type: " success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
          setLoading(false)
          open()
    }
    
    
    }


    const open =()=>{
        setOpen(prevState=>(!prevState))
    }

    const calc=(item:any)=>{
      
      const pf=parseFloat(item.price)
      const a=parseFloat(amount)

      if(!isNaN(pf) &&  !isNaN(a)){
      //  setPr((pf * a).toString())
      return (pf * a).toString()
      }
      else{
        return null
      }
    }

//     useEffect(() => {
//       setPr((prevPrice:any) => {
//           const newPrice = calc(item);
//           console.log('Previous price:', prevPrice, 'New price:', newPrice);
//           return newPrice;
//       });
//   }, [item, amount]);
  

    return(
    <View style={styles.container}>
      
         <View>
         <Portal>
          <Dialog visible={isOpen} onDismiss={open}>
            <Dialog.Title>Buy {item.name}</Dialog.Title>
            <Dialog.Content>
              {/* <Text >{item.name}</Text> */}
              <TextInput
               
               mode="outlined"
               style={styles.input}
               placeholder='Edit name'
               outlineColor="blue"
               activeOutlineColor="purple"
               value={name}
               onChangeText={(text)=>setN(text)}
               />

              <TextInput
//               render={props =>
//                 <TextInputMask
                
//   onChangeText={(formatted, extracted) => {
//     console.log(formatted) // +1 (123) 456-78-90
//     console.log(extracted) // 1234567890
//   }}
//   mask={"+255 ([000]) [000] [00] [00]"}
// />
//               }
               mode="outlined"
               style={styles.input}
               placeholder='Price'
               outlineColor="blue"
               activeOutlineColor="purple"
               keyboardType="numeric"
               value={price}
               onChangeText={(text)=>setP(text)}
               />

            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={open}>Cancel</Button>
              <Button onPress={()=>del(item)} disabled={isLoading}>Delete</Button>
              <Button onPress={()=>order(item)} disabled={isLoading}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
            </View>
        
        <View style={styles.l}>
        <Image source={{uri:item.src}} resizeMode="contain" alt="Product" style={styles.image}/>
        
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.price} Tzs</Text>
     
        <Button rippleColor="red"  style={styles.inbtn} onPress={open}>Edit</Button>
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