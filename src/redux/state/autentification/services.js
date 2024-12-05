import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, setToken } from "./autentification.redusers";


export const fetchUser = createAsyncThunk(
    'auth/login',
    async (formData, thunkApi) => {
      try {
        const { data } = await instance.post('/users/login', formData);
        setToken(data.token);
        return data;
      } catch (err) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
  );

export const registrationUser = createAsyncThunk(
    'auth/registr',
    async (formData, thunkApi) => {
      try {
        const { data } = await instance.post('/users/signup', formData);
        console.log(formData);
        setToken(data.token);
        return data;
      } catch (err) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
  );

  export const refreshThunk = createAsyncThunk(
    'auth/refresh',
    async (_, thunkApi) => {
      try {
        const state = thunkApi.getState();
        const token = state.authStore.token;
  
        setToken(token);
  
        const { data } = await instance.get('/users/current');
  
        return data;
      } catch (err) {
        return thunkApi.rejectWithValue(err.message);
      }
    },
    {
      condition: (_, thunkApi) => {
        const state = thunkApi.getState();
        const token = state.authStore.token;
  
        if (!token) return false;
        return true;
      },
    }
  );

  export const logOutThunk = createAsyncThunk(
    'auth/logOut',
    async (_, thunkApi) => {
      try {
        const { data } = await instance.post('/users/logout');
  
        return data;
      } catch (err) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
  );


  
  export const updateThunk = createAsyncThunk(
    'auth/update',
    async (updateElem, thunkApi) => {
      try {
        const { data } = await instance.patch(`/contacts/${updateElem.id}`, updateElem.contact);
        
        return data;
      } catch (err) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
  );