import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {Likes} from '@prisma/client';


interface InitialState {
  likes: Likes[] | null;
}

const initialState: InitialState = {
  likes: null,
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    increment(state:any, action:any) {
      // как работать с api
    },
    decrement(state:any, action:any) {
      // как работать с api
    },
    
  },
});


export const {increment, decrement} = likesSlice.actions
export default likesSlice.reducer;
