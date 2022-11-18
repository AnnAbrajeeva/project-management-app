import { ReactNode } from 'react';

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
  board: Board | null;
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
