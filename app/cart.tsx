import { useProduct, useUser } from "@/zustand"
import { useState } from "react";
import { Image,View,Text,StyleSheet, ScrollView, FlatList } from "react-native"
import { Button, TextInput } from "react-native-paper";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useToast } from "react-native-toast-notifications";

export default function Cart(){
    const [products,clearProducts,deleteProduct] = useProduct((state)=>[state.products,state.clearProducts,state.deleteProduct])
    const [location,setL]=useState("")
    const [phone,setP]=useState("")
    const [isLoading,setLoading]=useState(false)
    const [user,setUser]= useUser((state)=>[state.user,state.setUser])
    console.log(products)
    const totalAmount:any =products?.reduce((accumulator:any,item:any) => accumulator + item.price,'Tzs');
    const toast = useToast()
  const o = ()=>{
   clearProducts()
  }

  const remove=(itemId:any)=>{
    deleteProduct(itemId)
  }
    const order=async(item:any)=>{
        const name=item.name
        const src=item.src
        const originalPrice = item.price
        setLoading(true)
        const dat = products.map((product) => ({
            ...product,
            location, // Assuming `location` is already defined
            phone // Assuming `phone` is already defined
          }));
        const data = JSON.parse(JSON.stringify(dat))
        if(phone && location){
     
          try{
              const response = await fetch('https://food-bac.vercel.app/api/order',{
                  method:"POST"
                 ,
                 
                 body:JSON.stringify(data),
                 headers:{
                  Authorization:`Bearer ${user}`
              }})
                 if(response.status == 200){
                  const  token  = await response.json();
                
                  console.log(token)
                  clearProducts()
                 
                  toast.show(`${token.name} ordered successfully`, {
                      type: " success",
                      placement: "top",
                      duration: 4000,
                      animationType: "slide-in",
                    });
                 
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
      
    return(
        <ScrollView>
        {products?.length > 0 ? (
        <ScrollView>
            
                 <TextInput
               
               mode="outlined"
               style={styles.input}
               placeholder='Location'
               outlineColor="blue"
               activeOutlineColor="purple"
               value={location}
               onChangeText={(location)=>setL(location)}
               /> 

              <TextInput

               mode="outlined"
               style={styles.input}
               placeholder='0756'
               outlineColor="blue"
               activeOutlineColor="purple"
               keyboardType="numeric"
               value={phone}
               onChangeText={(phone)=>setP(phone)}
               />

<FlatList
      //  contentContainerStyle={{paddingBottom: 60, paddingTop: 20}}
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
      //  refreshControl={true}
      scrollEnabled={true}
        numColumns={2}
        data={products}
        renderItem={({ item }) =><ScrollView>  <View style={styles.l}>
          
        <Image source={{uri:item?.src}} resizeMode="contain" alt="Product" style={styles.image}/>
       
        
        <Text style={styles.text}>{item?.name}</Text>
        <Text style={styles.text}>{item?.price} Tzs</Text>
        <Text style={styles.text}>{item?.amount}</Text>
       
        </View>
              
           
    <Button rippleColor="red"  style={styles.inbtn} onPress={()=>remove(item.id)}>Remove</Button>
     </ScrollView>  }
            
        keyExtractor={(item) => item.id}
        style={{marginHorizontal: 4 }}
      />
            <Text>{totalAmount}</Text>
            
    <Button rippleColor="red"  style={styles.inbtn} onPress={order}>Order Now</Button> 
            </ScrollView>):(
                <View style={styles.p}>
                <Text>Empty List!</Text>
                    </View>
            )
            
        
        }

            </ScrollView>

    )
}

const styles = StyleSheet.create({
    l:{
     backgroundColor:"white",
     padding:2,
     borderRadius:12,
     margin:4
//    flexDirection:"row",
//    gap:12
    },
    p:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
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
      width: wp('40%'),
      height:hp("30%"),
      objectFit:"scale-down"
    },
    input:{
        borderRadius:32,
        margin:4
    },
  });