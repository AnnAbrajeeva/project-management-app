import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmY1ZGVlYTIzNmUxMjNiZTdiZGFmYyIsImxvZ2luIjoiMTExIiwiaWF0IjoxNjY4NzYyNDk2LCJleHAiOjE2Njg4MDU2OTZ9.Cx3CwOcmOhghd-O3kluIzL6k_IgGhHDShQW82opF1UU';

const api = axios.create({
  baseURL: 'https://final-task-backend-production-8c86.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${getToken}`,
  },
});

axios.interceptors.request.use(
  (config) => {
    const token = getToken;
    if (!config.headers) config.headers = {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => console.log(error)
);

export const fetchBoards = createAsyncThunk('board/fetchBoards', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get(`/boards`);
    return res.data;
  } catch (error) {
    return rejectWithValue('Could not fetch boards. Please, try again later.');
  }
});

export const fetchBoardById = createAsyncThunk(
  'boards/fetchBoards',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/boards/${id}`, { data: { id } });
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not fetch board. Please, try again later.');
    }
  }
);

export const fetchColumnsById = createAsyncThunk(
  'boards/fetchBoards',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/boards/${id}/columns`, { data: { id } });
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not fetch columns of this board. Please, try again later.');
    }
  }
);
