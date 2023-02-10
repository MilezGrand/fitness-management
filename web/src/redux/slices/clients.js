import axios from '../../axios.js';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const { data } = await axios.get('/clients');
  return data;
});

export const fetchClientInfo = createAsyncThunk('clients/fetchClientInfo', async (id) => {
  const { data } = await axios.get(`/clients/${id}`);
  return data;
});

export const fetchClientServices = createAsyncThunk('clients/fetchClientServices', async (id) => {
  const { data } = await axios.get(`/service/${id}`);
  return data;
});

const initialState = {
  clients: {
    items: [],
    status: 'loading',
  },
  info: {
    items: {},
    status: 'loading',
  },
  services: {
    items: {},
    status: 'loading',
  },
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchClients.pending]: (state) => {
      state.clients.items = [];
      state.clients.status = 'loading';
    },
    [fetchClients.fulfilled]: (state, action) => {
      state.clients.items = action.payload;
      state.clients.status = 'loaded';
    },
    [fetchClients.rejected]: (state) => {
      state.clients.items = [];
      state.clients.status = 'error';
    },
    [fetchClientInfo.pending]: (state) => {
      state.info.items = [];
      state.info.status = 'loading';
    },
    [fetchClientInfo.fulfilled]: (state, action) => {
      state.info.items = action.payload;
      state.info.status = 'loaded';
    },
    [fetchClientInfo.rejected]: (state) => {
      state.info.items = [];
      state.info.status = 'error';
    },
    [fetchClientServices.pending]: (state) => {
      state.services.items = [];
      state.services.status = 'loading';
    },
    [fetchClientServices.fulfilled]: (state, action) => {
      state.services.items = action.payload;
      state.services.status = 'loaded';
    },
    [fetchClientServices.rejected]: (state) => {
      state.services.items = [];
      state.services.status = 'error';
    },
  },
});

export const clientsReducer = clientsSlice.reducer;
