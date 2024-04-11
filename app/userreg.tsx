import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Button, Card, TextInput } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";




export default function IP(){
const [email,setEmail] = useState('')
const[password,setPass]=useState('')
const [name,setName]=useState("")
const [isLoading,setLoading]=useState(false)
const data={email,password,name}
const router = useRouter()
const toast = useToast()
const sub = async()=>{
    setLoading(true)
   
    try{
        const response = await fetch('https://food-bac.vercel.app/api/reg',{
            method:"POST"
           ,
           body:JSON.stringify(data)})
           if(response.status == 200){
            toast.show("Registered successfully", {
                type: " success",
                placement: "top",
                duration: 4000,
                animationType: "slide-in",
              });
           console.log(response)
           router.push("/userlog")
           }else{
            alert("Something went wrong")
            console.log(response)
           }
    }catch(error){
        alert("Something went wrong")
        console.error(error)
    }finally{
        setLoading(false)
    }

}
    return(
        <View style={styles.container}>
            <Card disabled={isLoading} style={styles.content}>
            <Card.Title title="Sign In">
            <Text  style={{textAlign: 'center'}}>Sign In</Text>
            </Card.Title>
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
            placeholder='Name'
            outlineColor="blue"
            activeOutlineColor="purple"
            value={name}
            onChangeText={(name)=>setName(name)}
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
            <Button onPress={sub} disabled={isLoading} buttonColor="blue" rippleColor="red" textColor="white" style={styles.inbtn}>Register</Button>
            <Button  disabled={isLoading} buttonColor="blue" rippleColor="red" textColor="white" style={styles.inbtn} onPress={()=>router.push("/userlog")}>Login</Button>
            </View>
           
            
            <View>
            <Text style={styles.text}>
                    Are you an admin?
                </Text>
                </View>
                <Card.Actions  style={{justifyContent:"center",alignContent:"center",alignItems:'center'}}>
                    
                    <Button onPress={()=>router.push("/login")}>Login</Button>
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
    text:{
        textAlign:'center',
        color:"blue"
    }
})