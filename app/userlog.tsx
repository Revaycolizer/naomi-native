import { StyleSheet,View} from "react-native";
import { useState } from "react";
import { Button, Card, TextInput } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { Text } from '@/components/Themed';
import { useUser, userSession } from "@/zustand"
import { useToast } from "react-native-toast-notifications";





export default function IP(){
const [email,setEmail] = useState('')
const[password,setPass]=useState('')
const [isLoading,setLoading]=useState(false)
const data={email,password}
const [user,setUser]= useUser((state)=>[state.user,state.setUser])
const router = useRouter()
const toast = useToast()
const [session,setSession]=userSession((state)=>[state.session,state.setSession])

const sub = async()=>{
    setLoading(true)
   
    try{
        const response = await fetch('https://food-bac.vercel.app/api/log',{
            method:"POST"
           ,
           body:JSON.stringify(data)})
           if(response.status == 200){
            const  token  = await response.json();
            setUser(token.tokeni)
            setSession(token.userData)
            console.log(user)
           
            toast.show("Logged in successfully", {
                type: " success",
                placement: "top",
                duration: 4000,
                animationType: "slide-in",
              });
           router.replace("/home")
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

}
    return(
        <View style={styles.container}>

            <Card disabled={isLoading} style={styles.content}>

            <Card.Title title="Sign In"/>

            <Card.Content>

            <TextInput
            mode="outlined"
            style={styles.input}
            placeholder='Email'
            outlineColor="blue"
            activeOutlineColor="purple"
            value={email}
            onChangeText={(email)=>setEmail(email)}
            />

            <TextInput
            mode="outlined"
            style={styles.input}
            placeholder='password'
            outlineColor="blue"
            activeOutlineColor="purple"
            value={password}
            onChangeText={(password)=>setPass(password)}
            secureTextEntry
            />

            </Card.Content>

            <View style={styles.btn}>

            <Button onPress={sub} disabled={isLoading} buttonColor="blue" rippleColor="red" textColor="white" style={styles.inbtn}>Login</Button>
            <Button onPress={()=>router.push("/userreg")} disabled={isLoading} buttonColor="blue" rippleColor="red" textColor="white" style={styles.inbtn}>Register</Button>

            </View>
           
                <Text style={styles.text}>
                    Are you an admin?
                </Text>
                
                <Card.Actions  style={styles.actions}>
                    
                    <Button onPress={()=>router.push("/login")}>
                       Login</Button>
                    <Button onPress={()=>router.push("/adreg")}>Register</Button>
                </Card.Actions>
                </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:4,
        padding:4,
        justifyContent:'center',
        flex:1,
        alignItems:"center",
        backgroundColor:"white"
    },
    content:{
        justifyContent:"center",
        alignItems: 'center'
    },
    input:{
        borderRadius:32,
        margin:4
    },
    btn:{
        margin:4,
        paddingHorizontal:4
    },
    inbtn:{
        margin:4,
        padding:4
    },
    actions:{
        justifyContent:"center",
        alignContent:"center",
        alignItems:'center'
    },
    text:{
        textAlign:'center',
        color:"blue"
    }
})