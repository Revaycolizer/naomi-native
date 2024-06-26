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

export default function UserOrder({ item, onDataInsert }: UserOrderProps){
    const [isOpen,setOpen]=useState(false)
    // const [location,setL]=useState("")
    // const [phone,setP]=useState("")
    // const [amount,setA]=useState<any|null>(null)
    const [price,setPr]=useState(item.price as any)
    const [user,setUser]= useUser((state)=>[state.user,state.setUser])
    const router = useRouter()
    const [isLoading,setLoading]=useState(false)

    const [location, setLocation] = useState(item.location);
    const [phone, setPhone] = useState(item.phone);
    const [amount, setAmount] = useState(item.amount);
    const [status, setStatus] = useState(item.status);

    // Handlers for updating state variables
    const handleLocationChange = (text:any) => {
        setLocation(text);
    };

    const handlePhoneChange = (text:any) => {
        setPhone(text);
    };

    const handleAmountChange = (text:any) => {
        setAmount(text);
    };

    const handleStatusChange = (text:any) => {
        setStatus(text);
    };

    
    const toast = useToast()
    
    const order=async(item:any)=>{
      const name=item.name
      const deliverId=item.id
      const src=item.src
      const data ={phone,name,amount,location,price,src,deliverId}
      if(location && phone && amount && price){
        setLoading(true)
   
        try{
            const response = await fetch('https://food-bac.vercel.app/api/edit-order',{
                method:"POST"
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
               
                toast.show(`${token.name} edited successfully`, {
                    type: " success",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                  });
                  setLoading(false)
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

    const cancel=async(item:any)=>{
      const name=item.name
      const deliverId=item.id
      const src=item.src
      const data ={deliverId}
      if(deliverId){
        setLoading(true)
   
        try{
            const response = await fetch('https://food-bac.vercel.app/api/cancel',{
                method:"POST"
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
               
                toast.show(`${item.name} cancelled successfully`, {
                    type: " success",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                  });
                  setLoading(false)
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
      
      const pf=parseFloat(item.originalPrice)
      const a=parseFloat(amount)

      if(!isNaN(pf) &&  !isNaN(a)){
      //  setPr((pf * a).toString())
      return (pf * a).toString()
      }
      else{
        return null
      }
    }

    useEffect(() => {
      setPr((prevPrice:any) => {
          const newPrice = calc(item);
          console.log('Previous price:', prevPrice, 'New price:', newPrice);
          return newPrice;
      });
  }, [item, amount]);
  

    return(
    <View style={styles.container}>
      
         <View>
         <Portal>
          <Dialog visible={isOpen} onDismiss={open}>
            <Dialog.Title>Buy {item.name}</Dialog.Title>
            <Dialog.Content>
            <TextInput
                style={styles.textInput}
                value={location}
                onChangeText={handleLocationChange}
                placeholder="Edit location"
                disabled={status==='REACHED'?true:false}
            />

            <TextInput
                style={styles.textInput}
                value={phone}
                onChangeText={handlePhoneChange}
                placeholder="Edit phone"
                disabled={status==='REACHED'?true:false}
            />

            <TextInput
                style={styles.textInput}
                value={amount}
                onChangeText={handleAmountChange}
                placeholder="Edit amount"
                disabled={status==='REACHED'?true:false}
            />

            <TextInput
                style={styles.textInput}
                value={status}
                disabled={true}
                // onChangeText={handleStatusChange}
                // placeholder="Edit status"
            />

              
            

             

               <Text style={{textAlign:"center"}}>Total amount: {price}</Text>
               
            </Dialog.Content>
            <Dialog.Actions>
              {status==='REACHED'?
              (
              <Button onPress={open}>Cancel</Button>):(
                <>
                <Button onPress={open}>Cancel</Button>
                <Button onPress={()=>cancel(item)} disabled={isLoading}>Cancel Order</Button>
                </>
              )}
              <Button onPress={()=>order(item)} disabled={isLoading || status==='REACHED'?true:false}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
            </View>
        
        <View style={styles.l}>
        <Image source={{uri:item.src}} resizeMode="contain" alt="Product" style={styles.image}/>
        
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>Amount: {item.amount}</Text>
        <Text style={styles.text}>{item.price} Tzs</Text>
     
        <Button rippleColor="red"  style={styles.inbtn} onPress={open}>Show Details</Button>
        </View>
        
    </View>
    )
}

const styles = StyleSheet.create({
    l:{
     backgroundColor:"white",
     padding:2,
     borderRadius:12,
     flexDirection:"row",
     gap:4

    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginVertical: 4,
      borderRadius: 4,
  },
    inbtn:{
        margin:0,
        padding:0,
        // borderRadius:32,
        // backgroundColor:"yellow"
    },
    text:{
    textAlign:"center",
    marginVertical:9
    },
    container: {
      flex: 1,
      marginHorizontal:4,
      alignItems: "center",
      justifyContent: "center",
      gap:6
    },
    image: {
      width: wp('14%'),
      height:hp("6%"),
    },
    input:{
        borderRadius:32,
        margin:4
    },
  });