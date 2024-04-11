import Category from '@/components/Home/Category';
import Products from '@/components/Home/Products';

import { Text, View } from '@/components/Themed';
import { userSession } from '@/zustand';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home(){
    const [session,setSession]=userSession((state)=>[state.session,state.setSession])
    const [products,setD]=useState<any|null>(null)
    const [isLoading,setIsLoading]=useState(false)
    useEffect(() => {
        const fetchData = async () => {
          if (session?.role === 'ADMIN') {
            await fetchAdminData();
          } else {
            await fetchUserData();
          }
        };
    
        fetchData();
    
      }, [session.role]); 

      const fetchAdminData = async () => {

        const data = await fetch("https://food-bac.vercel.app/api/category")

        const i = await data.json()

        setD(i)
        console.log('Fetching admin data...',i);
        
        // Fetch admin-specific data
      };
    
      const fetchUserData = async () => {
        setIsLoading(true)
        try{
        const data = await fetch("https://food-bac.vercel.app/api/category")

        const i = await data.json()
      if(i){
        setD(i)
        console.log('Fetching user data...');
    }
}catch(error){

}finally{
  setIsLoading(false)
}
        
      };

      const onRefresh = useCallback(async() => {
        // setRefreshing(true);
        
        if (session?.role === 'ADMIN') {
            await fetchAdminData();
          } else {
            await fetchUserData();
          }
        
      }, [session.role]);

      const router = useRouter()
      const [searchQuery, setSearchQuery] = useState('');
    return(
        <SafeAreaView style={styles.stara}>
        <StatusBar style='light'/>

        {isLoading?(<View style={{flex: 1,alignItems: 'center',justifyContent: 'center',}}><ActivityIndicator size={"large"}/></View>):(
    <ScrollView
    showsVerticalScrollIndicator={false}
    
    refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
    >
      {products && products.length > 0 ? (
       <FlatList
      //  contentContainerStyle={{paddingBottom: 60, paddingTop: 20}}
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
      //  refreshControl={true}
        numColumns={2}
        data={products}
        renderItem={({ item }) => <Category key={item.id} item={item} />}
        keyExtractor={(item) => item.id}
        style={{marginHorizontal: 4 }}
      />
     ):(<Text style={{textAlign:"center",marginVertical:4}}>Nothing</Text>)}

     </ScrollView>)}

            { session.role ==="USER"?(<View></View>):(
    <FAB
    icon={'plus'}
    label={''}
    // extended={isExtended}
    onPress={()=> router.push("/modal")}
    // visible={visible}
    // animateFrom={'right'}
    // iconMode={'static'}
    style={styles.fabStyle}
  />)}
  

            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fabStyle: {
      bottom: 16,
      right: 16,
      position: 'absolute',
    },
    container: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    stara:{
      marginHorizontal:4,
      marginVertical:8,
      flex:1
    }
  });