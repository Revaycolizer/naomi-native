
import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";

import {
  createJSONStorage,
  persist,
} from 'zustand/middleware'

interface UserState {
  users: any; 
  setUser: (userData: any) => void;
}




type User ={
  user:any
}

type Session ={
  session:any
}

type Assign ={
  assign:any
}

type assignUser={
  setAssign:(assign:Assign['assign'])=>void
}

type Bidhaa ={
  bidha:any
}

type assignBidhaa={
  setBidhaa:(assign:Bidhaa['bidha'])=>void
}

type userSession={
  setSession:(session:Session['session'])=>void
}
type userAction={
  setUser:(user:User['user'])=>void
}

export const useUser = create<User & userAction>()(
  persist(
    (set) => ({
      user:null,
      setUser: (user: string) => set(() => ({ user: user})),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() =>  AsyncStorage),
    }
  )
)

export const userSession = create<Session & userSession>()(
  persist(
    (set) => ({
      session:null,
      setSession: (session: string) => set(() => ({ session: session})),
    }),
    {
      name: 'session-storage',
      storage: createJSONStorage(() =>  AsyncStorage),
    }
  )
)


export const setB = create<Bidhaa & assignBidhaa>()(
  persist(
    (set) => ({
      bidha:[],
      setBidhaa: (bidha: string) => set(() => ({ bidha: bidha})),
    }),
    {
      name: 'bidhaa-storage',
      storage: createJSONStorage(() =>  AsyncStorage),
    }
  )
)


export const userAssign = create<Assign & assignUser>()(
  persist(
    (set) => ({
      assign:[],
      setAssign: (assign: string) => set(() => ({ assign: assign})),
    }),
    {
      name: 'sessin-storage',
      storage: createJSONStorage(() =>  AsyncStorage),
    }
  )
)

