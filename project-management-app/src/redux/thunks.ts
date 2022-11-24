import { CreateColumnProps, UpdateColumnProps, FetchTasksProps } from './../utils/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmY1ZGVlYTIzNmUxMjNiZTdiZGFmYyIsImxvZ2luIjoiMTExIiwiaWF0IjoxNjY5MjYyMjQ1LCJleHAiOjE2NjkzMDU0NDV9.bZbBrQCQIUrOtRH0pLNNjth0ZSadmQIjzDAXXm189ns';

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
  'boards/fetchBoardById',
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
  'columns/fetchColumnsById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/boards/${id}/columns`, { data: { id } });
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not fetch columns of this board. Please, try again later.');
    }
  }
);

export const createColumn = createAsyncThunk(
  'columns/createColumn',
  async ({ id, title, order }: CreateColumnProps, { rejectWithValue }) => {
    try {
      const res = await api.post(`/boards/${id}/columns`, { title, order });
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not fetch columns of this board. Please, try again later.');
    }
  }
);

export const updateColumn = createAsyncThunk(
  'columns/updateColumn',
  async ({ boardId, columnId, title, order }: UpdateColumnProps, { rejectWithValue }) => {
    try {
      const res = await api.put(`/boards/${boardId}/columns/${columnId}`, { title, order });
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not update column of this board. Please, try again later.');
    }
  }
);

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ id, columnId }: FetchTasksProps, { rejectWithValue }) => {
    try {
      const res = await api.get(`/boards/${id}/columns/${columnId}/tasks`);
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not fetch columns of this board. Please, try again later.');
    }
  }
);

export const createTask = createAsyncThunk(
  'task/createTask',
  async ({ id, title, order }: CreateColumnProps, { rejectWithValue }) => {
    try {
      const res = await api.post(`/boards/${id}/columns`, { title, order });
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not fetch columns of this board. Please, try again later.');
    }
  }
);

export const getUsers = createAsyncThunk('users/getUsers', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get(`/users`);
    return res.data;
  } catch (error) {
    return rejectWithValue('Could not fetch columns of this board. Please, try again later.');
  }
});
