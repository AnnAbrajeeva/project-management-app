import {
  CreateColumnProps,
  UpdateColumnProps,
  FetchTasksProps,
  NewUser,
  UserLogin,
  CreateBoardProps,
} from './../utils/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api, axiosClassic } from 'api/api';

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

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async (board: CreateBoardProps, { rejectWithValue }) => {
    try {
      const res = await api.post(`/boards`, board);
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not create this board. Please, try again later.');
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'board/deleteBoard',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/boards/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not delete this board. Please, try again later.');
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

export const createUser = createAsyncThunk(
  'user/createUser',
  async (user: NewUser, { rejectWithValue }) => {
    try {
      const res = await axiosClassic.post(`/auth/signup`, user);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          return rejectWithValue('Такой пользователь уже создан');
        }
        return rejectWithValue('Ошибка сервера, попробуйте позже');
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: UserLogin, { rejectWithValue }) => {
    try {
      const res = await axiosClassic.post(`/auth/signin`, user);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return rejectWithValue('Неверный логин или пароль');
        }
        return rejectWithValue('Ошибка сервера, попробуйте позже');
      }
    }
  }
);
