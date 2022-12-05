import {
  CreateColumnProps,
  UpdateColumnProps,
  FetchTasksProps,
  NewUser,
  UserLogin,
  CreateBoardProps,
  UpdateBoardProps,
  DeleteColumnProps,
  DeleteTaskProps,
  CreateTaskProps,
  Column,
  TaskOrderProps,
  UpdateUserProps,
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

export const updateColumnOrder = createAsyncThunk(
  'columns/updateColumnOrder',
  async (columns: { _id: string; order: number }[], { rejectWithValue }) => {
    try {
      const res = await api.patch(`/columnsSet`, columns);
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not update column of this board. Please, try again later.');
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async ({ boardId, columnId }: DeleteColumnProps, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/boards/${boardId}/columns/${columnId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not delete column of this board. Please, try again later.');
    }
  }
);

export const fetchTasks = createAsyncThunk(
  'column/fetchTasks',
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
  'column/createTask',
  async ({ boardId, columnId, task }: CreateTaskProps, { rejectWithValue }) => {
    try {
      const res = await api.post(`/boards/${boardId}/columns/${columnId}/tasks`, task);
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not create task this board. Please, try again later.');
    }
  }
);

export const editTask = createAsyncThunk(
  'column/editTask',
  async ({ boardId, columnId, taskId, task }: CreateTaskProps, { rejectWithValue }) => {
    try {
      const res = await api.put(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, task);
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not change this task in this board. Please, try again later.');
    }
  }
);

export const updateOrderTask = createAsyncThunk(
  'column/updateOrderTask',
  async (
    { columnId, tasks }: { columnId: string; tasks: TaskOrderProps[] },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.patch(`/tasksSet`, tasks);
      return { columnId: columnId, tasks: res.data };
    } catch (error) {
      return rejectWithValue('Could not change this task in this board. Please, try again later.');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'column/deleteTask',
  async ({ boardId, columnId, taskId }: DeleteTaskProps, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        'Could not delete tasks in this column of this board. Please, try again later.'
      );
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

export const updateBoard = createAsyncThunk(
  'board/updateBoard',
  async ({ board, id }: UpdateBoardProps, { rejectWithValue }) => {
    try {
      const res = await api.put(`/boards/${id}`, board);
      return res.data;
    } catch (error) {
      return rejectWithValue('Could not update this board. Please, try again later.');
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

export const getUser = createAsyncThunk(
  'users/getUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/${id}`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return rejectWithValue('Пользователь не найден');
        }
        return rejectWithValue('Ошибка сервера, попробуйте позже');
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, user }: UpdateUserProps, { rejectWithValue }) => {
    try {
      const res = await api.put(`/users/${id}`, user);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          return rejectWithValue('Такой логин уже зарегистрирован');
        }
        return rejectWithValue('Ошибка сервера, попробуйте позже');
      }
    }
  }
);
