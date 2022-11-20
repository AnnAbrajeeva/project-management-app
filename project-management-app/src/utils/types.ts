import { ReactNode } from 'react';
import { FieldValues, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

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
