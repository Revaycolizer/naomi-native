
import { useUser, userSession } from "@/zustand"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { StyleSheet,View,Text, BackHandler } from "react-native"
import { ActivityIndicator, Icon, MD2Colors } from "react-native-paper"


export default function User(){
    const [useri,setUseri]=useState<any|null>(null)
    const [session,setSession]=userSession((state)=>[state.session,state.setSession])
    const [user,setUser]= useUser((state)=>[state.user,state.setUser])
    const [isloading,setIsLoading]=useState(false)
    const router=useRouter()

    useEffect(() => {
      const backAction = () => {
        BackHandler.exitApp(); // Exit the application when back button is pressed
        return true; // Prevent default behavior (going back)
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
  
      return () => backHandler.remove(); // Remove the event listener on unmount
    }, []);
  

    useEffect(()=>{
        async function getUser(){
            try {
                const use = await fetch("https://food-bac.vercel.app/api/adlog", {
                  headers: {
                    Authorization: `Bearer ${user}`,
                  },
                });
              
                if (use.status === 401) {
                 
                  router.replace("/login");
                } 
                
                else if(use.status === 500){
                  router.replace("/login");
                }
                else {
                  const data = await use.json();
                  if (use.status === 200) {
                    setSession(data);
                    setIsLoading(false);
                    router.replace("/(tabs)/home");
                  } else {
                    // setSession(data);
                    setIsLoading(false);
                    router.replace("/login");
                  }
                }
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            }
              

getUser()
    },[])

    if(!isloading){
        return <ActivityIndicator size={"large"} animating={true} color={MD2Colors.red800} style={{flex:1,alignItems:"center",justifyContent:"center"}}/>
    }

    return(
        <View style={styles.lo}>
           
            </View>
    )
}

const styles = StyleSheet.create({
lo:{
    alignItems:"flex-start",
    justifyContent:"space-between",
    flexDirection:"row",
    padding:4,
    marginHorizontal:16,
    margin:8
}
})