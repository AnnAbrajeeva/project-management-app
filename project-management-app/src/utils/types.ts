import { SerializedError } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import {
  Control,
  FieldErrorsImpl,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

export interface EmptyBoardProps {
  text: string;
  action: () => void;
}

export interface HeaderProps {
  location: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}
export interface ErrorBoundaryState {
  hasError: boolean;
}
export interface ModalProps {
  open: boolean;
  handleClose: () => void;
  children?: ReactNode;
  title: string;
  handleSubmit: UseFormHandleSubmit<ColumnData>;
  formSubmit: SubmitHandler<FieldValues>;
  loading: string;
}

export interface Board {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface BoardsState {
  boards: Board[];
  status: 'loading' | 'error' | 'success';
  error: string;
  modal: boolean;
}

export interface BoardState {
  boards: Board[];
  board: Board | null;
  status: 'loading' | 'error' | 'success';
  error: string;
  modal: boolean;
  editBoard: Board | null;
}

export interface ColumnsState {
  columns: Column[];
  column: Column | null;
  status: 'loading' | 'error' | 'success';
  error: string;
}

export interface ColumnState {
  column: Column | null;
  status: 'loading' | 'error' | 'success';
  error: string;
}

export interface BoardCardProps {
  board: Board;
  index: number;
}

export interface Column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks?: Task[];
}

export interface BoardsPageHeaderProps {
  title: string;
}

export interface ColumnData {
  title: string;
}

export interface TaskData {
  title: string;
  description: string;
  users: string[];
}

export interface BoardData {
  title: string;
  users: string[];
}

export interface CreateColumnProps {
  id: string;
  title: string;
  order: number;
}

export interface ColumnProps {
  column: Column;
  index: number;
}

export interface UpdateColumnProps {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
}

export interface TasksState {
  task: Task | null;
  tasks: Task[];
  status: 'loading' | 'error' | 'success';
  error: string;
}

export interface TaskState {
  task: Task | null;
  status: 'loading' | 'error' | 'success';
  error: string;
}

export interface UsersState {
  users: User[];
  user: User | null;
  status: 'loading' | 'error' | 'success';
  error: string;
}

export interface User {
  _id: string;
  name: string;
  login: string;
}

export interface Task {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface FetchTasksProps {
  id: string;
  columnId: string;
}

export interface BoardTaskProps {
  task: Task;
  selected: (task: Task) => void;
  index: number;
}

export interface ModalFormProps {
  open: boolean;
  handleClose: () => void;
  formSubmit: SubmitHandler<FieldValues>;
  handleSubmit: UseFormHandleSubmit<TaskData>;
  register: UseFormRegister<TaskData>;
  errors: Partial<
    FieldErrorsImpl<{
      title: string;
      description: string;
      users: string[];
    }>
  >;
  control: Control<TaskData, unknown>;
}

export interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  tasks: Task[];
  board: Board;
  columnId: string;
  task?: Task | null;
}

export interface CreateTaskProps {
  boardId: string;
  columnId: string;
  taskId: string;
  task: {
    title: string;
    order: number;
    description: string;
    userId: string;
    users: string[];
    boardId?: string;
    columnId?: string;
    _id?: string;
  };
}

export interface CreateBoardProps {
  title: string;
  owner: string;
  users: string[];
}

export interface RegisterFormData {
  name: string;
  login: string;
  password: string;
  confirmPassword: string;
}

export interface NewUser {
  name: string;
  login: string;
  password: string;
}

export interface UserLogin {
  login: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  login: string;
}

export interface UserOptions {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

export interface UserState {
  user: UserOptions | null;
  status: 'loading' | 'error' | 'success' | '';
  error: unknown;
  newUser: NewUser | null;
  token: string;
}

export interface SnackbarState {
  toast: {
    open: boolean;
    message: string;
    view: 'error' | 'success';
  };
}

export interface SnackProps {
  open: boolean;
  message: string;
  variant: 'error' | 'success';
}

export interface BoardModalProps {
  board?: Board;
}

export interface UpdateBoardProps {
  board: CreateBoardProps;
  id: string;
}

export interface ColumnModalProps {
  open: boolean;
  handleClose: () => void;
}

export interface ConfirmModalProps {
  showConfirm: boolean;
  handleClose: () => void;
  action: () => void;
  title: string;
  loading: string;
}

export interface DeleteColumnProps {
  boardId: string;
  columnId: string;
}

export interface DeleteTaskProps {
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface TaskDescrModalProps {
  task: Task;
  open: boolean;
  handleClose: () => void;
}

export interface TaskOrderProps {
  _id: string;
  order: number;
  columnId: string;
}

export interface UpdateUserProps {
  id: string;
  user: NewUser;
}

export interface ProfileUserProps {
  user: User;
}
