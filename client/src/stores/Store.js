import { create } from 'zustand'
import gameSlice from './slice/gameSlice';
import userInfoSlice from './slice/userInfoSlice';

const useStore = create((set, get) => ({
    ...gameSlice(set, get),
    ...userInfoSlice(set, get)
  }));


export default useStore