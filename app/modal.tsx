import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from "react-native-paper";
import { SelectList } from 'react-native-dropdown-select-list'
import uuid from 'react-native-uuid';
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import axios from "axios"

import { useUser } from "@/zustand";

const items = [
    { name: 'Cars', id: 1},
    { name: 'Vans', id: 2},
    { name: 'SUVs', id: 3},
    { name: 'Motorbikes', id: 4 },
    { name: 'Trucks', id: 5},
  ];

export default function Add(){
    const [image, setImage] = useState<any|null>(null);
    const [name,setN]=useState("")
    const [price,setP]=useState("")
    const [description,setD]=useState("")
    const [selected, setSelected] = useState("");
    const [mim,setM]=useState<any|null>(null)
    console.log(selected)
    const [isLoading,setLoading]=useState(false)
    const [user,setUser]= useUser((state)=>[state.user,state.setUser])
  
    const data = [
        {key:'1', value:'FOOD',},
        {key:'2', value:'DRINKS'},
        {key:'3', value:'CLOTHES'},
        {key:'4', value:'FURNITURES',},
        {key:'5', value:'HEADPHONES'},
        {key:'6', value:'WATCHES'},
      
    ]
    
    const router = useRouter()
    
    const toast = useToast()

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64:true
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setM(result)
      }
    };
  
    const upload=async()=>{
        setLoading(true)
       
        const srcname = uuid.v4()

       const category =selected

        if(image && srcname  && name && description ){

            const formData = new FormData();
           let base64Img = `data:${mim.assets[0].mimeType};base64,${mim.assets[0].base64}`
      formData.append("file", base64Img);
  
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dloouwccf/auto/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            upload_preset: "iqb6omil", 
          },
        }
      );
  
      if (!cloudinaryResponse.data.secure_url) {
        throw new Error("Failed to upload video to Cloudinary");
      }
  
      const src = cloudinaryResponse.data.secure_url;
      
  
      const data ={src,srcname,name,description}
   
        try{
            const response = await fetch('https://food-bac.vercel.app/api/category',{
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
               
                toast.show(`${token.name} Uploaded successfully`, {
                    type: " success",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                  });
               router.push("/category")
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
    }
    
    }
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"/>
          
            
            <TextInput
            mode="outlined"
            style={styles.input}
            placeholder='Description'
            outlineColor="blue"
            activeOutlineColor="purple"
            value={description}
            onChangeText={(description)=>setD(description)}
            />
             <SelectList 
        setSelected={(val:any) => setN(val)} 
        data={data} 
        save="value"
    />
            <Button title="Pick an image " onPress={pickImage} />
      {image && <View style={{justifyContent:"center",alignItems:"center"}}><Image source={{ uri: image }} style={styles.image} /></View>}
      <Button onPress={()=>upload()} title="Upload" disabled={isLoading}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal:4,
    //   alignItems: "center",
    //   justifyContent: "center",
      gap:6
    },
    image: {
      width: 200,
      height: 200,
    },
    input:{
        borderRadius:32,
        margin:4
    },
  });