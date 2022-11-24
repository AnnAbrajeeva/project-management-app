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
}

export interface BoardState {
  board: Board | null;
  status: 'loading' | 'error' | 'success';
  error: string;
}

export interface ColumnsState {
  columns: Column[];
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

export interface CreateColumnProps {
  id: string;
  title: string;
  order: number;
}

export interface ColumnProps {
  column: Column;
}

export interface UpdateColumnProps {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
}

export interface TasksState {
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
}

export interface TaskModalProps {
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

export interface CreateTaskProps {
  id: string;
  columnId: string;
  task: {
    title: string;
    order: number;
    description: string;
    userId: number;
    users: string[];
  };
}
