// userDetailsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Define the type for the slice's state
interface UserDataState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  data: any; // Define more specific type based on API response
  error: string | null;
}

interface UserAuthState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  token: object;
  error: string | null;
  isAuth:boolean;
}

interface UserDetailsState {
  userData: UserDataState;
  userAuth: UserAuthState;
}

interface FetchUserAuthDetails {
  email: string;
  password: string;
}

// Define the initial state
const initialState: UserDetailsState = {
  userData: {
    status: 'idle',
    data: {},
    error: null,
  },
  userAuth: {
    status: 'idle',
    token: {},
    error: null,
    isAuth:false
  }
};

// Create the async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  'userDetails/fetchUserDetails',
  async (page: number) => {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    return response.data; // Ensure this matches the state structure
  }
);

// Create the async thunk for user registration
export const userRegisteration = createAsyncThunk(
  'userAuthentication/userRegisteration',
  async (userObj: FetchUserAuthDetails) => { 
    console.log(JSON.stringify(userObj));
       
    const response = await axios.post(`https://reqres.in/api/register`, userObj);
    return response; // Ensure this matches the state structure
  }
);

// Create the slice
const userDetailsSlice = createSlice({
  name: 'userDetailsSlice',
  initialState,
  reducers: {
    authRevocation : (state,action)=>{
      state.userAuth.isAuth = !state.userAuth.isAuth
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.userData.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userData.status = 'succeeded';
        state.userData.data = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.userData.status = 'failed';
        state.userData.error = action.error.message || null;
      })
      .addCase(userRegisteration.pending, (state) => {
        state.userAuth.status = 'loading';
      })
      .addCase(userRegisteration.fulfilled, (state, action) => {
        console.log('m in', action.payload.data);
        
        state.userAuth.status = 'succeeded';
        state.userAuth.token = action.payload.data; // Assuming the response contains a token        
        state.userAuth.isAuth = !state.userAuth.isAuth 
      })
      .addCase(userRegisteration.rejected, (state, action) => {
        state.userAuth.status = 'failed';
        state.userAuth.error = action.error.message || null;
      });
  },
});
export const {authRevocation} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
